document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // 4. Modal System Logic
    const productsData = {
        'castor': {
            title: 'Organic Castor Oil',
            desc: 'Rich in ricinoleic acid, our cold-pressed castor oil is perfect for promoting hair growth and deep skin moisturization.',
            imgUrl: 'castor.png',
            prices: [
                { size: '500 ml', price: '₹90' },
                { size: '1 L (1 Kg)', price: '₹180' },
                { size: '2 L', price: '₹360' },
                { size: '5 L', price: '₹900' }
            ]
        },
        'neem': {
            title: 'Pure Neem Oil',
            desc: 'Renowned for its antibacterial properties, this pure natural extract is exceptional for skin care and agricultural use.',
            imgUrl: 'neem.png',
            prices: [
                { size: '500 ml', price: '₹150' },
                { size: '1 L (1 Kg)', price: '₹300' },
                { size: '2 L', price: '₹600' },
                { size: '5 L', price: '₹1500' }
            ]
        },
        'groundnut': {
            title: 'Cold Pressed Groundnut Oil',
            desc: 'A healthier choice for everyday cooking, packed with monounsaturated fats and a rich, nutty flavor.',
            imgUrl: 'groundnut.png',
            prices: [
                { size: '500 ml', price: '₹100' },
                { size: '1 L (1 Kg)', price: '₹200' },
                { size: '2 L', price: '₹400' },
                { size: '5 L', price: '₹1000' }
            ]
        }
    };

    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-btn');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productKey = card.getAttribute('data-product');
            const data = productsData[productKey];
            
            if (data) {
                document.getElementById('modal-img').src = data.imgUrl;
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-desc').textContent = data.desc;
                
                const pricingContainer = document.getElementById('modal-pricing');
                pricingContainer.innerHTML = ''; // clear old
                
                data.prices.forEach(p => {
                    const item = document.createElement('div');
                    item.className = 'price-item';
                    item.innerHTML = `<span class="price-size">${p.size}</span><span class="price-value">${p.price}</span>`;
                    pricingContainer.appendChild(item);
                });

                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});
