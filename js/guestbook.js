import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQLY8tCXACRBur3qyZH75Sy1GQIjdDMSk",
  authDomain: "personal-hompage-3f993.firebaseapp.com",
  projectId: "personal-hompage-3f993",
  storageBucket: "personal-hompage-3f993.firebasestorage.app",
  messagingSenderId: "98805444808",
  appId: "1:98805444808:web:9ad5b3298c98595632b5fd"
};
const db = getFirestore(initializeApp(firebaseConfig));
const form = document.getElementById('guestbook-form');
const nameInput = document.getElementById('gb-name');
const contentInput = document.getElementById('gb-content');
const submitButton = document.getElementById('gb-submit');
const status = document.getElementById('gb-status');
const list = document.getElementById('guestbook-list');
submitButton.disabled = false;

// Preserve the existing owner notification, loading its SDK only when needed.
let emailReady;
function notifyOwner(name, message) {
    if (!emailReady) {
        emailReady = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                if (!window.emailjs) {
                    reject(new Error('Notification service unavailable'));
                    return;
                }
                window.emailjs.init('JNc6tcs7gY5u1bHUW');
                resolve(window.emailjs);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    return emailReady.then(client => client.send('service_hfspbfg', 'template_x2x12uq', {
        from_name: name,
        message
    }));
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitButton.disabled) return;
    const name = nameInput.value.trim();
    const message = contentInput.value.trim();
    if (!name || !message) {
        status.textContent = 'Please enter your name and a message.';
        (!name ? nameInput : contentInput).focus();
        return;
    }

    submitButton.disabled = true;
    status.textContent = 'Posting message…';
    try {
        await addDoc(collection(db, 'guestbook'), { name, message, timestamp: new Date() });
    } catch {
        status.textContent = 'Your message could not be posted. Please try again.';
        submitButton.disabled = false;
        return;
    }
    contentInput.value = '';
    status.textContent = 'Your message has been posted.';
    submitButton.disabled = false;
    // A notification failure must not suggest reposting an already saved message.
    notifyOwner(name, message).catch(() => {});
});

const messages = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'), limit(20));
const dateFormat = new Intl.DateTimeFormat(document.documentElement.lang, {
    year: 'numeric', month: 'short', day: 'numeric'
});
onSnapshot(messages, snapshot => {
    list.replaceChildren();
    list.setAttribute('aria-busy', 'false');
    snapshot.forEach(document => {
        const data = document.data();
        const item = window.document.createElement('article');
        item.className = 'gb-item';
        const author = window.document.createElement('span');
        author.className = 'gb-author';
        author.textContent = data.name || 'Guest';
        const message = window.document.createElement('p');
        message.className = 'gb-text';
        message.textContent = data.message || '';
        item.append(author, message);
        const date = data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        if (!Number.isNaN(date.getTime())) {
            const time = window.document.createElement('time');
            time.className = 'gb-date';
            time.dateTime = date.toISOString();
            time.textContent = dateFormat.format(date);
            item.append(time);
        }
        list.append(item);
    });
    if (snapshot.empty) list.textContent = 'No messages yet.';
}, () => {
    list.setAttribute('aria-busy', 'false');
    list.textContent = 'Messages could not be loaded. Please reload the page to try again.';
});
