const express = require('express');
const app = express();

app.use(express.json());

const Router = require('./routes');
app.use(Router);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port: ${port}`));
