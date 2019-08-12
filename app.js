// standard express app, not the cors since this is just a json api
// that will be called by a front end
const
  express            = require( 'express' ),
  app                = express(),
  cors               = require( 'cors' ),
  bodyParser         = require( 'body-parser' ),
  testRoutes         = require( './routes/test' )

app.set('port', ( process.env.PORT || 8080 ) )

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )

app.use( cors() )

app.use( '/tests', testRoutes )

app.listen( app.get( 'port' ), () => {
  console.log( 'Node app is running on port', app.get( 'port' ) )
} )
