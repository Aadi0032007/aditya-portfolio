const experiences = [
  {
    role: 'Senior Frontend Engineer',
    company: 'StellarPay',
    period: '2022 — Present',
    bullets: [
      'Led rebuild of merchant dashboard with React/TypeScript, cutting bundle size by 28% and improving TTI by 36%.',
      'Shipped risk review workflows with feature flags, boosting approval throughput while keeping uptime at 99.96%.',
      'Partnered with design to craft a motion system that keeps interactions delightful yet performant.'
    ],
    tags: ['React', 'TypeScript', 'Feature Flags', 'Design Systems']
  },
  {
    role: 'Frontend Engineer',
    company: 'Relay Labs',
    period: '2020 — 2022',
    bullets: [
      'Built developer tooling UI with live previews and codegen, increasing activation by 18% for new users.',
      'Introduced component docs with automated visual regression testing to speed up releases.',
      'Mentored three engineers on accessibility-first development and performance budgets.'
    ],
    tags: ['Next.js', 'Testing Library', 'Storybook', 'Accessibility']
  },
  {
    role: 'Software Engineer',
    company: 'Aurora Apps',
    period: '2018 — 2020',
    bullets: [
      'Shipped consumer experiences with playful animations, increasing session time by 22%.',
      'Implemented analytics-informed experiments, rapidly iterating on onboarding and retention flows.',
      'Owned Node/Express APIs that supported 100k+ MAU with observability and alerting.'
    ],
    tags: ['React', 'Node.js', 'Analytics', 'Animations']
  }
];

const projects = [
  {
    title: 'Motion System Kit',
    summary: 'Reusable motion primitives and tokens for React apps; delivered smooth transitions and reduced layout thrash.',
    result: 'Adopted across 3 product pods with zero regressions.',
    tag: 'Design System'
  },
  {
    title: 'Realtime Insights',
    summary: 'Live metrics surface for merchants with websockets and shimmer loading states.',
    result: 'Cut decision time for ops by 2x and raised NPS by +9.',
    tag: 'Data Viz'
  },
  {
    title: 'Guided Onboarding',
    summary: 'Step-based onboarding with contextual helpers and async validation.',
    result: 'Improved activation by 14% within the first quarter post-launch.',
    tag: 'Growth'
  },
  {
    title: 'Developer CLI + Dashboard',
    summary: 'Unified developer experience with CLI telemetry surfaced in a responsive dashboard.',
    result: 'Reduced support tickets by 30% and clarified release health.',
    tag: 'DevEx'
  }
];

const experienceList = document.getElementById('experience-list');
const projectsGrid = document.getElementById('projects-grid');

function renderExperiences() {
  experiences.forEach((exp) => {
    const item = document.createElement('article');
    item.className = 'timeline-item reveal';
    item.innerHTML = `
      <div class="meta">${exp.period}</div>
      <h3>${exp.role} · ${exp.company}</h3>
      <div class="tags">${exp.tags.map((t) => `<span class="badge">${t}</span>`).join(' ')}</div>
      <ul>${exp.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    `;
    experienceList.appendChild(item);
  });
}

function renderProjects() {
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project reveal';
    card.innerHTML = `
      <header>
        <h3>${project.title}</h3>
        <span class="tag">${project.tag}</span>
      </header>
      <div class="body">
        <p>${project.summary}</p>
        <p><strong>Outcome:</strong> ${project.result}</p>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

function cursorMagic() {
  const cursor = document.querySelector('.cursor');
  const cursorOutline = document.querySelector('.cursor-outline');
  let posX = 0;
  let posY = 0;

  const updateCursor = (e) => {
    posX = e.clientX;
    posY = e.clientY;
    cursor.style.transform = `translate(${posX}px, ${posY}px)`;
    cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
  };

  window.addEventListener('mousemove', updateCursor);

  const interactive = document.querySelectorAll('a, button, .pill, .card, .project, .timeline-item');
  interactive.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.background = 'rgba(126, 241, 201, 0.8)';
      cursorOutline.style.transform += ' scale(1.2)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursor.style.background = 'var(--accent)';
      cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
    });
  });
}

function addScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function animateOrbs() {
  const orbs = document.querySelectorAll('.bg-orb');
  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 12;
    const y = (e.clientY / innerHeight - 0.5) * 12;
    orbs.forEach((orb, index) => {
      const intensity = (index + 1) * 4;
      orb.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    });
  });
}

renderExperiences();
renderProjects();
cursorMagic();
addScrollReveal();
animateOrbs();
