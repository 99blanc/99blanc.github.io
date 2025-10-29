function toggleDarkMode() {
    const DARK_CLASS = 'dark';
    var body = document.querySelector("body");
    if (body.classList.contains(DARK_CLASS)) {
        setCookie('theme', 'light');
        body.classList.remove(DARK_CLASS);
    } else {
        setCookie('theme', 'dark');
        body.classList.add(DARK_CLASS);
    }
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;SameSite=strict;expires=" + d.toGMTString();
}
function deleteCookie(name) { setCookie(name, '', -1); }
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
var theme = getCookie('theme');
function initializeDarkMode() {
    const DARK_CLASS = 'dark';
    var body = document.querySelector("body");
    var toggles = document.querySelectorAll('.dark-mode-toggle');
    toggles.forEach(ti => ti.classList.add('no-transition'));
    body.classList.add(DARK_CLASS);
    toggles.forEach(ti => ti.checked = true);
    window.requestAnimationFrame(() => {
        toggles.forEach(ti => ti.classList.remove('no-transition'));
    });
}
if ( (theme === null && userPrefersDark) || theme === 'dark') {
    var checkDarkDone = false;
    function checkDarkAndInitialize() {
        if (!checkDarkDone) {
            initializeDarkMode(); 
        }
        checkDarkDone = true;
    };
    if (window.requestAnimationFrame) 
        window.requestAnimationFrame(checkDarkAndInitialize);
    window.addEventListener('DOMContentLoaded', checkDarkAndInitialize);
}