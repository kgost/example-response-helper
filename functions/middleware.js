const
  jwt                 = require( 'jsonwebtoken' ),
  responseHelper      = require( './responseHelper' )

const actions = {

  // Middleware

  /**
  * Should determine whether or not the user is logged in and respond with an error if they are not,
  * return next if they are
  * @param  {Object}   req  request object from user to server
  * @param  {Object}   res  response object to user from server
  * @param  {Function} next next function in express function list
  * @return {Object}        Returns res with an error code 401 or next if the user is logged in
  */
  authenticate: async ( req ) => {
    // if no token was sent under query or the token was null then respond with the error
    if (!req.headers.authorization || req.headers.authorization == 'null') {
      throw { status: 401, message: 'You Must Login.' }
    }

    let status
    let message

    // decode the token using the jwt library
    jwt.verify( req.headers.authorization, process.env.JWTKEY || 'example secret to remove', ( err, decoded ) => {
      if ( err ) {
        if ( err.name === 'TokenExpiredError' ) {
          message = 'Session Expired, Please Login.'
          status = 401
        } else if ( err.message === 'invalid signature' ) {
          message = 'Invalid Login.'
          status = 401
        } else {
          message = 'Authentication Error Has Occured.'
          status = 500
        }

        throw { status: status, message: message }
      }

      req.user = decoded.user
    } )
  },
}

module.exports = responseHelper.handleMiddleware( actions )
