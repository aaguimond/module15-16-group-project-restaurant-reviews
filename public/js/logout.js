// Adding an event listener to the logout link
document.querySelector('#logout').addEventListener('click', async () => {
    // Once clicked, await the response from the logout handler in authController.js
    const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // If the response is OK, redirect user to the home page
    if (response.ok) {
        document.location.replace('/');
    // If not, alert the user of the failed logout
    } else {
        alert('Failed to log out.');
    }
});