const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

// Your existing routes (addProduct, totalWeight, changePrice, etc.) remain the same.

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
