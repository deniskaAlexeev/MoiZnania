// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Игнорируем пустые якоря
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialsDotsContainer = document.getElementById('testimonialsDots');
const prevBtn = document.getElementById('testimonialPrev');
const nextBtn = document.getElementById('testimonialNext');
let currentTestimonial = 0;
let testimonialDots = [];

// Динамически создаем точки навигации на основе количества слайдов
function initTestimonialDots() {
    if (testimonialsDotsContainer && testimonialSlides.length > 0) {
        // Очищаем существующие точки
        testimonialsDotsContainer.innerHTML = '';
        testimonialDots = [];
        
        // Создаем точки для каждого слайда
        testimonialSlides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('data-index', index);
            dot.setAttribute('aria-label', `Перейти к отзыву ${index + 1}`);
            testimonialsDotsContainer.appendChild(dot);
            testimonialDots.push(dot);
        });
        
        // Добавляем обработчики событий для точек
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }
}

function showTestimonial(index) {
    // Проверяем валидность индекса
    if (index < 0 || index >= testimonialSlides.length) {
        return;
    }
    
    // Убираем active у всех слайдов и точек
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Добавляем active нужным
    testimonialSlides[index].classList.add('active');
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    currentTestimonial = index;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const newIndex = currentTestimonial === 0 ? testimonialSlides.length - 1 : currentTestimonial - 1;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(newIndex);
    });
}

// Инициализируем точки при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialDots);
} else {
    initTestimonialDots();
}

// Автоматическая смена слайдов каждые 5 секунд
setInterval(() => {
    if (testimonialSlides.length > 0) {
        const newIndex = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(newIndex);
    }
}, 5000);

// ==========================================
// GALLERY FILTERING
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Фильтруем элементы галереи
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Добавляем анимацию появления
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'scaleIn 0.4s ease-out forwards';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// GALLERY MODAL
// ==========================================
const galleryModal = document.getElementById('galleryModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');

if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-image');
            const title = item.querySelector('.gallery-title').textContent;
            const category = item.querySelector('.gallery-category').textContent;
            
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Закрытие модального окна по клавише ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('active')) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==========================================
// FAQ ACCORDION
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все другие элементы
        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        
        // Переключаем текущий элемент
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Проверяем, загружен ли EmailJS
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS не загружен!');
            formError.textContent = 'Ошибка загрузки сервиса отправки. Пожалуйста, перезагрузите страницу.';
            formError.style.display = 'block';
            return;
        }
        
        // Показываем состояние загрузки
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Отправка...';
        formError.style.display = 'none';
        formSuccess.style.display = 'none';
        
        // Получаем данные формы
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email') || 'Не указан',
            childName: formData.get('childName') || 'Не указано',
            childAge: formData.get('childAge') || 'Не указано',
            program: formData.get('program') || 'Не выбрана',
            message: formData.get('message') || 'Нет сообщения'
        };
        
        try {
            // Отправляем через EmailJS
            const response = await emailjs.send(
                'service_cfwdgft',  // Service ID
                'template_9ll0koj', // Template ID
                {
                    from_name: data.name,
                    from_phone: data.phone,
                    from_email: data.email,
                    child_name: data.childName,
                    child_age: data.childAge,
                    program: data.program,
                    message: data.message,
                    to_email: 'sasun-saakyan@mail.ru'
                }
            );
            
            console.log('Успешная отправка:', response);
            
            // Показываем сообщение об успехе
            formSuccess.style.display = 'flex';
            contactForm.reset();
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            formError.textContent = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.';
            formError.style.display = 'block';
        } finally {
            // Возвращаем кнопку в исходное состояние
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Отправить сообщение
            `;
        }
    });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==========================================
// INTERSECTION OBSERVER FOR SECTIONS
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Анимация счетчиков при прокрутке
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const numberElement = entry.target.querySelector('.stat-number');
            const targetText = numberElement.textContent;
            const target = parseInt(targetText.replace('+', ''));
            
            animateCounter(numberElement, target);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ==========================================
// SET CURRENT YEAR IN FOOTER
// ==========================================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Отложенная загрузка изображений
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback для браузеров без поддержки loading="lazy"
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// УТИЛИТЫ
// ==========================================
// Debounce функция для оптимизации событий прокрутки
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Применяем debounce к событию прокрутки
const debouncedScroll = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedScroll);

// ==========================================
// ИНИЦИАЛИЗАЦИЯ EMAILJS И ЗАГРУЗКА
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // ИНИЦИАЛИЗАЦИЯ EMAILJS - должна быть ПОСЛЕ загрузки библиотеки!
    if (typeof emailjs !== 'undefined') {
        emailjs.init('8TNFT86Ft_mIyFCqn'); // Ваш Public Key из EmailJS
        console.log('✅ EmailJS инициализирован успешно!');
    } else {
        console.error('❌ EmailJS не загружен! Проверьте подключение библиотеки.');
    }
    
    // Инициализируем точки навигации для отзывов
    initTestimonialDots();
    
    // Запускаем проверку прокрутки
    handleScroll();
    revealOnScroll();
    
    // Добавляем класс loaded к body после полной загрузки
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    console.log('Сайт "Мои Знания" загружен успешно!');
});

// ==========================================
// ACCESSIBILITY
// ==========================================
// Улучшение доступности для клавиатурной навигации
document.addEventListener('keydown', (e) => {
    // Закрытие модальных окон по Escape
    if (e.key === 'Escape') {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});

// Фокус на первом элементе при открытии мобильного меню
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            const firstLink = mobileMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });
}
