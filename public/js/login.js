// Adding event listener to the submit button on the login form
const loginForm = document.querySelector('.login-form')

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        // When pressed, prevent page reload
        event.preventDefault();
        // Grab values from the email and password inputs
        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();
        // If both exist,
        if (email && password) {
            // Await the response from our authController.js login handler
            const response = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            // If the response is OK,
            if (response.ok) {
                // redirect user to the dashboard
                document.location.replace('/dashboard');
            // If not, alert the user of the failed login
            } else {
                alert('Failed to log in.');
            }
        }
    });
}