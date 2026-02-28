document.addEventListener('DOMContentLoaded', function() {
    const scroll = document.querySelector('.scroll');
    const boxWidth = 948;
    const indicators = document.getElementById('indicators');
    const indicatorItems = indicators.children;
    
    function updateIndicators() {
        const scrollPosition = scroll.scrollLeft;
        const maxScroll = scroll.scrollWidth - scroll.clientWidth;
        
        let currentBlock;
        
        if (scrollPosition >= maxScroll - 10) {
            currentBlock = 2;
        } else {
            currentBlock = Math.round(scrollPosition / boxWidth);
        }
        
        for (let i = 0; i < indicatorItems.length; i++) {
            indicatorItems[i].className = '';
            
            if (i === currentBlock) {
                indicatorItems[i].classList.add('oval');
            } else {
                indicatorItems[i].classList.add('krug');
            }
        }
    }
    
    scroll.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const scrollAmount = boxWidth * direction;
        
        const maxScroll = this.scrollWidth - this.clientWidth;
        
        if (this.scrollLeft + scrollAmount >= maxScroll - 20) {
            this.classList.add('at-end');
        } else {
            this.classList.remove('at-end');
        }
        
        this.scrollLeft += scrollAmount;
        
        setTimeout(updateIndicators, 50);
    }, { passive: false });
    
    scroll.addEventListener('scroll', updateIndicators);
    
    for (let i = 0; i < indicatorItems.length; i++) {
        indicatorItems[i].addEventListener('click', () => {
            scroll.scrollTo({
                left: i * boxWidth,
                behavior: 'smooth'
            });
            
            setTimeout(updateIndicators, 100);
        });
    }
    updateIndicators();
});