/* =============================================
   SHAIK RAHAMTHULLA — PORTFOLIO JS
   Clean, well-commented script
   ============================================= */

/* ---- 1. LOADING SCREEN with counter ---- */
window.addEventListener('load', () => {
  const screen = document.getElementById('loading-screen');
  const counter = document.getElementById('loader-counter');
  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 12) + 4;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      // Fade out loading screen
      setTimeout(() => {
        screen.style.opacity = '0';
        screen.style.pointerEvents = 'none';
        setTimeout(() => { screen.style.display = 'none'; }, 600);
      }, 300);
    }
    counter.textContent = count;
  }, 50);
});

/* ---- 3. SCROLL PROGRESS BAR ---- */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  progressBar.style.width = progress + '%';
});

/* ---- 4. NAVBAR SCROLL EFFECT ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- 5. HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ---- 6. ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });
sections.forEach(sec => navObserver.observe(sec));

/* ---- 7. SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- 8. TYPING ANIMATION ---- */
const typedEl = document.getElementById('typed-text');
const words = [
  'Data Analyst',
  'Python Developer',
  'Dashboard Builder',
  'SQL Expert',
  'Fresh Graduate',
  'Aspiring Professional',
  'Power BI Specialist',
  'Technology Graduate',
  'Committed Professional',
  'Dedicated Learner'
];
let wordIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = words[wordIdx];
  typedEl.textContent = word.substring(0, charIdx);
  if (!deleting && charIdx < word.length) {
    charIdx++;
    setTimeout(type, 80);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(type, 40);
  } else {
    deleting = !deleting;
    if (!deleting) wordIdx = (wordIdx + 1) % words.length;
    setTimeout(type, deleting ? 150 : 1600);
  }
}
// Start typing after loading screen (~2.3s)
setTimeout(type, 2400);

/* ---- 9. SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Education timeline items (same pattern)
document.querySelectorAll('.edu-item').forEach(el => revealObserver.observe(el));

/* ---- 10. ANIMATED COUNTER ---- */
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const metricObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.metric-num');
      nums.forEach(num => {
        const target = parseInt(num.dataset.target);
        animateCounter(num, target);
      });
      metricObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const metricsEl = document.querySelector('.hero-metrics');
if (metricsEl) metricObserver.observe(metricsEl);

/* ---- 11. SKILL BARS ANIMATION ---- */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => { bar.style.width = width + '%'; }, 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const barsSection = document.querySelector('.skills-bars');
if (barsSection) barObserver.observe(barsSection);

/* ---- 12. BACK TO TOP ---- */
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('show', window.scrollY > 400);
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- 13. CONTACT FORM ---- */
const form = document.getElementById('contact-form');
const btnText = form.querySelector('.btn-text');
const btnLoading = form.querySelector('.btn-loading');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Loading state
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      successMsg.classList.remove('hidden');
      form.reset();
    } else {
      // Show success anyway if it was a formspree config issue
      // but the message was likely sent
      const data = await response.json().catch(() => ({}));
      if (data.errors) {
        errorMsg.classList.remove('hidden');
        errorMsg.querySelector('i').nextSibling.textContent =
          ' ' + data.errors.map(e => e.message).join(', ');
      } else {
        errorMsg.classList.remove('hidden');
      }
    }
  } catch {
    errorMsg.classList.remove('hidden');
  } finally {
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
  }
});

/* ---- 14. RESUME DOWNLOAD — ensure it works ---- */
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', e => {
    // If the PDF doesn't exist locally (like on GitHub Pages),
    // the browser handles it. This is just a confirmation hook.
    console.log('Resume download initiated:', link.href);
  });
});
