// Adding event listener to the submit button on the review form
document.querySelector('form').addEventListener('submit', async (event) => {
    // When pressed, prevent page reload
    event.preventDefault();
    // Grab values from the rating, review, and restaurantId inputs
    const rating = document.querySelector('#rating').value.trim();
    const review = document.querySelector('#review').value.trim();
    const restaurantId = document.querySelector('input[name="restaurantId"]').value;
    // If both rating and review exist,
    if (rating && review) {
        // Await the response from our authController.js login handler
        const response = await fetch('/reviews', {
            method: 'POST',
            body: JSON.stringify({ rating, review, restaurantId }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If the response is OK,
        if (response.ok) {
            // reload page to display new review
            document.location.reload;
        // If not, alert the user of the failed login
        } else {
            alert('Failed to submit review.');
        }
    }
});