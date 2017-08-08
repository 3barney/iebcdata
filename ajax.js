/**
 * created by waweru
 */

'use strict';

const req = require('request-json');
const client = req.createClient('https://public.rts.iebc.or.ke/jsons/');

const getCounties = (url, cb) => client.get(url, (err, res, body) => {
	if (err) throw err;
	// return list of counties
	return cb(body.map(val=>({[val[0]]:val[1]})));
})
/*getCounties('round1/config/Kenya_Elections_Presidential/Level_2.json',
	(data) => {
		console.log(data);
	}	
);
*/

const getPresidentialResults = (url, cb) => client.get(url, (err, res, body) => {
	if (err) throw err;
	console.log(body);
	return cb(body);
});
getPresidentialResults('round1/results/Kenya_Elections_Presidential/1/info.json',
	(data) => {
		console.log(data);
	}	
);