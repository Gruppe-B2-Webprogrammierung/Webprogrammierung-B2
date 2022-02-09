const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/review', (req, res) => {
	res.status(200).send(req.body);
});

app.listen(port, () => {
	console.log(`Listening on port ${port} http://localhost:${port}/`);
});
