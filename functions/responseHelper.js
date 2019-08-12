const actions = {
  // this handles a non error response, defaults to sending 200 and an
  // empty object so you could have a controller that doesn't return
  // status and body can be controlled by setting them in the response
  // return object of a controller
  handleResponse: ( result, res ) => {
    if ( result == undefined ) {
      result = {}
    }

    res.status( result.status || 200 ).json( result.body )
  },

  // this handles errors, will return a generic 500 error if no status
  // is set so if we have an unhandled error in our code it will simply
  // return a generic error
  handleError: ( err, res ) => {
    console.log( err )

    if ( !err.status ) {
      return res.status( 500 ).json({ message: 'An error occured' })
    }

    res.status( err.status ).json({ message: err.message })
  },

  // this handles wrapping our controllers in a try catch and wrapping
  // their return result or error in our handle functions
  handleActions: ( fileActions ) => {
    // new hashMap for controller
    const resultActions = {}

    // loop over all functions in the controller
    for ( const action of Object.keys( fileActions ) ) {
      // create a new function with the same name as the controller
      // function but with arguments req and res. pass the req to the
      // original controller function and handle its result / error
      resultActions[action] = async ( req, res ) => {
        try {
          const result = await fileActions[action]( req )
          actions.handleResponse( result, res )
        } catch( e ) {
          actions.handleError( e, res )
        }
      }
    }

    // return the now wrapped functions
    return resultActions
  },

  // same as handle actions but with next so that the middleware can
  // be chained
  handleMiddleware: ( fileActions ) => {
    const resultActions = {}

    for ( const action of Object.keys( fileActions ) ) {
      resultActions[action] = async ( req, res, next ) => {
        try {
          await fileActions[action]( req )
          next()
        } catch( e ) {
          actions.handleError( e, res )
        }
      }
    }

    return resultActions
  },
}

module.exports = actions
