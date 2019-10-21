const path = require('path');
let controllers = require( './controllers/index' );
let bodyParser = require( 'body-parser' );
let express = require( 'express' );
let bb = require( 'express-busboy' );
require('source-map-support').install();

let db = require('./db');
const passport = require('passport');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
//a list of mongodb
const config = require('./config/database');
const mongoose = require('mongoose');
const logger = require('morgan');

let app = express();

//mongodb
mongoose.connect(config.database, {useNewUrlParser: true});
let database = mongoose.connection;
mongoose.models = {};
mongoose.modelSchema = {};
database.on('error', function(err) {
	console.log(err); // check for DB errors
});
database.once('open', function () {
	console.log('connected to MongoDB successfully');// check connection
});

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));

app.set( 'trust proxy', true );

////////////middle ware section///////////

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//////////////////////////////////////////
// Show error information
process.on( 'unhandledRejection', (reason, p) => {
	console.log( 'Unhandled promise error:  ' + p + reason );
	console.log( 'stack: ' + reason.stack );
} );

// Allow file uploads
app.use( bodyParser.urlencoded({ extended: true }) );
bb.extend( app, {
	upload: true
} );

app.use('/', controllers);

// Static files for the demo. Use nginx or similar for real deploys
app.use( express.static('public') );
//app.use( '/examples', express.static('examples') );

// view engine setup
app.use('/views', express.static('views') );
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.set('view engine', 'ejs');

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// 500 Error
app.use( function( err, req, res, next ) {
	console.error(err.stack);

	res
		.status(500)
		.send('Something broke!');
} );

// 404 Error
app.use( function( req, res ) {

	res
		.status(404)
		.send('Sorry cant find that!');
} );

// Listening
app.listen( 8081, '0.0.0.0', function () {
    console.log( 'laboratory app demo - navigate to http://localhost:8081/' );
} );

// Test the database connection on startup by getting a list of table names in the db
// This can safely be removed if you are happy with your db connection configuration.
// It is used purely to show a console error if the connection is not available.
let query;
let bindings;

switch(db.client.constructor.name) {
	case 'Client_MSSQL':
		query = 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' AND table_catalog = ?',
		bindings = [ db.client.database() ];
		break;
	case 'Client_MySQL':
	case 'Client_MySQL2':
		query = 'SHOW TABLES';
		break;
	case 'Client_PG':
		query =  'SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_catalog = ?';
		bindings = [ db.client.database() ];
		break;
	case 'Client_SQLite3':
		query = "SELECT name AS table_name FROM sqlite_master WHERE type='table'";
		break;
	case 'Client_Oracledb':
		query = "SELECT owner, table_name FROM all_tables";
		break;
}

db.raw(query, bindings)
	.then(function() {
		; // noop
	})
	.catch(function(err) {
		console.error( err.toString() );
	});
