'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

for (const button of [...selectItems, ...filterBtn]) {
  button.dataset.filterValue = button.innerText.toLowerCase();
}

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterValue;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.dataset.filterValue;
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.dataset.pageTarget === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// language switcher for the profile, services and resume sections
const themeButton = document.querySelector('[data-theme-button]');
const themeIcon = document.querySelector('[data-theme-icon]');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isLight = theme === 'light';
  themeIcon.name = isLight ? 'moon-outline' : 'sunny-outline';
  themeButton.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  localStorage.setItem('portfolio-theme', theme);
}

setTheme(localStorage.getItem('portfolio-theme') || 'dark');
themeButton.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
});

const languageButtons = document.querySelectorAll('[data-language-button]');
let activeLanguage = 'en';
const translationGroups = {
  nav: document.querySelectorAll('[data-nav-link]'),
  about: document.querySelectorAll('.about .article-title, .about-text p'),
  services: document.querySelectorAll('.service-title, .service-item-title, .service-item-text'),
  resumeHeadings: document.querySelectorAll('.resume .article-title, .resume .timeline .title-wrapper .h3, .skills-title'),
  educationTitles: document.querySelectorAll('.resume .timeline:first-of-type .timeline-item-title'),
  educationText: document.querySelectorAll('.resume .timeline:first-of-type .timeline-text'),
  experienceTitles: document.querySelectorAll('.resume .timeline:nth-of-type(2) .timeline-item-title'),
  experienceText: document.querySelectorAll('.resume .timeline:nth-of-type(2) .timeline-text'),
  skills: document.querySelectorAll('.skills-item .h5'),
  sidebar: document.querySelectorAll('.info-content .title, .info_more-btn span, .contact-title'),
  testimonialsHeading: document.querySelectorAll('.testimonials-title'),
  testimonialsText: document.querySelectorAll('.testimonials-text p'),
  clientsHeading: document.querySelectorAll('.clients-title'),
  portfolioHeading: document.querySelectorAll('.portfolio .article-title'),
  portfolioFilters: document.querySelectorAll('[data-filter-btn], [data-select-item]'),
  portfolioSelect: document.querySelectorAll('[data-selecct-value]'),
  projectCategories: document.querySelectorAll('.project-category'),
  blogHeading: document.querySelectorAll('.blog .article-title'),
  blogCategories: document.querySelectorAll('.blog-category'),
  blogTitles: document.querySelectorAll('.blog-item-title'),
  blogText: document.querySelectorAll('.blog-text'),
  contact: document.querySelectorAll('.contact .article-title, .form-title, [data-form-btn]')
};

const englishContent = Object.fromEntries(
  Object.entries(translationGroups).map(([key, elements]) => [key, [...elements].map((element) => element.textContent.trim())])
);

