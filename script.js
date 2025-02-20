document.addEventListener('DOMContentLoaded', () => {
    // 预加载大图
    const preloadImages = () => {
        const images = [
            'public/7170632.png',
            'public/p1.png',
            'public/p2-2.png',
            'public/p3-2.png',
            'public/p4-2.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    preloadImages();

    // 初始化 Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        wheelMultiplier: 0.8,  // 减小滚动速度
        lerp: 0.1,  // 增加平滑度
        syncTouch: true
    });

    // Lenis 滚动更新
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    
    // 使用 Lenis 的滚动事件
    lenis.on('scroll', handleScroll);
    
    // 处理鼠标悬停图片效果
    const processItems = document.querySelectorAll('.process-item');
    
    processItems.forEach(item => {
        const hoverImage = item.querySelector('.hover-image');
        
        item.addEventListener('mouseenter', () => {
            hoverImage.classList.add('active');
        });
        
        item.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            requestAnimationFrame(() => {
                hoverImage.style.left = `${mouseX}px`;
                hoverImage.style.top = `${mouseY}px`;
            });
        });
        
        item.addEventListener('mouseleave', () => {
            hoverImage.classList.remove('active');
        });
    });

    // 处理锚点链接的平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
}); 