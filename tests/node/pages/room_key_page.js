"use strict";

// asserts

exports.assert = function (driver) {
	return driver.elementByName('Room Key').should.eventually.exist;
};

exports.confirmation = function (driver) {
	return driver.elementByName('You\'re checked in.').should.eventually.exist;
};

// actions

exports.clickDone = function (driver) {
	return driver.elementByName('Done').click();
};

exports.clickClose = function (driver) {
	return driver.elementByName('CloseButton').click();
};