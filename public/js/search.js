// Adding event listener to the submit button on the search form
document.querySelector('#search-form').addEventListener('submit', async (event) => {
    // When pressed, prevent page reload
    event.preventDefault();
    // Grab values from the restaurant name and location inputs
    const name = document.querySelector('#name').value.trim();
    const address = document.querySelector('#address').value.trim();
    // If both exist,
    if (name) {
        // Await the response from our restaurantController.js handler
        const response = await fetch('/restaurants/search', {
            method: 'POST',
            body: JSON.stringify({ name, address }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If the response is OK,
        if (response.ok) {
            const data = await response.json();
            
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                document.querySelector('#search-results').innerHTML = '<p>No results found. Please try another search.</p>';
            }
            
        } else {
            alert('Failed to search for restaurants.');
        }
    }
});