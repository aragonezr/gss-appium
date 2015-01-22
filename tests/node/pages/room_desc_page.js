"use strict";

exports.assert = function (driver) {
	return driver.elementByName('Room Description').should.eventually.exist;
};

exports.clickBack = function (driver) {
	return driver.elementByName('LargeArrow Left').click();
};