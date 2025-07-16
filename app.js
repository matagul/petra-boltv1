// Luxury Casino Review Website - Enhanced with GSAP & Advanced Animations
// Handles dynamic content, parallax effects, and premium 3D interactions

class LuxuryCasinoApp {
    constructor() {
        this.currentLanguage = 'en';
        this.data = null;
        this.sortColumn = 'bonus';
        this.sortDirection = 'desc';
        this.scrollY = 0;
        this.isLoaded = false;
        
        this.init();
    }
    
    async init() {
        // Initialize GSAP and ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Load saved language preference
        this.loadLanguagePreference();
        
        // Load data and initialize app
        await this.loadData();
        this.setupEventListeners();
        this.initializeAnimations();
        this.createParticles();
        this.renderContent();
        this.hideLoading();
        
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
        
        this.isLoaded = true;
    }
    
    loadLanguagePreference() {
        const savedLang = localStorage.getItem('luxury-casino-lang');
        if (savedLang && ['en', 'ar'].includes(savedLang)) {
            this.currentLanguage = savedLang;
        }
    }
    
    async loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Failed to load data');
            this.data = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = this.getFallbackData();
        }
    }
    
    getFallbackData() {
        return {
            en: {
                hero: {
                    headline: "Top Casino Reviews",
                    subheadline: "Petra.bet offers 20% higher bonuses than competitors",
                    cta1: "Play on Petra.bet",
                    cta2: "Compare with Others"
                },
                ranking: [
                    {
                        name: "Petra.bet",
                        scores: { bonus: 95, ux: 92, speed: 90, games: 88 },
                        isPetra: true
                    }
                ],
                reviews: [],
                tips: [],
                banking: []
            },
            ar: {
                hero: {
                    headline: "أفضل مراجعات الكازينو",
                    subheadline: "بيترا.بت تقدم مكافآت أعلى بنسبة 20% من المنافسين",
                    cta1: "العب على بيترا.بت",
                    cta2: "قارن مع الآخرين"
                },
                ranking: [
                    {
                        name: "Petra.bet",
                        scores: { bonus: 95, ux: 92, speed: 90, games: 88 },
                        isPetra: true
                    }
                ],
                reviews: [],
                tips: [],
                banking: []
            }
        };
    }
    
    initializeAnimations() {
        // Parallax background layers
        this.setupParallaxLayers();
        
        // Header scroll effects
        this.setupHeaderEffects();
        
        // Hero floating elements
        this.setupFloatingElements();
        
        // Advanced scroll animations
        this.setupScrollAnimations();
        
        // 3D card effects
        this.setup3DCards();
    }
    
    setupParallaxLayers() {
        const layers = document.querySelectorAll('.parallax-layer');
        
        layers.forEach((layer, index) => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            
            gsap.to(layer, {
                yPercent: -50 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
        
        // Background shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = parseFloat(shape.dataset.parallaxSpeed) || 0.3;
            
            gsap.to(shape, {
                y: -100 * speed,
                rotation: 360 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }
    
    setupHeaderEffects() {
        const header = document.getElementById('header');
        
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: {className: "scrolled", targets: header}
        });
        
        // Logo animation on scroll
        gsap.to('.logo', {
            scale: 0.9,
            scrollTrigger: {
                trigger: "body",
                start: "top -50",
                end: "top -100",
                scrub: 1
            }
        });
    }
    
    setupFloatingElements() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            const speed = parseFloat(card.dataset.floatSpeed) || 2;
            
            // Continuous floating animation
            gsap.to(card, {
                y: -30,
                rotation: 5,
                duration: speed,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
            
            // Parallax movement on scroll
            gsap.to(card, {
                y: -50 * (speed / 2),
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }
    
    setupScrollAnimations() {
        // Section reveal animations
        gsap.utils.toArray('section').forEach((section, index) => {
            gsap.fromTo(section, 
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1
                    }
                }
            );
        });
        
        // Stagger animations for cards
        gsap.utils.toArray('.review-card').forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 60,
                    rotationX: -15
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    delay: index * 0.1
                }
            );
        });
        
        // Tips cards morphing animation
        gsap.utils.toArray('.tip-card').forEach((card, index) => {
            gsap.fromTo(card,
                {
                    scale: 0.8,
                    opacity: 0,
                    rotationY: -45
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    delay: index * 0.15
                }
            );
        });
    }
    
    setup3DCards() {
        // Enhanced 3D hover effects for review cards
        document.querySelectorAll('.review-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                gsap.to(card, {
                    rotationX: 5,
                    rotationY: 2,
                    z: 50,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', (e) => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            // Mouse move 3D effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.1,
                    ease: "power2.out"
                });
            });
        });
        
        // 3D table hover effect
        const table = document.querySelector('.ranking-table-container');
        if (table) {
            table.addEventListener('mouseenter', () => {
                gsap.to(table, {
                    rotationX: 2,
                    rotationY: 1,
                    z: 20,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            table.addEventListener('mouseleave', () => {
                gsap.to(table, {
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        }
    }
    
    createParticles() {
        const container = document.getElementById('particles-container');
        const particleCount = window.innerWidth < 768 ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            container.appendChild(particle);
        }
    }
    
    setupEventListeners() {
        // Language switcher with enhanced animations
        document.getElementById('lang-en').addEventListener('click', () => this.switchLanguage('en'));
        document.getElementById('lang-ar').addEventListener('click', () => this.switchLanguage('ar'));
        
        // Enhanced ranking table sorting
        document.querySelectorAll('[data-sort]').forEach(header => {
            header.addEventListener('click', (e) => {
                const column = e.target.dataset.sort;
                this.sortRanking(column);
                
                // Add click animation
                gsap.fromTo(header, 
                    { scale: 1 },
                    { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }
                );
            });
        });
        
        // Smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: "power2.inOut"
                    });
                }
            });
        });
        
        // Enhanced button interactions
        document.querySelectorAll('.luxury-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            btn.addEventListener('click', () => {
                gsap.fromTo(btn,
                    { scale: 1.05 },
                    { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }
                );
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Resize handler for responsive animations
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        // Animate language switch
        const content = document.getElementById('main-content');
        
        gsap.to(content, {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                this.currentLanguage = lang;
                localStorage.setItem('luxury-casino-lang', lang);
                
                // Update HTML attributes
                document.documentElement.lang = lang;
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                
                // Update language switcher buttons
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.lang === lang);
                });
                
                // Re-render content
                this.renderContent();
                this.updateMetaTags();
                
                // Animate back in
                gsap.to(content, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    }
    
    updateMetaTags() {
        const content = this.data[this.currentLanguage];
        document.title = content.meta?.title || content.hero.headline;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && content.meta?.description) {
            metaDescription.content = content.meta.description;
        }
    }
    
    renderContent() {
        const content = this.data[this.currentLanguage];
        
        this.renderHero(content.hero);
        this.renderRanking(content.ranking);
        this.renderReviews(content.reviews);
        this.renderTips(content.tips);
        this.renderBanking(content.banking);
        this.renderBonuses(content.bonuses);
        this.renderMobile(content.mobile);
        this.renderSupport(content.support);
        this.renderResponsible(content.responsible);
        this.renderFooter(content.footer);
    }
    
    renderHero(hero) {
        // Animate text changes
        const headline = document.getElementById('hero-headline');
        const subheadline = document.getElementById('hero-subheadline');
        const cta1 = document.getElementById('cta-primary').querySelector('.btn-text');
        const cta2 = document.getElementById('cta-secondary').querySelector('.btn-text');
        
        gsap.fromTo([headline, subheadline, cta1, cta2], 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                stagger: 0.1,
                ease: "power2.out"
            }
        );
        
        headline.textContent = hero.headline;
        subheadline.textContent = hero.subheadline;
        cta1.textContent = hero.cta1;
        cta2.textContent = hero.cta2;
    }
    
    renderRanking(ranking) {
        const content = this.data[this.currentLanguage];
        document.getElementById('ranking-title').textContent = content.sectionTitles?.ranking || 'Casino Rankings';
        
        const tbody = document.getElementById('ranking-tbody');
        tbody.innerHTML = '';
        
        const sortedRanking = this.sortRankingData(ranking);
        
        sortedRanking.forEach((casino, index) => {
            const row = document.createElement('tr');
            if (casino.isPetra) {
                row.classList.add('petra-row');
            }
            
            const overall = Math.round(
                (casino.scores.bonus + casino.scores.ux + casino.scores.speed + casino.scores.games) / 4
            );
            
            row.innerHTML = `
                <td class="casino-name">${casino.name}</td>
                <td class="score ${this.getScoreClass(casino.scores.bonus)}">${casino.scores.bonus}</td>
                <td class="score ${this.getScoreClass(casino.scores.ux)}">${casino.scores.ux}</td>
                <td class="score ${this.getScoreClass(casino.scores.speed)}">${casino.scores.speed}</td>
                <td class="score ${this.getScoreClass(casino.scores.games)}">${casino.scores.games}</td>
                <td class="score ${this.getScoreClass(overall)}">${overall}</td>
            `;
            
            tbody.appendChild(row);
            
            // Animate row appearance
            gsap.fromTo(row,
                { opacity: 0, x: -50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "power2.out"
                }
            );
        });
    }
    
    sortRankingData(ranking) {
        const sorted = [...ranking].sort((a, b) => {
            let valueA, valueB;
            
            if (this.sortColumn === 'name') {
                valueA = a.name;
                valueB = b.name;
            } else if (this.sortColumn === 'overall') {
                valueA = (a.scores.bonus + a.scores.ux + a.scores.speed + a.scores.games) / 4;
                valueB = (b.scores.bonus + b.scores.ux + b.scores.speed + b.scores.games) / 4;
            } else {
                valueA = a.scores[this.sortColumn];
                valueB = b.scores[this.sortColumn];
            }
            
            if (typeof valueA === 'string') {
                return this.sortDirection === 'asc' ? 
                    valueA.localeCompare(valueB) : 
                    valueB.localeCompare(valueA);
            }
            
            return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        });
        
        return sorted;
    }
    
    sortRanking(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'desc';
        }
        
        this.renderRanking(this.data[this.currentLanguage].ranking);
    }
    
    getScoreClass(score) {
        if (score >= 85) return 'high';
        if (score >= 70) return 'medium';
        return 'low';
    }
    
    renderReviews(reviews) {
        const content = this.data[this.currentLanguage];
        document.getElementById('reviews-title').textContent = content.sectionTitles?.reviews || 'Detailed Reviews';
        
        const grid = document.getElementById('reviews-grid');
        grid.innerHTML = '';
        
        reviews.forEach((review, index) => {
            const card = document.createElement('div');
            card.className = `review-card card-3d ${review.isPetra ? 'petra' : ''}`;
            
            const prosHTML = review.pros.map(pro => `<li>${pro}</li>`).join('');
            const consHTML = review.cons.map(con => `<li>${con}</li>`).join('');
            const paymentHTML = review.payments.map(method => 
                `<span class="payment-method">${method}</span>`
            ).join('');
            
            card.innerHTML = `
                <div class="review-header">
                    <div class="review-logo">${review.icon}</div>
                    <div class="review-info">
                        <h3>${review.name}</h3>
                        <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                    </div>
                </div>
                <p class="review-description">${review.description}</p>
                <div class="review-details">
                    <div class="review-section">
                        <h4>${content.reviewLabels?.pros || 'Pros'}</h4>
                        <ul class="review-list pros">${prosHTML}</ul>
                    </div>
                    <div class="review-section">
                        <h4>${content.reviewLabels?.cons || 'Cons'}</h4>
                        <ul class="review-list cons">${consHTML}</ul>
                    </div>
                    <div class="review-section">
                        <h4>${content.reviewLabels?.payments || 'Payment Methods'}</h4>
                        <div class="payment-methods">${paymentHTML}</div>
                    </div>
                    <div class="bonus-info">
                        ${review.bonus}
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
            
            // Add AOS attributes for scroll animation
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
        });
    }
    
    renderTips(tips) {
        const content = this.data[this.currentLanguage];
        document.getElementById('tips-title').textContent = content.sectionTitles?.tips || 'Game Tips';
        
        const grid = document.getElementById('tips-grid');
        grid.innerHTML = '';
        
        tips.forEach((tip, index) => {
            const card = document.createElement('div');
            card.className = 'tip-card';
            
            card.innerHTML = `
                <div class="tip-icon">${tip.icon}</div>
                <h3 class="tip-title">${tip.title}</h3>
                <p class="tip-description">${tip.description}</p>
            `;
            
            // Add AOS attributes
            card.setAttribute('data-aos', 'zoom-in');
            card.setAttribute('data-aos-delay', (index * 150).toString());
            
            grid.appendChild(card);
        });
    }
    
    renderBanking(banking) {
        const content = this.data[this.currentLanguage];
        document.getElementById('banking-title').textContent = content.sectionTitles?.banking || 'Banking & Security';
        
        const container = document.getElementById('banking-content');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'banking-grid';
        
        banking.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'banking-card';
            
            card.innerHTML = `
                <div class="banking-icon">${item.icon}</div>
                <h3 class="banking-title">${item.title}</h3>
                <p class="banking-description">${item.description}</p>
            `;
            
            // Add AOS attributes
            card.setAttribute('data-aos', 'slide-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        
        // Add security badges
        const badges = document.createElement('div');
        badges.className = 'security-badges';
        badges.innerHTML = `
            <span class="security-badge">SSL Encrypted</span>
            <span class="security-badge">Licensed</span>
            <span class="security-badge">Fair Play</span>
            <span class="security-badge">Responsible Gaming</span>
        `;
        
        badges.setAttribute('data-aos', 'fade-up');
        badges.setAttribute('data-aos-delay', '400');
        
        container.appendChild(badges);
    }
    
    renderBonuses(bonuses) {
        const content = this.data[this.currentLanguage];
        
        // Create bonuses section
        const bonusesSection = document.createElement('section');
        bonusesSection.className = 'bonuses parallax-container';
        bonusesSection.innerHTML = `
            <div class="container">
                <h2 class="section-title" data-aos="fade-up" data-aos-duration="1000">
                    ${content.sectionTitles?.bonuses || 'Bonus Comparison Guide'}
                </h2>
                <div class="bonuses-content" id="bonuses-content"></div>
            </div>
        `;
        
        // Insert after banking section
        const bankingSection = document.querySelector('.banking');
        bankingSection.insertAdjacentElement('afterend', bonusesSection);
        
        const container = document.getElementById('bonuses-content');
        const grid = document.createElement('div');
        grid.className = 'bonuses-grid';
        
        bonuses.forEach((bonus, index) => {
            const card = document.createElement('div');
            card.className = 'bonus-card';
            
            card.innerHTML = `
                <div class="bonus-icon">${bonus.icon}</div>
                <h3 class="bonus-title">${bonus.title}</h3>
                <p class="bonus-description">${bonus.description}</p>
            `;
            
            card.setAttribute('data-aos', 'flip-left');
            card.setAttribute('data-aos-delay', (index * 150).toString());
            
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    }
    
    renderMobile(mobile) {
        const content = this.data[this.currentLanguage];
        
        // Create mobile section
        const mobileSection = document.createElement('section');
        mobileSection.className = 'mobile parallax-container';
        mobileSection.innerHTML = `
            <div class="container">
                <h2 class="section-title" data-aos="fade-up" data-aos-duration="1000">
                    ${content.sectionTitles?.mobile || 'Mobile Gaming Experience'}
                </h2>
                <div class="mobile-content" id="mobile-content"></div>
            </div>
        `;
        
        // Insert after bonuses section
        const bonusesSection = document.querySelector('.bonuses');
        bonusesSection.insertAdjacentElement('afterend', mobileSection);
        
        const container = document.getElementById('mobile-content');
        const grid = document.createElement('div');
        grid.className = 'mobile-grid';
        
        mobile.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'mobile-card';
            
            card.innerHTML = `
                <div class="mobile-icon">${item.icon}</div>
                <h3 class="mobile-title">${item.title}</h3>
                <p class="mobile-description">${item.description}</p>
            `;
            
            card.setAttribute('data-aos', 'zoom-in-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    }
    
    renderSupport(support) {
        const content = this.data[this.currentLanguage];
        
        // Create support section
        const supportSection = document.createElement('section');
        supportSection.className = 'support parallax-container';
        supportSection.innerHTML = `
            <div class="container">
                <h2 class="section-title" data-aos="fade-up" data-aos-duration="1000">
                    ${content.sectionTitles?.support || 'Customer Support Analysis'}
                </h2>
                <div class="support-content" id="support-content"></div>
            </div>
        `;
        
        // Insert after mobile section
        const mobileSection = document.querySelector('.mobile');
        mobileSection.insertAdjacentElement('afterend', supportSection);
        
        const container = document.getElementById('support-content');
        const grid = document.createElement('div');
        grid.className = 'support-grid';
        
        support.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'support-card';
            
            card.innerHTML = `
                <div class="support-icon">${item.icon}</div>
                <h3 class="support-title">${item.title}</h3>
                <p class="support-description">${item.description}</p>
            `;
            
            card.setAttribute('data-aos', 'slide-right');
            card.setAttribute('data-aos-delay', (index * 120).toString());
            
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    }
    
    renderResponsible(responsible) {
        const content = this.data[this.currentLanguage];
        
        // Create responsible section
        const responsibleSection = document.createElement('section');
        responsibleSection.className = 'responsible parallax-container';
        responsibleSection.innerHTML = `
            <div class="container">
                <h2 class="section-title" data-aos="fade-up" data-aos-duration="1000">
                    ${content.sectionTitles?.responsible || 'Responsible Gaming'}
                </h2>
                <div class="responsible-content" id="responsible-content"></div>
            </div>
        `;
        
        // Insert after support section
        const supportSection = document.querySelector('.support');
        supportSection.insertAdjacentElement('afterend', responsibleSection);
        
        const container = document.getElementById('responsible-content');
        const grid = document.createElement('div');
        grid.className = 'responsible-grid';
        
        responsible.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'responsible-card';
            
            card.innerHTML = `
                <div class="responsible-icon">${item.icon}</div>
                <h3 class="responsible-title">${item.title}</h3>
                <p class="responsible-description">${item.description}</p>
            `;
            
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        
        // Add responsible gaming notice
        const notice = document.createElement('div');
        notice.className = 'responsible-notice';
        notice.innerHTML = `
            <div class="notice-content">
                <h4>🛡️ Our Commitment to Responsible Gaming</h4>
                <p>We are committed to providing a safe and responsible gaming environment. If you or someone you know has a gambling problem, please seek help from professional organizations.</p>
                <div class="help-links">
                    <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener">Gamblers Anonymous</a>
                    <a href="https://www.ncpgambling.org" target="_blank" rel="noopener">National Council on Problem Gambling</a>
                    <a href="https://www.begambleaware.org" target="_blank" rel="noopener">BeGambleAware</a>
                </div>
            </div>
        `;
        
        notice.setAttribute('data-aos', 'fade-up');
        notice.setAttribute('data-aos-delay', '400');
        
        container.appendChild(notice);
    }
    
    renderFooter(footer) {
        if (!footer) return;
        
        const elements = {
            'disclaimer': footer.disclaimer,
            'terms-link': footer.terms,
            'privacy-link': footer.privacy,
            'contact-link': footer.contact
        };
        
        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element && text) {
                element.textContent = text;
            }
        });
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        const mainContent = document.getElementById('main-content');
        
        // Luxury loading animation
        gsap.to(loading, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                loading.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Animate main content in
                gsap.fromTo(mainContent,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                );
            }
        });
    }
    
    handleResize() {
        // Refresh ScrollTrigger on resize
        ScrollTrigger.refresh();
        
        // Recreate particles for new screen size
        const container = document.getElementById('particles-container');
        container.innerHTML = '';
        this.createParticles();
    }
    
    // Utility function for debouncing
    debounce(func, wait) {
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
}

// Global functions
function scrollToRanking() {
    const rankingSection = document.getElementById('ranking');
    if (rankingSection) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: rankingSection,
                offsetY: 80
            },
            ease: "power2.inOut"
        });
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Luxury site loaded in ${loadTime}ms`);
        });
    }
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    
    // Graceful degradation for animation failures
    if (e.error.message.includes('gsap') || e.error.message.includes('ScrollTrigger')) {
        console.warn('Animation library error - falling back to basic functionality');
        document.body.classList.add('no-animations');
    }
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    new LuxuryCasinoApp();
    initPerformanceMonitoring();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuxuryCasinoApp;
}