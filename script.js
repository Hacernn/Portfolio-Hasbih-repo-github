document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. MOBILE MENU TOGGLE (GABUNGAN) ===
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        // Toggle menu saat hamburger diklik
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke document
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Tutup menu saat link diklik
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Tutup menu saat klik di luar area navbar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // === 2. TYPING EFFECT ===
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['Web Developer', 'Game Developer', '3D Artist'];
        let count = 0;
        let index = 0;
        let currentText = '';

        (function type() {
            if (count === texts.length) count = 0;
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            typingElement.textContent = letter;

            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        })();
    }

    // === 3. ACTIVE NAVIGATION ON SCROLL ===
    const sections = document.querySelectorAll('section, header');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href") === `#${current}`) {
                a.classList.add("active");
            }
        });
    });

    // === 4. PROJECT FILTERING (Digabung agar tidak bentrok) ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (target === 'all' || target === category) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });

    // === 5. MODAL LOGIC (CV & PROJECT DIGABUNG) ===
    
    // Helper function untuk menangani multiple window.onclick
    function addWindowClickHandler(handler) {
        const oldHandler = window.onclick;
        window.onclick = function(event) {
            if (oldHandler) oldHandler(event);
            handler(event);
        };
    }

    // --- CV Modal ---
    const cvModal = document.getElementById("cvModal");
    const cvOpenBtn = document.querySelector(".cv-btn");
    const cvCloseBtn = document.querySelector("#cvModal .close-btn");

    if (cvOpenBtn && cvModal && cvCloseBtn) {
        cvOpenBtn.onclick = function(e) {
            e.preventDefault();
            cvModal.style.display = "flex";
            document.body.style.overflow = 'hidden';
        }
        cvCloseBtn.onclick = function() {
            cvModal.style.display = "none";
            document.body.style.overflow = '';
        }
        
        // Tambahkan handler untuk klik luar CV modal
        addWindowClickHandler(function(event) {
            if (event.target == cvModal) {
                cvModal.style.display = "none";
                document.body.style.overflow = '';
            }
        });
    }

    // --- Project Modal ---
    let currentImages = [];
    let currentIndex = 0;

    window.openProject = function(imgArray) {
        const projectModal = document.getElementById("projectModal");
        const fullImg = document.getElementById("imgFull");
        const navBtns = document.querySelectorAll("#projectModal .nav-btn");
        
        if (!projectModal || !fullImg) return;

        currentImages = imgArray;
        currentIndex = 0;
        fullImg.src = currentImages[currentIndex];
        projectModal.style.display = "flex";
        document.body.style.overflow = 'hidden';

        if (currentImages.length <= 1) {
            navBtns.forEach(btn => btn.style.display = "none");
        } else {
            navBtns.forEach(btn => btn.style.display = "flex");
        }
    }

    window.changeImage = function(step) {
        currentIndex += step;
        if (currentIndex >= currentImages.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = currentImages.length - 1;
        
        const fullImg = document.getElementById("imgFull");
        if (fullImg) {
            fullImg.style.opacity = "0";
            setTimeout(() => {
                fullImg.src = currentImages[currentIndex];
                fullImg.style.opacity = "1";
            }, 150);
        }
    }

    window.closeProject = function() {
        const projectModal = document.getElementById("projectModal");
        if (projectModal) {
            projectModal.style.display = "none";
            document.body.style.overflow = '';
        }
    }

    const projectCloseBtn = document.querySelector("#projectModal .close-project");
    if (projectCloseBtn) {
        projectCloseBtn.onclick = window.closeProject;
    }

    // Tambahkan handler untuk klik luar Project Modal
    addWindowClickHandler(function(event) {
        const projectModal = document.getElementById("projectModal");
        if (event.target == projectModal) {
            window.closeProject();
        }
    });

    // === 6. SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

}); // <-- AKHIR DARI DOMContentLoaded

// Cek apakah elemen ditemukan
console.log('Menu toggle:', document.getElementById('mobile-menu'));
console.log('Bars:', document.querySelectorAll('.menu-toggle .bar'));
console.log('Navbar:', document.querySelector('.navbar'));

// Cek computed style
const toggle = document.getElementById('mobile-menu');
if (toggle) {
    const style = window.getComputedStyle(toggle);
    console.log('Display:', style.display);
    console.log('Visibility:', style.visibility);
    console.log('Opacity:', style.opacity);
}