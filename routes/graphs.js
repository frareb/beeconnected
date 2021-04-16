const express = require("express");
const router = express.Router();

// Network of institutes and gateways
router.get("/network", function(req, res) {
	res.render("graphs/network", { title: "beeconnected" });
});

module.exports = router;
