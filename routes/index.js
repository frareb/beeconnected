const express = require("express");
const router = express.Router();

const reportsController = require("../controllers/reports");

// render a basic home page
router.get("/", function(req, res) {
	res.render("index", {
		title: "BeeConnected",
		longTitle: "Understanding and anticipating mechanisms of honey bee colony mortality with connected beehives",
	});
});

// legal notice rendering
router.get("/legal", function(req, res) {
	res.render("legal", { title: "BeeConnected" });
});

// to download reports
router.get("/reports/download", function(req, res) {
	const downreports = reportsController();

	res.render("reports/reports", {
		title: "BeeConnected",
		localeDate: downreports.localeDate,
		reportFilepaths: downreports.reportFilepaths,
	});
});

module.exports = router;
