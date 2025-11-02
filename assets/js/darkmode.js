function toggleDarkMode(toggleElement){
    const DARK_CLASS = 'dark';
    const body = document.querySelector("body");
    const isChecked = toggleElement.checked;
    let giscusTheme;
    if(isChecked){
        setCookie('theme','dark');
        body.classList.add(DARK_CLASS);
        giscusTheme='noborder_gray';
    }else{
        setCookie('theme','light');
        body.classList.remove(DARK_CLASS);
        giscusTheme='noborder_light';
    }
    if(typeof setGiscusTheme==='function'){
        setGiscusTheme(giscusTheme);
    }
}
function getCookie(name){
    var v=document.cookie.match('(^|;) ?'+name+'=([^;]*)(;|$)');
    return v?v[2]:null;
}
function setCookie(name,value,days){
    var d=new Date;
    d.setTime(d.getTime()+24*60*60*1000*days);
    document.cookie=name+"="+value+";path=/;SameSite=strict;expires="+d.toGMTString();
}
function deleteCookie(name){setCookie(name,'',-1);}
var userPrefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
var theme=getCookie('theme');
window.addEventListener('DOMContentLoaded',()=>{
    const DARK_CLASS='dark';
    const body=document.querySelector("body");
    const toggles=document.querySelectorAll('.dark-mode-toggle');
    toggles.forEach(ti=>ti.classList.add('no-transition'));
    if((theme===null&&userPrefersDark)||theme==='dark'){
        body.classList.add(DARK_CLASS);
        toggles.forEach(ti=>ti.checked=true);
        if(typeof setGiscusTheme==='function'){
            setGiscusTheme('noborder_gray');
        }
    }else{
        body.classList.remove(DARK_CLASS);
        toggles.forEach(ti=>ti.checked=false);
        if(typeof setGiscusTheme==='function'){
            setGiscusTheme('noborder_light');
        }
    }
    window.requestAnimationFrame(()=>{
        toggles.forEach(ti=>ti.classList.remove('no-transition'));
    });
});