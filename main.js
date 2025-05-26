// 1. Збереження даних про браузер
const browserInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
};
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

// 2. Вивід у футер
window.addEventListener('DOMContentLoaded', () => {
    const info = JSON.parse(localStorage.getItem('browserInfo'));
    const footer = document.querySelector('footer');
    const div = document.createElement('div');
    div.innerHTML = `
        <strong>Інформація браузера:</strong><br>
        OS: ${info.platform}<br>
        UserAgent: ${info.userAgent}<br>
        Мова: ${info.language}<br>
        Cookies: ${info.cookiesEnabled ? 'увімкнені' : 'вимкнені'}
    `;
    footer.appendChild(div);
});

// 3. Коментарі з JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/posts/18/comments')
    .then(res => res.json())
    .then(comments => {
        const container = document.querySelector('.container');
        const title = document.createElement('h2');
        title.textContent = 'Відгуки роботодавців';
        container.appendChild(title);

        const list = document.createElement('ul');
        comments.forEach(comment => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<br>${comment.body}`;
            list.appendChild(item);
        });
        container.appendChild(list);
    });

// 4. Модальне вікно через 60с
setTimeout(() => {
    const modal = document.createElement('div');
    modal.style = `
        position: fixed; top: 0; left: 0; width: 100%;
        height: 100%; background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 1000;
    `;
    modal.innerHTML = `
        <form action="https://formspree.io/f/mbloqrbo" method="POST"
            style="background: white; padding: 20px; border-radius: 10px; max-width: 400px; width: 100%;">
            <h3>Зворотний зв'язок</h3>
            <input name="name" placeholder="Ім’я" required style="width: 100%; margin-bottom: 10px;"><br>
            <input type="email" name="email" placeholder="Email" required style="width: 100%; margin-bottom: 10px;"><br>
            <input type="tel" name="phone" placeholder="Номер телефону" style="width: 100%; margin-bottom: 10px;"><br>
            <textarea name="message" placeholder="Ваше повідомлення" required style="width: 100%; margin-bottom: 10px;"></textarea><br>
            <button type="submit">Відправити</button>
        </form>
    `;
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}, 60000);

// 5. Темна/світла тема
function applyTheme() {
    const hour = new Date().getHours();
    const isDay = hour >= 7 && hour < 21;
    const theme = localStorage.getItem('theme') || (isDay ? 'light' : 'dark');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
}

applyTheme();

document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme();
});
