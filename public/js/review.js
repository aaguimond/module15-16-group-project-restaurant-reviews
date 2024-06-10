document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    if (form) {
        // Adding event listener to the submit button on the review form
        form.addEventListener('submit', async (event) => {
            // When pressed, prevent page reload
            event.preventDefault();
            // Grab values from the rating, review, and restaurantId inputs
            const rating = document.querySelector('#rating');
            const review = document.querySelector('#review');
            const restaurantId = document.querySelector('input[name="restaurantId"]');

            if (!rating || !review || !restaurantId) {
                return;
            }

            const ratingValue = rating.value.trim();
            const reviewValue = rating.value.trim();
            const restaurantIdValue = restaurantId.value;

            // If both rating and review exist,
            if (ratingValue && reviewValue) {
                // Await the response from our authController.js login handler
                const response = await fetch('/reviews', {
                    method: 'POST',
                    body: JSON.stringify({ rating: ratingValue, review: reviewValue, restaurantId: restaurantIdValue }),
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
    }
});