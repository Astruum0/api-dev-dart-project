const router = require("express").Router();
router.get("/", (req, res, next) => {
    res.redirect("/games");
});
module.exports = router;