const translations = {
  fr: {
    nav: ['À propos', 'CV', 'Portfolio', 'Blog', 'Contact'],
    about: [
      'À propos de moi',
      "Je suis Mekhalfa Yassine, directeur de la SARL Groupe Abidi, avec une formation en finance d'entreprise, gestion financière et comptabilité. Je combine une expérience stratégique, opérationnelle et commerciale pour contribuer à des décisions solides et à une croissance durable.",
      "Mes compétences couvrent l'analyse financière, la comptabilité, l'audit interne, la gestion de trésorerie et la banque. À l'aise dans la direction d'équipes et le travail sous pression, j'utilise Microsoft Office, PC Compta, PC Paie, SPSS et les solutions Easysoft. Je possède également des compétences en développement web et design visuel."
    ],
    services: [
      'Ce que je fais', 'Finance', 'Diversification stratégique et gestion proactive des risques pour une croissance durable.',
      'Suite Microsoft', "J'utilise la suite Microsoft afin d'améliorer l'efficacité des analyses et reportings financiers.",
      'Web design', 'Des designs modernes et de haute qualité, réalisés à un niveau professionnel.',
      'Développement web', 'Développement de sites de haute qualité à un niveau professionnel.',
      'Applications mobiles', "Développement professionnel d'applications pour iOS et Android.",
      'Photographie', 'Je réalise des photographies de haute qualité pour tous types de besoins.',
      'Gestion financière', "Gestion stratégique, financière et opérationnelle au service d'une croissance durable.",
      'Comptabilité et reporting', 'États financiers, reportings périodiques, suivi de trésorerie et rapprochements bancaires.',
      'Audit interne', 'Contrôles de conformité, identification des risques, recommandations et calcul des coûts de revient.',
      'Banque et crédit', 'Analyse des dossiers de crédit, évaluation de la solvabilité et appui aux opérations bancaires.',
      "Coordination d'équipe", "Encadrement des équipes, planification des activités et coordination des fonctions de l'entreprise.",
      'Outils numériques et visuels', 'Logiciels financiers, Microsoft Office, développement web et outils de design visuel.'
    ],
    resumeHeadings: ['CV', 'Formation', 'Expérience', 'Mes compétences'],
    educationTitles: ['École Supérieure des Sciences de Gestion', 'École Supérieure de Commerce d’Alger'],
    educationText: ["Cycle préparatoire aux écoles supérieures, validé par le concours national d'accès.", "Master en finance d'entreprise, apportant des connaissances avancées en analyse financière, finance d'entreprise et banque."],
    experienceTitles: ['Directeur · SARL Groupe Abidi', 'Gérant de station-service · Groupe Abidi', 'Cadre financier et comptable / Auditeur interne · Groupe Abidi', 'Cadre commercial · Groupe Abidi (Minoterie et SARL)', 'Stagiaire de fin d’études · BNA, Service Crédit', 'Stagiaire de fin d’études · BADR', 'Stagiaire pratique · BADR', 'Stagiaire découverte · AGB'],
    experienceText: ["Direction générale et pilotage stratégique, financier et opérationnel de l'entreprise. Coordination des équipes et des autres entités du Groupe Abidi.", "Gestion des opérations quotidiennes, des stocks et approvisionnements en carburant, des plannings, de la caisse et des rapports d'activité.", "Gestion des opérations comptables et financières, préparation des états financiers et reportings, suivi de trésorerie et rapprochements bancaires. Réalisation d'audits internes, analyse des risques et calcul des coûts de revient.", "Développement et suivi du portefeuille clients, gestion de la relation client et appui au suivi des ventes et objectifs commerciaux.", "Participation à l'étude et au traitement des demandes de crédit : vérification des dossiers, analyse de solvabilité, évaluation du risque et suivi administratif.", "Évaluation des demandes de crédit selon les politiques internes, analyse des dossiers clients et collaboration à l'évaluation des risques.", "Appui aux consultations de comptes, à l'émission de factures et relevés, à la gestion des cartes et au traitement des dossiers de succession.", "Stage d'observation offrant une première expérience des opérations bancaires quotidiennes."],
    skills: ['Analyse financière et comptabilité', 'Suite Microsoft Office', 'Logiciels financiers et comptables', 'Audit interne et gestion de trésorerie', 'Développement web', 'Design visuel']
  },
  ar: {
    nav: ['نبذة', 'السيرة الذاتية', 'الأعمال', 'المدونة', 'اتصل بي'],
    about: ['نبذة عني', 'أنا مخالفة ياسين، مدير شركة SARL Groupe Abidi، ولدي تكوين في مالية المؤسسات والإدارة المالية والمحاسبة. أجمع بين الخبرة الاستراتيجية والتشغيلية والتجارية لدعم القرارات السليمة والنمو المستدام.', 'تشمل خبرتي التحليل المالي والمحاسبة والتدقيق الداخلي وإدارة الخزينة والعمليات المصرفية. أمتلك القدرة على قيادة الفرق والعمل تحت الضغط، وأستخدم Microsoft Office وPC Compta وPC Paie وSPSS وحلول Easysoft، إلى جانب مهارات في تطوير الويب والتصميم البصري.'],
    services: ['ما أقدمه', 'المالية', 'تنويع استراتيجي وإدارة استباقية للمخاطر من أجل نمو طويل الأمد.', 'حزمة مايكروسوفت', 'أستخدم حزمة مايكروسوفت لتحسين الكفاءة والإنتاجية في التحليل والتقارير المالية.', 'تصميم الويب', 'تصاميم حديثة وعالية الجودة على مستوى احترافي.', 'تطوير الويب', 'تطوير مواقع عالية الجودة على مستوى احترافي.', 'تطبيقات الهاتف', 'تطوير احترافي لتطبيقات iOS وAndroid.', 'التصوير الفوتوغرافي', 'أنتج صوراً عالية الجودة لمختلف الاحتياجات.', 'الإدارة المالية', 'إدارة استراتيجية ومالية وتشغيلية لدعم نمو مستدام.', 'المحاسبة والتقارير', 'القوائم المالية والتقارير الدورية ومتابعة الخزينة والتسويات البنكية.', 'التدقيق الداخلي', 'مراجعة الامتثال وتحديد المخاطر والتوصيات العملية وحساب التكاليف.', 'البنوك والائتمان', 'تحليل ملفات الائتمان وتقييم الملاءة المالية ودعم العمليات البنكية.', 'تنسيق الفرق', 'الإشراف على الفرق وتخطيط الأنشطة وتنسيق وظائف المؤسسة.', 'الأدوات الرقمية والبصرية', 'برامج مالية وحزمة Microsoft Office وتطوير الويب وأدوات التصميم البصري.'],
    resumeHeadings: ['السيرة الذاتية', 'التعليم', 'الخبرة', 'مهاراتي'],
    educationTitles: ['المدرسة العليا لعلوم التسيير', 'المدرسة العليا للتجارة بالجزائر'],
    educationText: ['برنامج تحضيري للمدارس العليا تم اجتيازه عبر مسابقة الالتحاق الوطنية.', 'ماستر في مالية المؤسسات يوفر معرفة متقدمة في التحليل المالي ومالية المؤسسات والقطاع المصرفي.'],
    experienceTitles: ['مدير · SARL Groupe Abidi', 'مسير محطة خدمة · Groupe Abidi', 'إطار مالي ومحاسبي / مدقق داخلي · Groupe Abidi', 'إطار تجاري · Groupe Abidi', 'متربص نهاية الدراسة · بنك BNA، مصلحة القروض', 'متربص نهاية الدراسة · بنك BADR', 'متربص تطبيقي · بنك BADR', 'متربص استكشافي · بنك AGB'],
    experienceText: ['إدارة أنشطة الشركة وقيادتها الاستراتيجية والمالية والتشغيلية، مع تنسيق الفرق والجهات الأخرى ضمن Groupe Abidi.', 'تسيير العمليات اليومية لمحطة الخدمة ومخزون الوقود والتموينات وجداول الموظفين والصندوق والتقارير.', 'تسيير العمليات المحاسبية والمالية وإعداد القوائم والتقارير ومتابعة الخزينة والتسويات البنكية. إنجاز التدقيق الداخلي وتحليل المخاطر وحساب التكاليف.', 'تطوير ومتابعة محفظة العملاء وإدارة علاقات العملاء ودعم متابعة المبيعات والأهداف التجارية.', 'المساهمة في دراسة ومعالجة طلبات القروض والتحقق من الملفات وتحليل الملاءة وتقييم المخاطر والمتابعة الإدارية.', 'تقييم طلبات القروض وفق السياسات الداخلية وتحليل ملفات العملاء والتعاون في تقييم المخاطر.', 'دعم الاستعلامات عن الحسابات وإصدار الفواتير والكشوفات وإدارة البطاقات ومعالجة ملفات الميراث.', 'تربص قصير للتعرف على العمليات المصرفية اليومية.'],
    skills: ['التحليل المالي والمحاسبة', 'حزمة Microsoft Office', 'برامج مالية ومحاسبية', 'التدقيق الداخلي وإدارة الخزينة', 'تطوير الويب', 'التصميم البصري']
  }
};

