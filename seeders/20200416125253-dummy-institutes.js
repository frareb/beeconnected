"use strict";

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert("Institutes", [
			{
				name: "EGCE",
				countryCode: "FRA",
				createdAt: new Date("2020-05-18T12:21:47.027Z"),
				updatedAt: new Date("2020-05-18T12:21:47.027Z"),
			},
			{
				name: "University of Würzburg",
				countryCode: "GER",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Hellenic Agricultural Organization DEMETER",
				countryCode: "GRE",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface) => {
		return queryInterface.bulkDelete("Institutes", null, {});
	},
};
