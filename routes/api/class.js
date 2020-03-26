const router = require("express").Router();
const classController = require("../../controllers/classController");

// Matches with "/api/books"
router.route("/")
  .get(classController.findAll)
  .post(classController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(classController.findById)
  .post(classController.addVideo)
  .put(classController.update)
  .delete(classController.remove);

router.route("/updateVideo/:id")
  .put(classController.updateVideo)
  .post(classController.removeVideo)


module.exports = router;
