document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.querySelector('#username');
            const email = document.querySelector('#email');
            const password = document.querySelector('#password');
            const confirmPassword = document.querySelector('#confirmPassword');

            if (!username || !email || !password || !confirmPassword) {
                return;
            }

            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();
            const confirmPasswordValue = confirmPassword.value.trim();

            if (passwordValue !== confirmPasswordValue) {
                alert('Passwords do not match.');
                return;
            }

            if (usernameValue && emailValue && passwordValue) {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ username: usernameValue, email: emailValue, password: passwordValue }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to register');
                }
            }
        });
    }
});