/* ==========================================================================
   SOFIA QUISPE SALAS — Portfolio Script
   ========================================================================== */

document.getElementById('year').textContent = new Date().getFullYear();

let currentLang = localStorage.getItem('sqs-lang') || 'es';

/* =========================================================
   0. PRELOADER (tech boot sequence)
   ========================================================= */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  preloader.classList.add('done');
  document.body.style.overflow = '';
  setTimeout(() => preloader.remove(), 700);
}
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(hidePreloader, 1700);
});
/* fallback in case 'load' fires very late (slow assets) */
setTimeout(() => {
  if (document.getElementById('preloader')) hidePreloader();
}, 4500);

/* =========================================================
   1. HERO PHOTO FALLBACK
   ========================================================= */
(function heroPhoto() {
  const frame = document.getElementById('photo-frame');
  const img = document.getElementById('hero-photo');
  if (!frame || !img) return;
  img.addEventListener('error', () => frame.classList.add('no-photo'));
})();

/* =========================================================
   1b. HERO VIDEO BACKGROUND (muted, falls back gracefully)
   ========================================================= */
(function heroVideo() {
  const wrap = document.getElementById('hero-video-bg');
  const video = document.getElementById('hero-video');
  if (!wrap || !video) return;

  video.muted = true;
  video.addEventListener('error', () => wrap.classList.add('no-video'));
  video.querySelectorAll('source').forEach(src => {
    src.addEventListener('error', () => wrap.classList.add('no-video'));
  });

  video.play().catch(() => { /* autoplay blocked, video stays paused silently */ });
})();

/* =========================================================
   1c. TECH BACKGROUND (subtle animated dots + lines, all sections)
   ========================================================= */
(function bgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let w, h, dots;

  const COLORS = ['#22d3ee', '#f472b6', '#34d399'];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(80, Math.floor((w * h) / 19000));
    dots = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function tick() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;

      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = (1 - dist / 150) * 0.16;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = a.color;
      ctx.globalAlpha = 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* =========================================================
   2. ROLE TYPEWRITER (rotating short phrases, restartable per language)
   ========================================================= */
const ROLES = {
  es: ['RPA Engineer', 'Data Analyst', 'Software Developer', 'Ingeniera de Sistemas'],
  en: ['RPA Engineer', 'Data Analyst', 'Software Developer', 'Systems Engineer']
};
let typewriterTimer = null;

function startRoleTypewriter(lang) {
  const target = document.getElementById('role-typed');
  if (!target) return;

  clearTimeout(typewriterTimer);
  const roles = ROLES[lang] || ROLES.es;
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        typewriterTimer = setTimeout(tick, 1600);
        return;
      }
      typewriterTimer = setTimeout(tick, 65);
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typewriterTimer = setTimeout(tick, 300);
        return;
      }
      typewriterTimer = setTimeout(tick, 35);
    }
  }
  tick();
}

/* =========================================================
   2b. EXPERIENCE MINI-CONSOLE (decorative log typewriter)
   ========================================================= */
const CONSOLE_LINES = {
  es: [
    '> ejecutando ETL...',
    '> conectando a SQL Server',
    '> procesando datos con Python',
    '> generando dashboard en Power BI',
    '> automatización RPA: OK'
  ],
  en: [
    '> running ETL...',
    '> connecting to SQL Server',
    '> processing data with Python',
    '> building Power BI dashboard',
    '> RPA automation: OK'
  ]
};
let consoleTimer = null;

function startConsoleTyper(lang) {
  const target = document.getElementById('exp-console-line');
  if (!target) return;

  clearTimeout(consoleTimer);
  const lines = CONSOLE_LINES[lang] || CONSOLE_LINES.es;
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        consoleTimer = setTimeout(tick, 1800);
        return;
      }
      consoleTimer = setTimeout(tick, 45);
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        consoleTimer = setTimeout(tick, 250);
        return;
      }
      consoleTimer = setTimeout(tick, 25);
    }
  }
  tick();
}

/* =========================================================
   3. THEME TOGGLE (dark <-> light)
   ========================================================= */
