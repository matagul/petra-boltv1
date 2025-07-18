const API_URLS = {
  en: 'https://petra.bet/x/api/promotions/public?locale=en',
  ar: 'https://petra.bet/x/api/promotions/public?locale=ar'
};

const promosGrid = document.getElementById('promos-grid');
const loadingDiv = document.getElementById('info-loading');
const langEnBtn = document.getElementById('lang-en');
const langArBtn = document.getElementById('lang-ar');
const promosTitle = document.getElementById('promos-title');

let currentLang = localStorage.getItem('luxury-casino-lang') || 'en';

function setActiveLang(lang) {
  currentLang = lang;
  localStorage.setItem('luxury-casino-lang', lang);
  langEnBtn.classList.toggle('active', lang === 'en');
  langArBtn.classList.toggle('active', lang === 'ar');
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  promosTitle.textContent = lang === 'ar' ? 'أحدث العروض' : 'Latest Promotions';
}

function renderPromos(promos) {
  promosGrid.innerHTML = '';
  promos.forEach((promo, idx) => {
    const card = document.createElement('div');
    card.className = 'promo-card';
    if (promo.cover && promo.cover.url) {
      const img = document.createElement('img');
      img.className = 'promo-img';
      img.src = promo.cover.url;
      img.alt = promo.title;
      card.appendChild(img);
    }
    const title = document.createElement('div');
    title.className = 'promo-title';
    title.textContent = promo.title;
    card.appendChild(title);
    if (promo.description) {
      const desc = document.createElement('div');
      desc.className = 'promo-desc';
      desc.textContent = promo.description;
      card.appendChild(desc);
    }
    let terms;
    if (promo.content) {
      terms = document.createElement('div');
      terms.className = 'promo-terms';
      terms.id = `promo-terms-${idx}`;
      terms.innerHTML = promo.content.replace(/\n/g, '<br>');
      card.appendChild(terms);
    }
    if (promo.content) {
      const btn = document.createElement('button');
      btn.className = 'read-more-btn';
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', `promo-terms-${idx}`);
      btn.textContent = currentLang === 'ar' ? '\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064a\u062f' : 'Read More';
      btn.addEventListener('click', function() {
        const expanded = terms.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', expanded);
        btn.textContent = expanded ? (currentLang === 'ar' ? '\u0625\u063e\u0644\u0627\u0642' : 'Read Less') : (currentLang === 'ar' ? '\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064a\u062f' : 'Read More');
      });
      card.appendChild(btn);
    }
    promosGrid.appendChild(card);
  });
}

async function fetchPromos(lang) {
  loadingDiv.style.display = '';
  promosGrid.style.display = 'none';
  try {
    const res = await fetch(API_URLS[lang]);
    if (!res.ok) throw new Error('Failed to load promotions');
    const data = await res.json();
    renderPromos(data.data || []);
    loadingDiv.style.display = 'none';
    promosGrid.style.display = '';
  } catch (e) {
    loadingDiv.innerHTML = `<div style='color:var(--error);font-size:1.2rem;'>${lang === 'ar' ? 'تعذر تحميل العروض' : 'Failed to load promotions.'}</div>`;
    promosGrid.style.display = 'none';
  }
}

