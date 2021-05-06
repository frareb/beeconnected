"use strict";

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert("Gateways", [
			{
				instituteId: 1,
				name: "Campus1",
				lat: 48.70260,
				lon: 2.14570,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Campus2",
				lat: 48.70260,
				lon: 2.14570,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Campus3",
				lat: 48.70260,
				lon: 2.14570,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Bondy1",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Bondy2",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Bondy3",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Bondy4",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Bondy5",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Rochefort1",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Rochefort2",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Rochefort3",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Rochefort4",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Rochefort5",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Ronqueux1",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Ronqueux2",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Ronqueux3",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Ronqueux4",
				lat: null,
				lon: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				instituteId: 1,
				name: "Ronqueux5",
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
				instituteId: 2,
				name: "NA",
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
			{
				instituteId: 3,
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