(function themeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  const saved = localStorage.getItem('sqs-theme');
  if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
    icon.textContent = '◑';
  }

  btn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      icon.textContent = '◐';
      localStorage.setItem('sqs-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      icon.textContent = '◑';
      localStorage.setItem('sqs-theme', 'light');
    }
  });
})();

/* =========================================================
   4. MOBILE NAV TOGGLE
   ========================================================= */
(function navToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* =========================================================
   5. REVEAL-ON-SCROLL (defined before project rendering,
   since renderProjects() calls initRevealObserver() right away)
   ========================================================= */
let revealObserverInstance = null;
function initRevealObserver() {
  if (!revealObserverInstance) {
    revealObserverInstance = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserverInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }
  document.querySelectorAll('.reveal:not(.in-view)').forEach(el => {
    revealObserverInstance.observe(el);
  });
}
initRevealObserver();

/* =========================================================
   6. I18N DICTIONARY + LANGUAGE SWITCHING (ES / EN)
   ========================================================= */
const I18N = {
  'preloader.line1': { es: '&gt; iniciando sistema', en: '&gt; booting system' },
  'preloader.line2': { es: '&gt; cargando módulos: ui.js, i18n.js, style.css', en: '&gt; loading modules: ui.js, i18n.js, style.css' },
  'preloader.line3': { es: '&gt; conectando con <span class="accent-cyan">sofia974</span>', en: '&gt; connecting to <span class="accent-cyan">sofia974</span>' },
  'preloader.line4': { es: '&gt; acceso concedido <span class="accent-green">[OK]</span>', en: '&gt; access granted <span class="accent-green">[OK]</span>' },

  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.about': { es: 'Sobre mí', en: 'About' },
  'nav.experience': { es: 'Experiencia', en: 'Experience' },
  'nav.projects': { es: 'Proyectos', en: 'Projects' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'nav.cta': { es: 'Hablemos', en: "Let's talk" },

  'hero.eyebrow': { es: '// Especialista TI', en: '// IT Specialist' },
  'hero.greeting': { es: 'Hola, soy', en: "Hi, I'm" },
  'hero.desc': {
    es: 'Bachiller en Ingeniería de Sistemas e Informática, egresada en el Décimo Superior de la Universidad. Combino análisis de datos, automatización de procesos (RPA) e inteligencia artificial para construir soluciones que resuelven problemas reales en minería y tecnología.',
    en: 'Systems Engineering graduate, ranked in the top 10 of her class at Universidad Nacional de Moquegua. I combine data analysis, process automation (RPA) and artificial intelligence to build solutions that solve real problems in mining and technology.'
  },
  'hero.ctaProjects': { es: 'Ver proyectos', en: 'View projects' },
  'hero.ctaContact': { es: 'Contáctame', en: 'Contact me' },
  'hero.badge': { es: 'Disponible para nuevas oportunidades', en: 'Available for new opportunities' },

  'about.tag': { es: 'Sobre mí', en: 'About me' },
  'about.title': { es: 'Quién soy y qué hago', en: 'Who I am & what I do' },
  'about.p1': {
    es: 'Soy <strong>Sofia Yamilet Quispe Salas</strong>, Bachiller en Ingeniería de Sistemas e Informática por la Universidad Nacional de Moquegua, con formación complementaria en ciencia de datos (Diplomado UCSP), inteligencia artificial y business intelligence (Diplomado UNI).',
    en: "I'm <strong>Sofia Yamilet Quispe Salas</strong>, a Systems Engineering graduate from Universidad Nacional de Moquegua, with additional training in data science (UCSP Diploma), artificial intelligence and business intelligence (UNI Diploma)."
  },
  'about.p2': {
    es: 'Tengo experiencia en análisis de datos, automatización de procesos (RPA) y desarrollo de software aplicado a los sectores minero y tecnológico. Me especializo en resolver problemas mediante soluciones innovadoras basadas en datos, con un enfoque <span class="accent-pink">investigador, analítico y orientado a resultados</span>.',
    en: 'I have experience in data analysis, process automation (RPA) and software development applied to the mining and technology sectors. I specialize in solving problems through innovative, data-driven solutions, with a <span class="accent-pink">research-driven, analytical and results-oriented</span> approach.'
  },
  'about.p3': {
    es: 'Trabajo cómodamente con herramientas de IA generativa como <strong>Claude Code</strong>, <strong>ChatGPT</strong> y <strong>Gemini</strong>, integrándolas en mi flujo de desarrollo para acelerar la resolución de problemas y construir soluciones más inteligentes.',
    en: 'I work comfortably with generative AI tools like <strong>Claude Code</strong>, <strong>ChatGPT</strong> and <strong>Gemini</strong>, integrating them into my development workflow to speed up problem-solving and build smarter solutions.'
  },
  'about.skillsTitle': { es: 'Nivel de dominio', en: 'Proficiency level' },
  'about.langNote': { es: 'Inglés — Nivel intermedio', en: 'English — Intermediate level' },

  'level.advanced': { es: 'Avanzado', en: 'Advanced' },
  'level.intermediate': { es: 'Intermedio', en: 'Intermediate' },

  'stats.projects': { es: 'proyectos y roles', en: 'projects & roles' },
  'stats.tech': { es: 'tecnologías dominadas', en: 'technologies mastered' },
  'stats.years': { es: 'años de experiencia', en: 'years of experience' },
  'stats.diplomas': { es: 'diplomados y certificaciones', en: 'diplomas & certifications' },

  'exp.tag': { es: 'Trayectoria', en: 'Track record' },
  'exp.title': { es: 'Experiencia profesional', en: 'Professional experience' },
  'exp.subtitle': {
    es: 'Un resumen de mis roles más recientes en minería, tecnología y ciberseguridad',
    en: 'A summary of my most recent roles in mining, technology and cybersecurity'
  },

  'exp1.company': { es: 'Software Enterprise Services · Cliente Costa Rica', en: 'Software Enterprise Services · Costa Rica Client' },
  'exp1.desc': {
    es: 'Bot de automatización documental con Document Automation, flujo ETL a SQL Server, dashboard en Power BI y scripts en Python integrados con la API de Gemini.',
    en: 'Documentary automation bot built with Document Automation, an ETL pipeline into SQL Server, a Power BI dashboard, and Python scripts integrated with the Gemini API.'
  },
  'exp2.desc': {
    es: 'Análisis de datos geológicos, script en Python para importación automática a DATAMINE y RPA para organización de carpetas y envío de correos.',
    en: 'Geological data analysis, a Python script for automatic import into DATAMINE, and an RPA bot for folder organization and automated email sending.'
  },
  'exp3.desc': {
    es: 'Análisis de riesgos de ciberseguridad y gestión de vulnerabilidades en Rapid7, bajo marcos ISO 27001 y NIST.',
    en: 'Cybersecurity risk analysis and vulnerability management in Rapid7, under the ISO 27001 and NIST frameworks.'
  },
  'exp4.company': { es: 'Mora Technology · Cliente México', en: 'Mora Technology · Mexico Client' },
  'exp4.desc': {
    es: 'Web scraping en Python, automatización de ingreso de datos con Power Automate y generación de reportes con Pandas.',
    en: 'Python web scraping, data-entry automation with Power Automate, and report generation with Pandas.'
  },
  'exp5.desc': {
    es: 'Modelos predictivos para flota de camiones mineros en Python y backend de plataforma web con Django y PostgreSQL.',
    en: 'Predictive models for a mining truck fleet built in Python, plus a web platform backend using Django and PostgreSQL.'
  },
  'exp6.role': { es: 'Practicante de Administración de Base de Datos', en: 'Database Administration Intern' },
  'exp6.desc': {
    es: 'Gestión de SQL Server, automatización con Power Automate y SharePoint, y dashboards en Power BI para la Gerencia de Geología.',
    en: 'SQL Server management, automation with Power Automate and SharePoint, and Power BI dashboards for the Geology Management team.'
  },
  'exp7.role': { es: 'Practicante de Aplicaciones Empresariales', en: 'Enterprise Applications Intern' },
  'exp7.desc': {
    es: 'Acompañamiento en gestión de proyectos tecnológicos y automatización de procesos con Power Automate.',
    en: 'Support for technology project management and process automation with Power Automate.'
  },

  'proj.tag': { es: 'Portafolio', en: 'Portfolio' },
  'proj.title': { es: 'Proyectos y logros', en: 'Projects & achievements' },
  'proj.subtitle': { es: 'Click en una tarjeta para ver más detalles', en: 'Click a card to see more details' },

  'modal.company': { es: 'Empresa:', en: 'Company:' },
  'modal.period': { es: 'Periodo:', en: 'Period:' },
  'modal.achievement': { es: 'Logro:', en: 'Achievement:' },

  'contact.tag': { es: 'Contacto', en: 'Contact' },
  'contact.title': { es: 'Hablemos de tu proyecto', en: "Let's talk about your project" },
  'contact.name': { es: 'Nombre', en: 'Name' },
  'contact.namePh': { es: 'Tu nombre', en: 'Your name' },
  'contact.message': { es: 'Mensaje', en: 'Message' },
  'contact.messagePh': { es: 'Escribe tu mensaje aquí...', en: 'Write your message here...' },
  'contact.submit': { es: 'Enviar mensaje', en: 'Send message' },
  'contact.errorFields': { es: 'Completa todos los campos.', en: 'Please fill in all fields.' },
  'contact.sending': { es: 'Enviando...', en: 'Sending...' },
  'contact.successPrefix': { es: '✓ ¡Gracias', en: '✓ Thanks,' },
  'contact.successSuffix': {
    es: '! Tu mensaje quedó registrado (conecta este formulario a un backend o servicio como Formspree para enviarlo de verdad).',
    en: '! Your message has been recorded (connect this form to a backend or a service like Formspree to actually send it).'
  },
  'contact.statusNote': {
    es: 'Abierta a colaboraciones, freelance y nuevas oportunidades.',
    en: 'Open to collaborations, freelance work and new opportunities.'
  },

  'footer.text': {
    es: 'construido con <span class="accent-green">&lt;/&gt;</span> y café',
    en: 'built with <span class="accent-green">&lt;/&gt;</span> and coffee'
  }
};

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sqs-lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[key]) el.innerHTML = I18N[key][lang];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[key]) el.placeholder = I18N[key][lang];
  });

  startRoleTypewriter(lang);
  startConsoleTyper(lang);
  renderProjects(lang);
}

