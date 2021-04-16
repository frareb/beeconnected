"use strict";

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert("Sensors", [
			{
				gatewayId: 1,
				name: "Temperature",
				unit: " °C",
				model: "DS18B20",
				description: "bh01 Frame 01 A1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				gatewayId: 1,
				name: "Temperature",
				unit: " °C",
				model: "DS18B20",
				description: "bh01 Frame 01 A2",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface) => {
		return queryInterface.bulkDelete("Sensors", null, {});
	},
};
