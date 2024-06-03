const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    if (req.query.variant === 'winner') {
        res.sendFile(path.join(__dirname, 'views', 'winner.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});