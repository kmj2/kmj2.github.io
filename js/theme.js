// Apply a saved preference before the page paints. The default is light.
try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') document.documentElement.dataset.theme = theme;
} catch { /* The default theme also works without browser storage. */ }
