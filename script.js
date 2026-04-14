document.addEventListener('DOMContentLoaded', () => {
  // Инициализация
  initTheme();
  initTabs();
  initSearch();
  updateLastUpdate();
  initFAQ();

  // Переключение темы
  function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.body.className = currentTheme === 'dark' ? 'dark-theme' : 'light-theme';
    themeToggle.textContent = currentTheme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';

    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      document.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
      localStorage.setItem('theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    });
  }

  // Вкладки
  function initTabs() {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  // Поиск по правилам
  function initSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      const allRules = document.querySelectorAll('.rule-card li, .rule-card h3');

      allRules.forEach(rule => {
        rule.innerHTML = rule.textContent; // Сбрасываем выделение


        if (query && rule.textContent.toLowerCase().includes(query)) {
          rule.closest('.rule-card').classList.add('highlight');
          const regex = new RegExp(`(${query})`, 'gi');
          rule.innerHTML = rule.textContent.replace(regex, '<span class="highlighted">$1</span>');
        } else {
          rule.closest('.rule-card').classList.remove('highlight');
        }
      });
    });
  }

  // Обновление даты последнего изменения
  function updateLastUpdate() {
    const date = new Date().toLocaleDateString('ru-RU');
    document.getElementById('lastUpdate').textContent = date;
  }

  // FAQ — раскрытие деталей
  function initFAQ() {
    const details = document.querySelectorAll('.faq-list details');

    details.forEach(detail => {
      detail.addEventListener('toggle', () => {
        if (detail.open) {
          detail.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
          detail.style.boxShadow = 'var(--shadow)';
        }
      });
    });
  }
});
