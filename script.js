// Theme Management
function initTheme() {
    const defaultTheme = 'dark';
    document.documentElement.setAttribute('data-theme', defaultTheme);
    updateThemeIcon(defaultTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// Smooth scrolling and active section highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();

    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('copy', function(e) { e.preventDefault(); });
    document.addEventListener('cut', function(e) { e.preventDefault(); });
    document.addEventListener('selectstart', function(e) { e.preventDefault(); });

    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const floatingNavButtons = document.querySelectorAll('.floating-nav-btn');
    const sections = document.querySelectorAll('.section');

    // Function to scroll to section
    function scrollToSection(targetSection) {
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Smooth scroll to section when floating nav button is clicked
    floatingNavButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            scrollToSection(targetSection);
        });
    });

    // Highlight active section while scrolling
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 150; // Offset for better UX
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all floating nav buttons
                floatingNavButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to corresponding floating nav button
                const activeFloatingButton = document.querySelector(`.floating-nav-btn[data-section="${sectionId}"]`);
                
                if (activeFloatingButton) {
                    activeFloatingButton.classList.add('active');
                }
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    
    // Update on page load
    updateActiveSection();

    // Add parallax effect to hero card
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroCard.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    document.addEventListener('keydown', function(e) {
        const key = (e.key || '').toLowerCase();
        const isModifier = e.ctrlKey || e.metaKey;
        if (isModifier && (key === 'c' || key === 'u' || key === 's')) {
            e.preventDefault();
        }
    });
});
