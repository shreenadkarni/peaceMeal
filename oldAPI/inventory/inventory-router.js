const express = require('express');
var router = express.Router();
var path = require('path');
var pgEscape = require('pg-escape')
var scriptName = path.basename(__filename);
module.exports = router;

//initializes the postgresclient
const {Client} = require('pg');

//checks if running on localhost or heroku and sets client credentials accordingly
if(__dirname.includes("Users")){
	console.log('running locally');
	client = new Client({
	  database: process.env.DATABASE
	});
}
else{
	client = new Client({
	connectionString: process.env.DATABASE_URL
	// || 'd94f4516d8u5mu'
	});
}

//connects the client to the postgresdb
client.connect();


router.get('/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});


//returns a sample inventory list for UI testing purposes
router.get('/getTestInventory', function(req, res){
  //item name, age (days), category, storage type (fridge, freezer, pantry etc)
  var genericList = [[
       {'name':'eggs', 'age':'14', 'category':'produce', 'storage':'fridge', 'quantity':'4oz'},
      {'name':'broccoli', 'age':'14', 'category':'produce', 'storage':'fridge', 'quantity':'4oz'},
      {'name':'cheese', 'age':'14', 'category':'produce', 'storage':'pantry', 'quantity':'4oz'}
    ]];

  res.json(genericList);
});

//post items into inventory; sends a success or failure confirmation
router.post('/postTestInventory', function(req, res){
	console.log(req.body);
  res.json('success!');
});

router.post('/updateTest', function(req, res){
	const text = 'UPDATE "Users_Inventory" SET "User_Inventory" = $1 WHERE "User_ID" = "nayardhruv0@gmail.com"';
	var values = [JSON.stringify(req.body.inventory)];
		console.log("list: "+(JSON.stringify(values)));
	client.query(text,values).then(function(response){
		//console.log(response.rows);
		console.log("it worked!")
		res.json("your test post worked");
	}).catch(function(error){
		console.log('error: '+error);
		res.json('update error: '+error);
	});
});

//returns all of the elements from the Users table within postgres
router.get('/testPostgres', function(req, res){
	// client.query('SELECT * FROM pg_catalog.pg_tables', function(err, result) {
	//   console.log(result.rows);
	// });

  client.query('SELECT * FROM "Users_Inventory" WHERE "User_ID" = "nayardhruv0@gmail.com"').then(function(response){
    //console.log(response.rows);
    res.json(response.rows[0].User_Inventory);
  }).catch(function(error){
    res.json('select error: '+error);
  });
});

// client.connect();
// client.query('SELECT * FROM Users').then(function(response){
//   console.log(response.rows);
//   client.end();
//   //res.json(response.rows);
// }).catch(function(error){
//   client.end();
//   throw error;
// });



// (response, error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   });


// const { Client } = require('pg');
//
//
// const client = new Client();
//
// //establish database connection
// client.connect()
// .then(() => console.log('connected'))
//   .catch(err => console.error('connection error', err.stack))
//
// //query the database
// client.query('SELECT * FROM Users;')
// .then((res) => console.log(res))
//   .catch(err => console.error('connection error', err.stack))
//
// //close database connection
// client.end();

// client.connect().catch(function(err){
//   throw (err)
// });;
//
// client.query('SELECT t* FROM Users;').then(function(res){
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
// }).catch(function(err){
//   throw (err)
// });
//
// client.end();



// , (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// }).catch(function(error){
//   throw (error)
// });
