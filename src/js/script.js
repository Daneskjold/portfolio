let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.header');

const scrollPosition = () => window.scrollY || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !containHide()) {
        header.classList.add('hide');
        console.log('down');
    }
    else if (scrollPosition() < lastScroll && containHide()) {
        console.log('up');
        header.classList.remove('hide');
    }
    lastScroll = scrollPosition();
});

// marquee.js
(() => {
    // Кэшируем DOM-элементы один раз
    const marquee = document.querySelector('.works__moving-text');
    const firstGroup = document.querySelector('.works__moving-group');

    if (!marquee || !firstGroup) return;

    let currentAnimation = null;
    let resizeTimer = null;
    let lastDistance = 0;

    function initMarquee() {
        const distance = Math.round(firstGroup.getBoundingClientRect().width * 100) / 100;

        // Не пересоздаём анимацию, если ширина не изменилась
        if (distance === 0 || distance === lastDistance) return;
        lastDistance = distance;

        // Отменяем только нашу анимацию (не перебираем все)
        if (currentAnimation) {
            currentAnimation.cancel();
            currentAnimation = null;
        }

        currentAnimation = marquee.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(-${distance}px)` }
            ],
            {
                duration: 8000,
                iterations: Infinity,
                easing: 'linear'
            }
        );
    }

    // Запуск после загрузки шрифтов
    document.fonts.ready.then(initMarquee);

    // Пересчёт при ресайзе через debounce
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initMarquee, 200);
    }, { passive: true });
})();

// scale by scroll
const workCards = document.querySelectorAll('.work-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('work-card--visible');
        } else {
            entry.target.classList.remove('work-card--visible');
        }
    });
}, {
    threshold: 1 // срабатывает когда 100% карточки видно
});

workCards.forEach(card => observer.observe(card));