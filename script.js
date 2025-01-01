const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

document.querySelector('.form-box login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[placeholder="username"]').value;
    const password = e.target.querySelector('input[placeholder="password"]').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = `dashboard.html?username=${data.username}`;
    } else {
        alert(data.message || 'Error logging in');
    }
});

document.querySelector('.form-box.register form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = e.target.querySelector('input[placeholder="username"]').value;
    const email = e.target.querySelector('input[placeholder="email"]').value;
    const password = e.target.querySelector('input[placeholder="password"]').value;

    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration successful. Please log in.');
        window.location.reload();
    } else {
        alert(data.message || 'Error registering user');
    }
});

