"use strict";

// asserts

exports.assert = function (driver) {
	return driver.elementByName('My Stay').should.eventually.exist;
};

exports.checkInIsShown = function (driver) {
	return driver.elementByName('Check-in').should.eventually.exist;
};

exports.roomKeyIsShown = function (driver) {
	return driver.elementByName('Room Key').should.eventually.exist;
};

// actions

exports.clickMenu = function (driver) {
	return driver.elementByName('Hamburger').click();
};

exports.clickSignOut = function (driver) {
	return driver.elementByName('Logout').click();
};