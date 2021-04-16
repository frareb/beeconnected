"use strict";

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert("Gateways", [
			{
				instituteId: 1,
				name: "Beehive FRA A1",
				lat: 48.42341,
				lon: 2.09404,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Beehive FRA A2",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Beehive FRA B1",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 2,
				name: "Beehive GER A1",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 2,
				name: "Beehive GER A2",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 3,
				name: "Beehive GRE A1",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface) => {
		return queryInterface.bulkDelete("Gateways", null, {});
	},
};
