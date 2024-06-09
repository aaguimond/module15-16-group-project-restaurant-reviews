//
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (username && email && password) {
        const response = await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to register');
        }
    }
});