(function langToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
  });
})();

/* =========================================================
   7. PROJECTS DATA + CARDS + MODAL
   ========================================================= */
const projectsData = [
  {
    tag: { es: 'RPA + IA', en: 'RPA + AI' },
    company: { es: 'Software Enterprise Services · Cliente Costa Rica', en: 'Software Enterprise Services · Costa Rica Client' },
    period: '01/2026 – 06/2026',
    title: { es: 'Bot de Extracción Documental con IA', en: 'AI Document Extraction Bot' },
    summary: {
      es: 'Automatización documental con Document Automation, ETL a SQL Server y dashboard en Power BI.',
      en: 'Document automation with Document Automation, an ETL pipeline into SQL Server, and a Power BI dashboard.'
    },
    description: {
      es: 'Desarrollo de un bot de automatización documental utilizando Document Automation para extracción de datos, diseño del flujo ETL para almacenar la información en SQL Server, dashboard en Power BI conectado a la base de datos, y scripts en Python integrados con la API de Gemini para extraer información de imágenes.',
      en: 'Built a documentary automation bot using Document Automation for data extraction, designed an ETL pipeline to store the information in SQL Server, a Power BI dashboard connected to the database, and Python scripts integrated with the Gemini API to extract information from images.'
    },
    achievement: {
      es: 'Automatización del proceso de extracción y consolidación de datos con IA, reduciendo tareas manuales.',
      en: 'Automated the data extraction and consolidation process with AI, reducing manual tasks.'
    },
    stack: ['Automation Anywhere', 'Python', 'SQL Server', 'Power BI']
  },
  {
    tag: { es: 'Data & Geología', en: 'Data & Geology' },
    company: { es: 'Minera Titan del Perú · MC Consultoría', en: 'Minera Titan del Perú · MC Consultoría' },
    period: '02/2025 – 05/2025 y 02/2026 – 05/2026',
    title: { es: 'Automatización Geológica en DATAMINE', en: 'Geological Automation in DATAMINE' },
    summary: {
      es: 'Script avanzado en Python para importar datos automáticamente al software de modelado DATAMINE.',
      en: 'Advanced Python script to automatically import data into the DATAMINE modeling software.'
    },
    description: {
      es: 'Análisis y limpieza de datos de pseudosondajes, corrección de direcciones basadas en mina y veta, creación de una interfaz de ingreso de datos en DATAMINE y desarrollo de un proyecto RPA para organizar carpetas y subcarpetas y enviar correos automáticamente.',
      en: 'Analyzed and cleaned pseudo-drillhole data, corrected directions based on mine and vein, built a data-entry interface in DATAMINE, and developed an RPA project to organize folders and subfolders and send emails automatically.'
    },
    achievement: {
      es: 'Automatización de la importación de datos al software de modelado geológico DATAMINE.',
      en: 'Automated data import into the DATAMINE geological modeling software.'
    },
    stack: ['Python', 'JavaScript', 'DataMine', 'SQL Server']
  },
  {
    tag: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    company: { es: 'Minera Las Bambas', en: 'Minera Las Bambas' },
    period: '05/2025 – 04/2026',
    title: { es: 'Gestión de Vulnerabilidades y Riesgos', en: 'Vulnerability & Risk Management' },
    summary: {
      es: 'Análisis de datos de ciberseguridad y gestión de riesgos con Rapid7 bajo marcos ISO 27001 y NIST.',
      en: 'Cybersecurity data analysis and risk management with Rapid7 under the ISO 27001 and NIST frameworks.'
    },
    description: {
      es: 'Análisis de datos e información de ciberseguridad en Rapid7, gestión y análisis de riesgos, gestión de indicadores operativos de hacking ético y desarrollo de procesos ETL para consolidar información de riesgos de infraestructura.',
      en: 'Analyzed cybersecurity data and information in Rapid7, managed and analyzed risks, tracked ethical-hacking operational indicators, and developed ETL processes to consolidate infrastructure risk information.'
    },
    achievement: {
      es: 'Análisis de la información de gestión de vulnerabilidades en Rapid7.',
      en: 'Analyzed vulnerability management information in Rapid7.'
    },
    stack: ['ISO 27001', 'NIST', 'Rapid7']
  },
  {
    tag: { es: 'Web Scraping', en: 'Web Scraping' },
    company: { es: 'Mora Technology · Cliente México', en: 'Mora Technology · Mexico Client' },
    period: '10/2025 – 12/2025',
    title: { es: 'Automatización de Extracción de Datos', en: 'Data Extraction Automation' },
    summary: {
      es: 'Scripts de web scraping en Python y flujos de Power Automate para estructurar información.',
      en: 'Python web-scraping scripts and Power Automate flows to structure information.'
    },
    description: {
      es: 'Desarrollo de scripts de web scraping en Python para la extracción automatizada de información, automatización del ingreso de datos con Power Automate, almacenamiento en CSV/Excel/JSON, y soluciones con Automation Anywhere y Pandas para procesar datos y generar reportes en Excel.',
      en: 'Built Python web-scraping scripts for automated information extraction, automated data entry with Power Automate, stored data in CSV/Excel/JSON, and built solutions with Automation Anywhere and Pandas to process data and generate Excel reports.'
    },
    achievement: {
      es: 'Ejecución de diversos scripts en Python para la automatización de procesos.',
      en: 'Ran multiple Python scripts for process automation.'
    },
    stack: ['Python', 'Automation Anywhere', 'SQL Server', 'Power Automate']
  },
  {
    tag: { es: 'Data Science', en: 'Data Science' },
    company: { es: 'CODEa UNI', en: 'CODEa UNI' },
    period: '01/2025 – 05/2025',
    title: { es: 'Modelos Predictivos — Flota Minera', en: 'Predictive Models — Mining Fleet' },
    summary: {
      es: 'Modelos predictivos en Python para una flota de camiones mineros, con backend en Django.',
      en: 'Predictive models in Python for a mining truck fleet, with a Django backend.'
    },
    description: {
      es: 'Desarrollo de modelos predictivos y análisis de datos sobre flota de camiones mineros en Python, manejo de base de datos con SQL Server (scripts, procedimientos, jobs) y desarrollo backend de plataforma web y API REST con Django y PostgreSQL.',
      en: 'Built predictive models and analyzed data on a mining truck fleet in Python, managed a SQL Server database (scripts, stored procedures, jobs), and developed a web platform backend and REST API with Django and PostgreSQL.'
    },
    achievement: {
      es: 'Desarrollo de modelos predictivos aplicados a flota de camiones.',
      en: 'Developed predictive models applied to a truck fleet.'
    },
    stack: ['Python', 'Django', 'PostgreSQL', 'SQL Server']
  },
  {
    tag: { es: 'BI & Automatización', en: 'BI & Automation' },
    company: { es: 'Compañía Minera Antamina', en: 'Compañía Minera Antamina' },
    period: '02/2024 – 02/2025',
    title: { es: 'Automatización de Laboratorio (AcQuire)', en: 'Laboratory Automation (AcQuire)' },
    summary: {
      es: 'Automatización de importación de muestras de laboratorio a SQL Server y dashboards en Power BI.',
      en: 'Automated laboratory sample import into SQL Server and Power BI dashboards.'
    },
    description: {
      es: 'Gestión de base de datos SQL Server y desarrollo de queries, análisis de tendencias con Python, automatización de procesos de la Gerencia de Geología con Power Platform, automatización de control de acceso en SharePoint con Power Automate y desarrollo de dashboards en Power BI.',
      en: 'Managed the SQL Server database and wrote queries, analyzed trends with Python, automated Geology Management processes with Power Platform, automated SharePoint access control with Power Automate, and built Power BI dashboards.'
    },
    achievement: {
      es: 'Automatización de la importación de muestras de laboratorio a SQL Server (AcQuire).',
      en: 'Automated laboratory sample import into SQL Server (AcQuire).'
    },
    stack: ['Python', 'SQL Server', 'Power BI', 'Power Automate']
  },
  {
    tag: { es: 'Legal + Voz IA', en: 'Legal + Voice AI' },
    company: { es: 'Cliente confidencial · Sector Legal (EE. UU.)', en: 'Confidential Client · US Legal Sector' },
    period: '06/2025 – 08/2025',
    title: { es: 'Extracción de Datos de Llamadas Legales con IA', en: 'AI-Powered Legal Call Data Extraction' },
    summary: {
      es: 'Sistema que transcribe y analiza llamadas del sector legal en EE. UU. para extraer automáticamente los datos clave del caso y del case manager asignado.',
      en: "System that transcribes and analyzes calls from the US legal sector to automatically extract key case data and the assigned case manager's information."
    },
    description: {
      es: 'Desarrollo de un pipeline que transcribe llamadas telefónicas mediante speech-to-text y utiliza un modelo de lenguaje (LLM) para extraer automáticamente los datos más relevantes de cada llamada: información del cliente, detalles del caso y datos del case manager asignado. La información extraída se estructura y almacena para su consulta y seguimiento.',
      en: "Built a pipeline that transcribes phone calls using speech-to-text and uses an LLM to automatically extract the most relevant data from each call: client information, case details, and the assigned case manager's data. The extracted information is structured and stored for tracking and follow-up."
    },
    achievement: {
      es: 'Automatización de la extracción de información clave de llamadas legales, reduciendo el tiempo de registro manual del case manager.',
      en: "Automated extraction of key information from legal calls, reducing the case manager's manual logging time."
    },
    stack: ['Python', 'Speech-to-Text', 'LLM (OpenAI/Gemini)', 'SQL Server']
  },
  {
    tag: { es: 'Shopify + RPA', en: 'Shopify + RPA' },
    company: { es: 'Cliente confidencial · E-commerce (Shopify)', en: 'Confidential Client · Shopify E-commerce' },
    period: '03/2025 – 05/2025',
    title: { es: 'Automatización de Procesos Batch en Shopify', en: 'Batch Process Automation for Shopify' },
    summary: {
      es: 'Automatización de tareas batch en una tienda Shopify combinando Python, Playwright y Selenium con la API de Shopify para acelerar procesos repetitivos a gran escala.',
      en: 'Automated batch tasks on a Shopify store combining Python, Playwright and Selenium with the Shopify API to speed up large-scale repetitive processes.'
    },
    description: {
      es: 'Diseño y desarrollo de scripts de automatización en Python integrados con la API de Shopify, Playwright y Selenium para ejecutar procesos batch: carga masiva de productos, actualización de precios e inventario, sincronización de catálogo y validación de datos. La solución ejecuta tareas programadas de forma desatendida, con manejo de errores y reportes automáticos de resultados.',
      en: 'Designed and developed Python automation scripts integrated with the Shopify, Playwright and Selenium to run batch processes: bulk product uploads, price and inventory updates, catalog synchronization, and data validation. The solution runs scheduled tasks unattended, with error handling and automatic result reporting.'
    },
    achievement: {
      es: 'Reducción significativa del tiempo dedicado a procesos batch manuales en Shopify mediante automatización con Python, Playwright y Selenium.',
      en: 'Significantly reduced time spent on manual Shopify batch processes through automation with Python, Playwright and Selenium.'
    },
    stack: ['Python', 'Shopify API', 'Playwright', 'Selenium', 'Pandas']
  }
];

