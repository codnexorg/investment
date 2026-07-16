/* ============================================
   ROYAL CAPITAL — Premium JavaScript
   All Interactivity, Animations & Effects
   ============================================ */

// ===== INVESTMENT PLANS DATA =====
const investmentPlans = [
    { id: 1,  investment: 295,    dailyProfit: 73,    totalProfit: 5475,    duration: 75, tier: 'bronze' },
    { id: 2,  investment: 895,    dailyProfit: 223,   totalProfit: 16725,   duration: 75, tier: 'bronze' },
    { id: 3,  investment: 1695,   dailyProfit: 423,   totalProfit: 31725,   duration: 75, tier: 'bronze' },
    { id: 4,  investment: 2795,   dailyProfit: 698,   totalProfit: 52350,   duration: 75, tier: 'bronze' },
    { id: 5,  investment: 4395,   dailyProfit: 1098,  totalProfit: 82350,   duration: 75, tier: 'silver' },
    { id: 6,  investment: 7295,   dailyProfit: 1823,  totalProfit: 136725,  duration: 75, tier: 'silver' },
    { id: 7,  investment: 9795,   dailyProfit: 2448,  totalProfit: 183600,  duration: 75, tier: 'silver' },
    { id: 8,  investment: 14995,  dailyProfit: 3748,  totalProfit: 281100,  duration: 75, tier: 'silver' },
    { id: 9,  investment: 23995,  dailyProfit: 5998,  totalProfit: 449850,  duration: 75, tier: 'gold' },
    { id: 10, investment: 34995,  dailyProfit: 8748,  totalProfit: 656100,  duration: 75, tier: 'gold' },
    { id: 11, investment: 46995,  dailyProfit: 11748, totalProfit: 881100,  duration: 75, tier: 'gold' },
    { id: 12, investment: 63695,  dailyProfit: 15998, totalProfit: 1199850, duration: 75, tier: 'gold' },
    { id: 13, investment: 86995,  dailyProfit: 21748, totalProfit: 1631100, duration: 75, tier: 'platinum' },
    { id: 14, investment: 117995, dailyProfit: 29498, totalProfit: 2212350, duration: 75, tier: 'platinum' },
    { id: 15, investment: 186995, dailyProfit: 46748, totalProfit: 3506100, duration: 75, tier: 'platinum' },
];

const tierConfig = {
    bronze:   { icon: '🥉', label: 'Bronze',   emoji: '⭐' },
    silver:   { icon: '🥈', label: 'Silver',   emoji: '💫' },
    gold:     { icon: '🥇', label: 'Gold',     emoji: '👑' },
    platinum: { icon: '💎', label: 'Platinum', emoji: '🚀' },
};

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    return num.toLocaleString('en-PK');
}

