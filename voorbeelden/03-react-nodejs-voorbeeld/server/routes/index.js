var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mijnDataEindpunt', function (req, res, next) {
    res.json({
        tekst: "Dit kwam vanaf een API vanuit nodejs. Dit kan uit een DB komen of waar dan ook"
    })
});

module.exports = router;