function renderProjects(lang) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projectsData.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${idx * 0.06}s`;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${lang === 'en' ? 'View details for' : 'Ver detalles de'} ${proj.title[lang]}`);
    card.innerHTML = `
      <span class="project-card-tag">${proj.tag[lang]}</span>
      <h3>${proj.title[lang]}</h3>
      <p>${proj.summary[lang]}</p>
      <div class="project-card-footer">
        <div class="project-stack">
          ${proj.stack.map(s => `<span>${s}</span>`).join('')}
        </div>
        <span class="card-arrow">➜</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(idx));
    card.addEventListener('keypress', e => { if (e.key === 'Enter') openModal(idx); });
    grid.appendChild(card);
  });

  initRevealObserver();
}

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

function openModal(idx) {
  const proj = projectsData[idx];
  const lang = currentLang;
  modalContent.innerHTML = `
    <span class="modal-tag">${proj.tag[lang]}</span>
    <h3>${proj.title[lang]}</h3>
    <div class="modal-meta">
      <span><strong>${I18N['modal.company'][lang]}</strong> ${proj.company[lang]}</span>
      <span><strong>${I18N['modal.period'][lang]}</strong> ${proj.period}</span>
    </div>
    <p class="modal-desc">${proj.description[lang]}</p>
    <div class="modal-highlight"><strong>${I18N['modal.achievement'][lang]}</strong> ${proj.achievement[lang]}</div>
    <div class="project-stack">
      ${proj.stack.map(s => `<span>${s}</span>`).join('')}
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* =========================================================
   8. CONTACT FORM (client-side only, no backend)
   ========================================================= */
