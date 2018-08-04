const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
    res.render("sentiment-analyzer-index", { title: "JASA Sentiment Analyzer" });
})

router.post("/analyze", jsonParser, (req, res) => {
    let AYLIENTextAPI = require('aylien_textapi');
    let textapi = new AYLIENTextAPI({
        application_id: "0be5e9e1",
        application_key: "c14844b53128c567eba97545a17a87d2"
    });
    textapi.sentiment({
        'text': req.body.text
    }, function (error, response) {
        if (error === null) {
            res.render('sentiment-analyzer-results', { title: 'Results', heading: "Here are your results", results: response });
        } else {
            res.render('sentiment-analyzer-results', { title: 'ERROR', heading: "Something went wrong..." });
        }
    });
})

module.exports = router;