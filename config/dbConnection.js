const mysql = require('mysql');


const conn = mysql.createConnection({
host: 'ls-1bb225759345324c2b79e55b7e889c2cb82c84a5.cub6imsfzin1.us-east-1.rds.amazonaws.com',
user: 'dbmasteruser',
password: 'holacomoestas',
database: "vamoidprod"

// host: 'localhost',
// user: 'root',
// password: '',
// database: "userauth"
});


conn.connect(function(err){
	if(err)throw err;
	console.log("database connected successfully");
})


module.exports= conn;