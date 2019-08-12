const
  jwt            = require( 'jsonwebtoken' ),
  responseHelper = require( '../functions/responseHelper' )

const actions = {
  // crud routes just here for reference and to tell you that you should
  // use crud in a real app, not used for sake of example
  create: async ( req ) => {

  },

  index: async ( req ) => {

  },

  show: async ( req ) => {

  },

  update: async ( req ) => {

  },

  destroy: async ( req ) => {

  },

  makeToken: async ( req ) => {
    if ( !req.body.username ) {
      // response helper will pick this error up and propogate it to
      // the front end. Additionally, if we have an unhanlded error,
      // response helper will handle that and return a generic 500
      // to the front end.
      throw { status: 400, message: 'you must include a username' }
    }

    const token = jwt.sign( { user: { username: req.body.username } }, process.env.JWTKEY || 'example secret to remove' )

    return { status: 201, body: token }
  },

  getSomething: async ( req ) => {
    return { body: 'something' }
  },
}

// we just need to wrap our actions in handleActions and it will take
// care of our return and throw statements
module.exports = responseHelper.handleActions( actions )