const betwayPromos = {
  en: [
    {
      title: '100% Welcome Bonus up to $1000',
      description: 'Join Betway Arabia and double your first deposit up to $1000. Enjoy a huge selection of slots, live casino, and sports betting.',
      img: 'https://betwayarabia.com/promo1.jpg'
    },
    {
      title: 'Weekly Free Bets',
      description: 'Get free bets every week on your favorite sports and casino games. Loyalty pays at Betway!',
      img: 'https://betwayarabia.com/promo2.jpg'
    }
  ],
  ar: [
    {
      title: 'مكافأة ترحيب 100% حتى 1000$',
      description: 'انضم إلى بيتواي أرابيا وضعف أول إيداع لك حتى 1000$. استمتع بمجموعة ضخمة من الألعاب والرياضات.',
      img: 'https://betwayarabia.com/promo1.jpg'
    },
    {
      title: 'رهانات مجانية أسبوعية',
      description: 'احصل على رهانات مجانية كل أسبوع على ألعابك المفضلة. الولاء يكافأ في بيتواي!',
      img: 'https://betwayarabia.com/promo2.jpg'
    }
  ]
};
const rabonaPromos = {
  en: [
    {
      title: '100% Sports & Casino Bonus up to €500',
      description: 'Start your Rabona journey with a 100% bonus up to €500. Play slots, live casino, and bet on sports with extra funds.',
      img: 'https://rabona-8545.com/en/assets/promo1.jpg'
    },
    {
      title: 'Weekly Slot Tournaments',
      description: 'Compete in weekly slot tournaments for a chance to win cash prizes and free spins. Only at Rabona!',
      img: 'https://rabona-8545.com/en/assets/promo2.jpg'
    }
  ],
  ar: [
    {
      title: 'مكافأة ترحيب 100% حتى 500 يورو',
      description: 'ابدأ رحلتك مع رابونا بمكافأة 100% حتى 500 يورو. العب السلوتس والكازينو المباشر وراهن على الرياضة بأموال إضافية.',
      img: 'https://rabona-8545.com/en/assets/promo1.jpg'
    },
    {
      title: 'بطولات سلوت أسبوعية',
      description: 'تنافس في بطولات السلوت الأسبوعية واربح جوائز نقدية ودورات مجانية. فقط في رابونا!',
      img: 'https://rabona-8545.com/en/assets/promo2.jpg'
    }
  ]
};

function renderOtherPromos(promos, grid, lang) {
  grid.innerHTML = '';
  promos.forEach(promo => {
    const card = document.createElement('div');
    card.className = 'promo-card';
    const title = document.createElement('div');
    title.className = 'promo-title';
    title.textContent = promo.title;
    card.appendChild(title);
    if (promo.description) {
      const desc = document.createElement('div');
      desc.className = 'promo-desc';
      desc.textContent = promo.description;
      card.appendChild(desc);
    }
    grid.appendChild(card);
  });
}

function setAffiliateAccordionText(lang, open) {
  const btn = document.getElementById('affiliate-toggle-btn');
  if (!btn) return;
  if (lang === 'ar') {
    btn.textContent = open ? 'إخفاء برنامج الشركاء في بيترا.بت' : 'عرض برنامج الشركاء في بيترا.بت';
  } else {
    btn.textContent = open ? 'Hide Petra.bet Affiliate Program' : 'Show Petra.bet Affiliate Program';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('affiliate-toggle-btn');
  const section = document.getElementById('affiliate-section');
  let open = false;
  if (btn && section) {
    setAffiliateAccordionText(currentLang, open);
    btn.addEventListener('click', function() {
      open = !open;
      section.style.display = open ? '' : 'none';
      setAffiliateAccordionText(currentLang, open);
    });
  }
  // Floating elements animation
  setupFloatingElements();
});

function setupFloatingElements() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card) => {
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
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to(card, {
        y: -50 * (speed / 2),
        scrollTrigger: {
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  });
}

function renderAllPromos(lang) {
  setActiveLang(lang);
  fetchPromos(lang);
  renderOtherPromos(betwayPromos[lang], document.getElementById('betway-promos-grid'), lang);
  renderOtherPromos(rabonaPromos[lang], document.getElementById('rabona-promos-grid'), lang);
  // Update affiliate accordion text on language switch
  setAffiliateAccordionText(lang, document.getElementById('affiliate-section')?.style.display !== 'none');
}

langEnBtn.addEventListener('click', () => {
  renderAllPromos('en');
});
langArBtn.addEventListener('click', () => {
  renderAllPromos('ar');
});

// Initial load
renderAllPromos(currentLang); 