const express = require('express');
const app = express();
const PORT = 3000;

// This middleware is needed to parse JSON data from incoming requests (like from your forms)
app.use(express.json());

// This middleware tells Express to serve all the static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));


// -----------------------------------------
// --- API Endpoints Will Go Here Later ---
// -----------------------------------------


// This starts the server and makes it listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running and accessible at http://localhost:${PORT}`);
});