Object.assign(translations.fr, {
  sidebar: ['Développeur web', 'Afficher les contacts', 'E-mail', 'Téléphone', 'Date de naissance', 'Localisation'],
  testimonialsHeading: ['Témoignages'],
  testimonialsText: [
    "Excellent travail ! Le site créé pour mon entreprise est élégant et fonctionne parfaitement. Je recommande vivement ses services de développement web.",
    "Travailler avec vous a été très agréable : toujours réactif et capable d'expliquer simplement les sujets techniques. Merci pour cette excellente collaboration !",
    "Je suis très impressionné par le site réalisé. Le design est moderne, les fonctionnalités répondent parfaitement à nos attentes et le travail a été livré avec soin.",
    "Le site e-commerce a considérablement amélioré nos ventes en ligne. Son expérience fluide, rapide et sécurisée est remarquable."
  ],
  clientsHeading: ['Clients'],
  portfolioHeading: ['Portfolio'],
  portfolioFilters: ['Tous', 'Web design', 'Applications', 'Développement web', 'Tous', 'Web design', 'Applications', 'Développement web'],
  portfolioSelect: ['Sélectionner une catégorie'],
  projectCategories: ['Développement web', 'Développement web', 'Web design', 'Applications', 'Web design', 'Web design', 'Développement web', 'Applications', 'Développement web'],
  blogHeading: ['Blog'],
  blogCategories: ['Gestion financière', 'Comptabilité', 'Audit interne', 'Banque et crédit', 'Trésorerie', 'Outils numériques'],
  blogTitles: ['Construire un plan financier concret', 'Lire les états financiers avec confiance', 'Audit interne : transformer les contrôles en valeur', 'Qu’est-ce qui renforce un dossier de crédit ?', 'Pourquoi la visibilité de trésorerie est essentielle', 'Des outils numériques pour une finance plus efficace'],
  blogText: ['Un cadre simple pour fixer des objectifs, suivre les résultats et prendre de meilleures décisions.', 'Les indicateurs clés pour comprendre la situation financière et la performance d’une entreprise.', 'Comment les contrôles de conformité et l’analyse des risques renforcent les opérations quotidiennes.', 'Un aperçu de la solvabilité, des pièces justificatives et de l’évaluation du risque de crédit.', 'Des habitudes simples pour anticiper les besoins de trésorerie et préserver la liquidité.', 'Comment les outils de reporting, comptabilité et analyse améliorent la précision et la productivité.'],
  contact: ['Contact', 'Formulaire de contact', 'Envoyer le message'],
  placeholders: ['Nom complet', 'Adresse e-mail', 'Votre message']
});

