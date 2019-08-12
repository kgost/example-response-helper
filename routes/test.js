const
  express    = require( 'express' ),
  router     = express.Router(),
  middleware = require( '../functions/middleware' ),
  controller = require( '../controllers/test' )

// you can and should use normal crud, not used in this example
// router.post( 'tests', controller.create )

// router.get( 'tests', controller.index )

// router.get( 'tests/:id', controller.show )

// router.put( 'tests/:id', controller.update )

// router.delete( 'tests/:id', controller.destroy )

router.post( '/make-token', controller.makeToken )

router.get( '/get-something', middleware.authenticate, controller.getSomething )

module.exports = router
