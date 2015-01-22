"use strict";

var HomePage = function () {

	return {
		// assertions
		assert : function (driver) {
			return driver.elementByName('My Stay').should.eventually.exist;
		},

		checkInIsShown : function (driver) {
			return driver.elementByName('Check-in').should.eventually.exist;
		},

		roomKeyIsShown : function (driver) {
			return driver.elementByName('Room Key').should.eventually.exist;
		},

		// actions
		clickMenu : function (driver) {
			return driver.elementByName('Hamburger').click();
		},

		clickSignOut : function (driver) {
			return driver.elementByName('Logout').click();
		},

		clickValet : function (driver) {
			return driver.elementByName('Valet Service').click();
		}

	};
};

exports.homePage = new HomePage();