Object.assign(translations.ar, {
  sidebar: ['مطور ويب', 'إظهار جهات الاتصال', 'البريد الإلكتروني', 'الهاتف', 'تاريخ الميلاد', 'الموقع'],
  testimonialsHeading: ['التوصيات'],
  testimonialsText: [
    'عمل ممتاز! الموقع الذي تم إنشاؤه لشركتي أنيق ويعمل بشكل مثالي. أوصي بشدة بخدمات تطوير الويب الخاصة به.',
    'كان العمل معك مريحاً جداً: دائماً متجاوب وقادر على شرح المواضيع التقنية ببساطة. شكراً على هذا التعاون المميز!',
    'أنا معجب جداً بالموقع المنجز. التصميم حديث والوظائف تلبي توقعاتنا تماماً، وقد تم العمل بعناية كبيرة.',
    'ساهم موقع التجارة الإلكترونية في تحسين مبيعاتنا عبر الإنترنت بشكل ملحوظ. تجربة سلسة وسريعة وآمنة.'
  ],
  clientsHeading: ['العملاء'],
  portfolioHeading: ['الأعمال'],
  portfolioFilters: ['الكل', 'تصميم الويب', 'التطبيقات', 'تطوير الويب', 'الكل', 'تصميم الويب', 'التطبيقات', 'تطوير الويب'],
  portfolioSelect: ['اختر فئة'],
  projectCategories: ['تطوير الويب', 'تطوير الويب', 'تصميم الويب', 'التطبيقات', 'تصميم الويب', 'تصميم الويب', 'تطوير الويب', 'التطبيقات', 'تطوير الويب'],
  blogHeading: ['المدونة'],
  blogCategories: ['الإدارة المالية', 'المحاسبة', 'التدقيق الداخلي', 'البنوك والائتمان', 'الخزينة', 'الأدوات الرقمية'],
  blogTitles: ['بناء خطة مالية عملية', 'قراءة القوائم المالية بثقة', 'التدقيق الداخلي: تحويل الرقابة إلى قيمة', 'ما الذي يقوي ملف طلب القرض؟', 'لماذا تعد رؤية الخزينة مهمة؟', 'أدوات رقمية لعمل مالي أكثر ذكاءً'],
  blogText: ['إطار واضح لتحديد الأهداف ومتابعة النتائج واتخاذ قرارات أفضل.', 'المؤشرات الأساسية لفهم الوضع المالي وأداء المؤسسة.', 'كيف تعزز مراجعات الامتثال وتحليل المخاطر العمليات اليومية.', 'نظرة موجزة على الملاءة المالية والوثائق الداعمة وتقييم مخاطر الائتمان.', 'عادات بسيطة تساعد المؤسسة على توقع احتياجات السيولة وحمايتها.', 'كيف تحسن أدوات التقارير والمحاسبة والتحليل الدقة والإنتاجية.'],
  contact: ['اتصل بي', 'نموذج الاتصال', 'إرسال الرسالة'],
  placeholders: ['الاسم الكامل', 'البريد الإلكتروني', 'رسالتك']
});

