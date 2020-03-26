const router = require("express").Router();
const userController = require("../../controllers/userController");
const withAuth = require('../../middleware');


// Matches with "/api/books"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

router.route("/login")
  .post(userController.loginAuth);

  router.route("/logout")
  .post(userController.logout);

  

// Matches with "/api/books/:id"
router.route("/:id")
  .all(withAuth)
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
