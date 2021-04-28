"use strict";

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert("Gateways", [
			{
				instituteId: 1,
				name: "Bat5",
				lat: 48.70260,
				lon: 2.14570,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Bondy",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Clermond",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Groix",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "ForTesting",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 2,
				name: "NA",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 3,
				name: "NA",
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