function calculateROI(totalProfit, investment) {
    return ((totalProfit / investment) * 100).toFixed(0);
}

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2500);
    });

    // Fallback: hide after 5s even if load event already fired
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 5000);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    if (!navbar) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (currentScroll > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // Hamburger menu
    if (hamburger && mobileNav && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('open');
            mobileOverlay.classList.toggle('active');
            mobileOverlay.style.display = mobileOverlay.classList.contains('active') ? 'block' : 'none';
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        mobileOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
            mobileOverlay.classList.remove('active');
            setTimeout(() => { mobileOverlay.style.display = 'none'; }, 300);
            document.body.style.overflow = '';
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Close mobile menu
            if (hamburger && mobileNav) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('open');
                mobileOverlay.classList.remove('active');
                setTimeout(() => { mobileOverlay.style.display = 'none'; }, 300);
                document.body.style.overflow = '';
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}

// ===== CARD GENERATION =====
function generatePlanCards(filterTier = 'all') {
    const grid = document.getElementById('plans-grid');
    if (!grid) return;

    const filteredPlans = filterTier === 'all'
        ? investmentPlans
        : investmentPlans.filter(p => p.tier === filterTier);

    grid.innerHTML = '';

    filteredPlans.forEach((plan, index) => {
        const tier = tierConfig[plan.tier];
        const roi = calculateROI(plan.totalProfit, plan.investment);

        const card = document.createElement('div');
        card.className = `plan-card ${plan.tier} reveal`;
        card.style.transitionDelay = `${index * 0.06}s`;

        card.innerHTML = `
            <div class="card-accent"></div>
            <div class="card-inner">
                <div class="card-tier-badge">
                    <span class="badge-dot"></span>
                    <span>${tier.icon} ${tier.label}</span>
                </div>
                <div class="card-amount">
                    <span class="currency">RS</span>
                    <span class="amount">${formatNumber(plan.investment)}</span>
                </div>
                <div class="card-roi">
                    <span class="roi-arrow">▲</span>
                    <span class="roi-value">${roi}%</span>
                    <span class="roi-label">ROI</span>
                </div>
                <div class="card-stats">
                    <div class="stat-row">
                        <div class="stat-icon daily">📈</div>
                        <div class="stat-info">
                            <span class="stat-label">Daily Profit</span>
                            <span class="stat-value">RS ${formatNumber(plan.dailyProfit)}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-icon total">💰</div>
                        <div class="stat-info">
                            <span class="stat-label">Total Profit</span>
                            <span class="stat-value">RS ${formatNumber(plan.totalProfit)}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-icon duration">📅</div>
                        <div class="stat-info">
                            <span class="stat-label">Duration</span>
                            <span class="stat-value">${plan.duration} Days</span>
                        </div>
                    </div>
                </div>
                <button class="invest-btn" onclick="handleInvest(${plan.id})">
                    INVEST NOW ${tier.emoji}
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    // Re-initialize scroll reveal for new cards
    requestAnimationFrame(() => {
        initScrollReveal();
        init3DTilt();
    });
}

// ===== TIER FILTER TABS =====
function initTierTabs() {
    const tabs = document.querySelectorAll('.tier-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tier = tab.dataset.tier;
            generatePlanCards(tier);
        });
    });
}

// ===== 3D TILT EFFECT =====
function init3DTilt() {
    const cards = document.querySelectorAll('.plan-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.counter);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    el.textContent = formatNumber(current) + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = formatNumber(target) + suffix;
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        this.animationId = null;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        const count = Math.min(60, Math.floor((this.canvas.width * this.canvas.height) / 15000));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.4 + 0.1,
                color: Math.random() > 0.6 ? '#FFD700' : (Math.random() > 0.5 ? '#00D4FF' : '#00FFA3'),
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        this.canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.parentElement.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Move
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Mouse interaction - repel
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                p.x += (dx / dist) * force * 1.5;
                p.y += (dy / dist) * force * 1.5;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = '#FFD700';
                    this.ctx.globalAlpha = ((130 - dist) / 130) * 0.06;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.globalAlpha = 1;
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// ===== INVEST BUTTON HANDLER =====
function handleInvest(planId) {
    const plan = investmentPlans.find(p => p.id === planId);
    if (!plan) return;

    // Ripple effect on button
    const btn = event.target.closest('.invest-btn');
    if (btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    }

    // Show a premium toast notification
    showToast(`🎯 Plan RS ${formatNumber(plan.investment)} selected! Earn RS ${formatNumber(plan.dailyProfit)}/day`);
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.premium-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'premium-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
        </div>
    `;

    // Styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        zIndex: '9999',
        background: 'rgba(10, 10, 30, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 215, 0, 0.15)',
        borderRadius: '16px',
        padding: '16px 28px',
        color: '#fff',
        fontSize: '0.92rem',
        fontWeight: '500',
        fontFamily: "'Inter', sans-serif",
        boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,215,0,0.08)',
        transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
        maxWidth: '90vw',
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== LOTTIE INTEGRATION =====
function initLottie() {
    // Lottie animations are loaded via the <lottie-player> web component in HTML
    // This function handles any additional Lottie configuration
    const players = document.querySelectorAll('lottie-player');
    players.forEach(player => {
        player.addEventListener('error', () => {
            // Fallback: hide lottie player if animation fails to load
            player.style.display = 'none';
        });
    });
}

// ===== SMOOTH HERO CHART ANIMATION =====
function initHeroChart() {
    const bars = document.querySelectorAll('.hero-chart-bar');
    bars.forEach((bar, i) => {
        bar.style.animationDelay = `${1 + i * 0.15}s`;
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';

    // Initialize all modules
    initPreloader();
    initNavbar();
    generatePlanCards('all');
    initTierTabs();
    initScrollReveal();
    initCounterAnimation();
    initBackToTop();
    initLottie();
    initHeroChart();

    // Initialize particle system
    new ParticleSystem('particle-canvas');

    // Trigger reveal for already visible elements
    setTimeout(() => {
        initScrollReveal();
    }, 100);
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    // Pause heavy animations when tab is hidden
    const lottie = document.querySelectorAll('lottie-player');
    if (document.hidden) {
        lottie.forEach(p => p.pause && p.pause());
    } else {
        lottie.forEach(p => p.play && p.play());
    }
});
