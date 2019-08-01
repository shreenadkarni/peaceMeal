const https = require('https');

//API IDs and Keys
const Edemam = {"ID":"0c0a20a2", "Key":"c9f376d5a90645516dfdc096b140b815"};

module.exports.testEdemamAPI = function testEdemamAPI(originalRes){
	data = "";

	var request = formatEdemamInputs(['beef', 'potato'], [], 0, 1);
	console.log(request);

	//'https://api.edamam.com/search?q=beef,potato&app_id='+Edemam.ID+'&app_key='+Edemam.Key+'&from=0&to=1'
	https.get(request, (res) => {
			console.log('statusCode:', res.statusCode);
			console.log('headers: ', res.headers);


			//appends the buffering data responses to an overall data object
			res.on('data', (d) =>{
				data += d;
			});

			//once the response is done buffering; respond with the aggregated data object
			res.on('end', function(){
				originalRes.json(JSON.parse(data).hits);
			})

		}).on('error',(e) => {
			console.error(e);
			return e;
	});
}

//this function is intended to take javascript arrays for an Edemam request and format them into an HTML friendly string for the Edemam API call
formatEdemamInputs = function(includedFoods, excludedFoods, fromIndex, toIndex){
	var includedFoodsString = '';
	var excludedFoodsString = '';
	var range = '&from='+fromIndex+'&to='+toIndex;
	var credentials = getEdemamCreds();

	if(includedFoods.length < 0)
		return 'no query parameters provided';
  var startingRequest = 'https://api.edamam.com/search?q=';

	includedFoodsString = includedFoods.join();

	if(excludedFoods.length > 0){
		excludedFoodsString = '&Excluded=';
		excludedFoodsString += excludedFoods.join('&Excluded=');
	}

	return startingRequest+includedFoodsString+credentials+excludedFoodsString+range;
}


getEdemamCreds = function(){
  return ('&app_id='+Edemam.ID+'&app_key='+Edemam.Key);
}
