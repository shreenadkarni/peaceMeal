const express = require('express');
var router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename);

module.exports = router;


router.get('/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

router.get('/test', function(req,res,next){
  res.json('Success! Reached '+scriptName);
});

router.use('/recipes', require('./recipes/recipe-router.js'));
router.use('/inventory', require('./inventory/inventory-router.js'));
