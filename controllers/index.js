let router = require('express').Router();


router.use(require('./table.js'));
router.use(require('./summary.js'));
router.use(require('./heading.js'));
router.use(require('./ratio.js'));
router.use(require('./pressing.js'));
router.use(require('./vibratory.js'));
router.use(require('./water.js'));
router.use(require('./ph.js'));
router.use(require('./users.js'));

router.get('/', function(req, res){
  res.render('index');
});

module.exports = router;
