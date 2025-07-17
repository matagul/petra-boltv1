const API_URLS = {
  en: 'https://petra.bet/x/api/promotions/public?locale=en',
  ar: 'https://petra.bet/x/api/promotions/public?locale=ar'
};

const promosGrid = document.getElementById('promos-grid');
const loadingDiv = document.getElementById('info-loading');
const langEnBtn = document.getElementById('lang-en');
const langArBtn = document.getElementById('lang-ar');
const promosTitle = document.getElementById('promos-title');

let currentLang = localStorage.getItem('petra-info-lang') || 'en';

function setActiveLang(lang) {
  currentLang = lang;
  localStorage.setItem('petra-info-lang', lang);
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

langEnBtn.addEventListener('click', () => {
  setActiveLang('en');
  fetchPromos('en');
});
langArBtn.addEventListener('click', () => {
  setActiveLang('ar');
  fetchPromos('ar');
});

// Initial load
setActiveLang(currentLang);
fetchPromos(currentLang); 