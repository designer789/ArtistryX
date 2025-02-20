document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
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
}); 