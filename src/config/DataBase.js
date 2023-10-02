const { Pool } = require('pg');
const { hostDatabase, portDatabase, nameDatabase, passwordDatabase, userDatabase } = require('../../sensitiveDate');

const pool = new Pool({
	host: hostDatabase,
	port: portDatabase,
	user: userDatabase,
	password: passwordDatabase,
	database: nameDatabase
});


module.exports = pool

