/* ==========================================================================
   MULYA CUISINE - MAIN INTERACTIVITY
   Features: Dark Mode, Language Toggle (Safari Fix), Accessible Nav
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. LOGIKA DARK MODE (AKSESIBEL)
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;
    
    function updateThemeButton(theme) {
        if (!themeToggle) return;
        
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Ganti ke Mode Terang'); 
            themeToggle.setAttribute('title', 'Ganti ke Mode Terang');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Ganti ke Mode Gelap');
            themeToggle.setAttribute('title', 'Ganti ke Mode Gelap');
        }
    }

    // Cek preferensi tersimpan saat load
    if (currentTheme === 'dark') {
        updateThemeButton('dark');
    } else {
        updateThemeButton('light');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let newTheme = 'light';
            if (htmlElement.getAttribute('data-theme') !== 'dark') {
                newTheme = 'dark';
            }
            updateThemeButton(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    // =========================================
    // 2. LOGIKA GANTI BAHASA (SAFARI/IOS FIX)
    // =========================================
    const langToggle = document.getElementById('lang-toggle');
    
    function getCookie(name) {
        const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    // [FIX] Fungsi Set Cookie yang Lebih Kuat untuk Safari/iPhone
    function setGoogleCookie(value) {
        const domain = window.location.hostname;
        
        // 1. Hapus cookie lama dulu (Reset)
        document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." + domain;
        document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + domain;
        document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        // 2. Set Cookie Baru (Tembak ke semua kemungkinan domain agar 'nempel')
        // Cara A: Domain dengan titik di depan (Wildcard)
        document.cookie = "googtrans=" + value + "; path=/; domain=." + domain; 
        // Cara B: Domain tanpa titik
        document.cookie = "googtrans=" + value + "; path=/; domain=" + domain;
        // Cara C: Tanpa atribut domain (Host Only) - Fallback untuk localhost
        document.cookie = "googtrans=" + value + "; path=/;";
    }

    const currentLang = getCookie('googtrans');
    
    if (langToggle) {
        // Cek status saat ini untuk label tombol
        if (currentLang && currentLang.includes('/en')) {
            langToggle.textContent = 'EN';
            langToggle.setAttribute('aria-label', 'Current language: English. Click to switch to Indonesian');
        } else {
            langToggle.textContent = 'ID';
            langToggle.setAttribute('aria-label', 'Bahasa saat ini Indonesia. Klik untuk ganti ke Inggris');
        }

        langToggle.addEventListener('click', () => {
            const current = getCookie('googtrans');
            
            if (current && current.includes('/en')) {
                // EN -> ID (Kembali ke Bahasa Asli)
                setGoogleCookie('/id/id'); 
            } else {
                // ID -> EN (Translate ke Inggris)
                setGoogleCookie('/id/en'); 
            }
            
            // Reload halaman untuk menerapkan bahasa
            location.reload();
        });
    }

    // =========================================
    // 3. LOGIKA NAVIGASI AKTIF (JEKYLL COMPATIBLE)
    // =========================================
    (function manageNavigation() {
        // Dapatkan path URL saat ini
        let currentPath = window.location.pathname;
        
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            // Ambil href dari link
            const linkHref = link.getAttribute('href');
            
            // Logika pencocokan sederhana untuk Jekyll
            // Jika href sama dengan path saat ini, atau jika di home ('/')
            if (linkHref === currentPath || (currentPath === '/' && linkHref === '/')) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
            } else {
                link.removeAttribute('aria-current');
                link.classList.remove('active');
            }
        });
    })();

});

// =========================================
// 4. GOOGLE TRANSLATE LOADER (VISUALLY HIDDEN)
// =========================================
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'id',
        includedLanguages: 'en,id', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
};

(function loadGoogleScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
})();
