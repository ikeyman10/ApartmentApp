const router = require("express").Router();
const propertyController = require("../../controllers/propertyController");
const withAuth = require('../../middleware');


// Matches with "/api/books"
router.route("/")
  .all(withAuth)
  .get(propertyController.findAll)
  .post(propertyController.create);

  
router.route("/realtor")
  .post(propertyController.findByRealtor);


router.route("/realtor/:id")
  .post(propertyController.findByIdRealtor);

  

// Matches with "/api/books/:id"
router.route("/:id")
  .all(withAuth)
  .get(propertyController.findById)
  .put(propertyController.update)
  .delete(propertyController.remove);

module.exports = router;
