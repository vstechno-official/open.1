const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 6969;

app.get('/open/:appname', (req, res) => {
    const appName = req.params.appname;

    if (!appName) {
        return res.status(400).send('Please provide a valid app name');
    }

    exec(`start ${appName}`, (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing command');
        }
        res.status(200).send(`Successfully opened ${appName}`);
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
app.get('/open/:path', (req, res) => {
    const path = req.params.path;

    if (!path) {
        return res.status(400).send('Please provide a valid path');
    }

    exec(`start "" "${path}"`, (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing command');
        }
        res.status(200).send(`Successfully opened ${path}`);
    });
});

app.use(express.static('public'));