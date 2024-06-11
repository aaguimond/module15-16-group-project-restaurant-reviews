document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#review-form')
    if (form) {
        // Adding event listener to the submit button on the review form
        form.addEventListener('submit', async (event) => {
            // When pressed, prevent page reload
            event.preventDefault();
            // Grab values from the rating, review, and restaurant_id inputs
            const rating = document.querySelector('#rating').value.trim();
            const review_text = document.querySelector('#review_text').value.trim();
            const restaurant_id = document.querySelector('input[name="restaurant_id"]').value;

            if (rating && review_text) {
                try {
                    // Await the response from our authController.js login handler
                    const response = await fetch(`/reviews/restaurants/${restaurant_id}`, {
                        method: 'POST',
                        body: JSON.stringify({ rating, review_text, restaurant_id }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    // If the response is OK,
                    if (response.ok) {
                        // reload page to display new review
                        document.location.reload();
                    // If not, alert the user of the failed login
                    } else {
                        alert('Failed to submit review.');
                    }
                } catch (err) {
                    console.error('Error:', err);
                    alert('An error occurred while submitting the review.');
                }
            }
        });
    }
});