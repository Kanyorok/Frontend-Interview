// Define the URL to fetch data from
const url = 'https://jsonplaceholder.typicode.com/users';

// Function to fetch data and display it
async function fetchData() {
    try {
        // Fetch data from the URL
        const response = await fetch(url);
        // Check if the response status is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the response data as JSON
        const data = await response.json();

        // Get the container element where the data will be displayed
        const container = document.getElementById('data-container');

        // Loop through the data and create elements to display each item
        data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.textContent = `Name: ${user.name}, Email: ${user.email}`;
            container.appendChild(userDiv);
        });
    } catch (error) {
        // Handle any errors that occurred during fetching or parsing
        console.error('Fetch error:', error);
    }
}

// Call the function to fetch data when the script is loaded
fetchData();