const formFields = document.querySelectorAll('[data-form-input]');
const englishPlaceholders = [...formFields].map((field) => field.placeholder);

function setLanguage(language) {
  const content = language === 'en' ? englishContent : translations[language];
  Object.entries(translationGroups).forEach(([group, elements]) => {
    [...elements].forEach((element, index) => { element.textContent = content[group][index]; });
  });
  [...formFields].forEach((field, index) => {
    field.placeholder = language === 'en' ? englishPlaceholders[index] : content.placeholders[index];
  });
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  activeLanguage = language;
  languageButtons.forEach((button) => button.classList.toggle('active', button.dataset.languageButton === language));
  localStorage.setItem('portfolio-language', language);
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.languageButton)));
setLanguage(localStorage.getItem('portfolio-language') || 'en');



// Portfolio and blog cards open accessible detail panels instead of dead links.
const contentModal = document.querySelector('[data-content-modal]');
const contentModalTitle = document.querySelector('[data-content-modal-title]');
const contentModalCategory = document.querySelector('[data-content-modal-category]');
const contentModalText = document.querySelector('[data-content-modal-text]');
const contentModalAction = document.querySelector('[data-content-modal-action]');
const contentModalCloseButtons = document.querySelectorAll('[data-content-modal-close]');

const modalCopy = {
  en: {
    project: 'This portfolio item highlights a digital project and the creative process behind it. Contact me to discuss the project, its scope or a similar collaboration.',
    article: 'This article shares ideas, references and practical inspiration for digital work and design.',
    action: 'Get in touch',
    source: 'Official resource',
    articles: [
      'For Algerian businesses, a financial plan should connect sales forecasts, operating costs, investment needs and expected cash movements. The Algerian Financial Accounting System (SCF), established by Law 07-11, provides the framework for recording and presenting financial information. A useful plan is reviewed regularly against actual results—not only at year-end.',
      'Financial statements are most useful when read together: the balance sheet shows the financial position, the income statement explains performance, and cash information helps assess liquidity. Under Algeria’s SCF framework, consistency and reliable supporting documents are essential for useful reporting.',
      'Internal audit is not limited to finding errors. In banking, the Banque d’Algérie’s regulatory framework covers areas such as internal control, prudential standards and anti-money-laundering controls. For any organisation, an effective audit approach maps risks, tests key controls and follows up on recommendations.',
      'A strong credit application needs complete and consistent information: legal documents, financial statements, cash-flow evidence and a clear purpose for the financing. Algeria’s banking framework includes risk-centralisation and prudential rules, so the quality and traceability of the file matter throughout the review process.',
      'Treasury visibility means knowing what cash is available, what payments are due and when customer receipts are expected. A rolling cash forecast helps businesses plan purchases, negotiate payment terms and avoid avoidable pressure on liquidity. It should be refreshed whenever significant payments or collections change.',
      'Digital finance tools can improve reporting speed and traceability, but they need clear access rights, backups and review controls. Algeria’s banking framework also addresses payment systems, reporting and the conditions for payment-service providers. The right tool should support reliable data before it supports automation.'
    ],
    sources: [
      'https://www.mf.gov.dz/pdf/Le_Systeme_comptable_Financier.pdf',
      'https://www.mf.gov.dz/pdf/Le_Systeme_comptable_Financier.pdf',
      'https://www.bank-of-algeria.dz/cadre-legislatif-et-reglementaire/',
      'https://www.bank-of-algeria.dz/cadre-legislatif-et-reglementaire/',
      'https://www.bank-of-algeria.dz/cadre-reglementaire-2/',
      'https://www.bank-of-algeria.dz/notes-2026/'
    ]
  },
  fr: {
    project: 'Ce projet présente une réalisation numérique et la démarche créative qui la soutient. Contactez-moi pour en discuter ou envisager une collaboration similaire.',
    article: 'Cet article partage des idées, des références et des sources d’inspiration concrètes autour du numérique et du design.',
    action: 'Me contacter',
    source: 'Ressource officielle',
    articles: [
      'Pour une entreprise algérienne, un plan financier doit relier les prévisions de ventes, les charges, les investissements et les mouvements de trésorerie attendus. Le Système Comptable Financier (SCF), institué par la loi 07-11, donne le cadre d’enregistrement et de présentation de l’information financière. Le plan doit être comparé régulièrement aux résultats réels, et pas seulement en fin d’exercice.',
      'Les états financiers se lisent ensemble : le bilan présente la situation financière, le compte de résultat explique la performance et les informations de trésorerie éclairent la liquidité. Dans le cadre du SCF algérien, la cohérence et la fiabilité des pièces justificatives sont essentielles à un reporting utile.',
      'L’audit interne ne consiste pas seulement à détecter des erreurs. Pour le secteur bancaire, le cadre de la Banque d’Algérie couvre notamment le contrôle interne, les normes prudentielles et la lutte contre le blanchiment. Dans toute organisation, une démarche efficace cartographie les risques, teste les contrôles clés et assure le suivi des recommandations.',
      'Un dossier de crédit solide repose sur des informations complètes et cohérentes : documents juridiques, états financiers, éléments de trésorerie et objet clair du financement. Le cadre bancaire algérien comprend des règles relatives à la centralisation des risques et aux normes prudentielles : la qualité et la traçabilité du dossier sont donc déterminantes.',
      'La visibilité de trésorerie consiste à connaître les disponibilités, les paiements à venir et les encaissements attendus. Une prévision glissante aide à planifier les achats, négocier les délais de paiement et réduire les tensions évitables sur la liquidité. Elle doit être actualisée dès qu’un encaissement ou un décaissement important évolue.',
      'Les outils numériques peuvent accélérer le reporting et améliorer la traçabilité, à condition de définir les droits d’accès, les sauvegardes et les contrôles de revue. Le cadre bancaire algérien traite aussi des systèmes de paiement, du reporting et des prestataires de services de paiement. Le bon outil renforce d’abord la fiabilité des données avant d’automatiser les processus.'
    ],
    sources: [
      'https://www.mf.gov.dz/pdf/Le_Systeme_comptable_Financier.pdf',
      'https://www.mf.gov.dz/pdf/Le_Systeme_comptable_Financier.pdf',
      'https://www.bank-of-algeria.dz/cadre-legislatif-et-reglementaire/',
      'https://www.bank-of-algeria.dz/cadre-legislatif-et-reglementaire/',
      'https://www.bank-of-algeria.dz/cadre-reglementaire-2/',
      'https://www.bank-of-algeria.dz/notes-2026/'
    ]
  },
  ar: {
    project: 'يعرض هذا المشروع عملاً رقمياً والمنهج الإبداعي الذي يدعمه. تواصل معي لمناقشة المشروع أو تعاون مماثل.',
    article: 'يشارك هذا المقال أفكاراً ومراجع وإلهاماً عملياً حول العمل الرقمي والتصميم.',
    action: 'تواصل معي',
    source: 'مصدر رسمي',
    articles: [
      'بالنسبة للمؤسسة الجزائرية، يجب أن تربط الخطة المالية بين توقعات المبيعات والتكاليف والاستثمارات وحركة الخزينة المتوقعة. يوفّر النظام المحاسبي المالي الجزائري SCF، الذي أُنشئ بالقانون 07-11، إطار تسجيل وعرض المعلومات المالية. ومن الأفضل مقارنة الخطة بالنتائج الفعلية بانتظام وليس فقط في نهاية السنة.',
      'تُقرأ القوائم المالية معاً: فالميزانية تُظهر الوضع المالي، وحساب النتائج يشرح الأداء، ومعلومات الخزينة تساعد على تقييم السيولة. وفي إطار SCF الجزائري، تعدّ اتساق البيانات وموثوقية الوثائق الداعمة أساسيين لإعداد تقارير مفيدة.',
      'لا يقتصر التدقيق الداخلي على اكتشاف الأخطاء. يشمل الإطار التنظيمي لبنك الجزائر في القطاع المصرفي مجالات مثل الرقابة الداخلية والمعايير الاحترازية ومكافحة تبييض الأموال. وفي أي مؤسسة، تبدأ المراجعة الفعالة برسم المخاطر واختبار الضوابط ومتابعة التوصيات.',
      'يتطلب ملف القرض القوي معلومات كاملة ومتسقة: وثائق قانونية وقوائم مالية وأدلة على التدفقات النقدية وهدف واضح للتمويل. يتضمن الإطار المصرفي الجزائري قواعد تتعلق بمركزية المخاطر والمعايير الاحترازية، ولذلك تبقى جودة الملف وإمكانية تتبعه مهمتين طوال المراجعة.',
      'تعني رؤية الخزينة معرفة السيولة المتاحة والمدفوعات القادمة والتحصيلات المنتظرة. تساعد التوقعات المتجددة للتدفقات النقدية على تخطيط المشتريات والتفاوض حول آجال الدفع وتجنب الضغط غير الضروري على السيولة. ويجب تحديثها عند تغير تحصيل أو دفع مهم.',
      'يمكن للأدوات الرقمية تسريع إعداد التقارير وتحسين قابلية التتبع، بشرط تحديد صلاحيات الوصول والنسخ الاحتياطي وضوابط المراجعة. كما يتناول الإطار المصرفي الجزائري أنظمة الدفع والتقارير ومقدمي خدمات الدفع. والأداة الجيدة تدعم موثوقية البيانات قبل أتمتة العمليات.'
    ],
    sources: [
      'https://www.mf.gov.dz/pdf/Le_Systeme_comptable_Financier.pdf',
      'https://www.mf.gov.dz/pdf/Le_Systeme_comptable_Financier.pdf',
      'https://www.bank-of-algeria.dz/ar/%D8%A7%D9%84%D8%A5%D8%B7%D8%A7%D8%B1-%D8%A7%D9%84%D8%AA%D8%B4%D8%B1%D9%8A%D8%B9%D9%8A-%D9%88-%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85%D9%8A/',
      'https://www.bank-of-algeria.dz/ar/%D8%A7%D9%84%D8%A5%D8%B7%D8%A7%D8%B1-%D8%A7%D9%84%D8%AA%D8%B4%D8%B1%D9%8A%D8%B9%D9%8A-%D9%88-%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85%D9%8A/',
      'https://www.bank-of-algeria.dz/cadre-reglementaire-2/',
      'https://www.bank-of-algeria.dz/notes-2026/'
    ]
  }
};

