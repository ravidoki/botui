const express = require('express');
const path = require('path');
const compression = require('compression')
const app = express();
app.use(compression());

app.use(express.static('./'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: './'}),
);

app.listen(env.port);
