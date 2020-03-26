const router = require("express").Router();
const classRoutes = require("./class");
const userRoutes = require("./users");
const propertyRoutes = require("./property");
const withAuth = require('../../middleware');


// Book routes
router.use("/class", classRoutes);
router.use("/users", userRoutes);
router.use("/property", propertyRoutes);



router.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });
  

module.exports = router;