function openContentModal(card, type) {
  const copy = modalCopy[activeLanguage];
  const articleIndex = [...document.querySelectorAll('.blog-post-item > a')].indexOf(card);
  const title = card.querySelector(type === 'project' ? '.project-title' : '.blog-item-title').textContent.trim();
  const category = card.querySelector(type === 'project' ? '.project-category' : '.blog-category').textContent.trim();

  contentModalTitle.textContent = title;
  contentModalCategory.textContent = category;
  contentModalText.textContent = type === 'article' ? copy.articles[articleIndex] : copy.project;
  contentModalAction.textContent = type === 'article' ? copy.source : copy.action;
  contentModalAction.href = type === 'article' ? copy.sources[articleIndex] : 'mailto:mekhalfayassine@gmail.com';
  contentModalAction.target = type === 'article' ? '_blank' : '';
  contentModalAction.rel = type === 'article' ? 'noopener noreferrer' : '';
  contentModal.classList.add('active');
  contentModal.setAttribute('aria-hidden', 'false');
}

function closeContentModal() {
  contentModal.classList.remove('active');
  contentModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-item > a').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openContentModal(card, 'project');
  });
});

document.querySelectorAll('.blog-post-item > a').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openContentModal(card, 'article');
  });
});

contentModalCloseButtons.forEach((button) => button.addEventListener('click', closeContentModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contentModal.classList.contains('active')) closeContentModal();
});