(function contactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const lang = currentLang;

    if (!name || !email || !message) {
      status.textContent = I18N['contact.errorFields'][lang];
      status.classList.add('error');
      return;
    }

    status.classList.remove('error');
    status.textContent = I18N['contact.sending'][lang];

    setTimeout(() => {
      status.textContent = `${I18N['contact.successPrefix'][lang]} ${name}${I18N['contact.successSuffix'][lang]}`;
      form.reset();
    }, 900);
  });
})();

/* =========================================================
   9. NAVBAR ACTIVE LINK ON SCROLL
   ========================================================= */
(function activeNav() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* =========================================================
   10. STAT COUNTERS (count-up on view)
   ========================================================= */
(function statCounters() {
  const numbers = document.querySelectorAll('.stat-number');
  if (!numbers.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  numbers.forEach(el => observer.observe(el));
})();

/* =========================================================
   11. SKILL BARS (fill on view)
   ========================================================= */
(function skillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const level = el.getAttribute('data-level') || '0';
      requestAnimationFrame(() => { el.style.width = `${level}%`; });
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  bars.forEach(el => observer.observe(el));
})();

/* =========================================================
   12. INITIAL LANGUAGE APPLY (runs typewriter + first project render)
   ========================================================= */
applyLanguage(currentLang);
