"use strict";

exports.assert = function (driver) {
	console.log(driver.elementByClassName('UIAAlert'));
	return driver.alertText().should.exist;
}

exports.clickYes = function (driver) {
	return driver.acceptAlert();
};

exports.clickCancel = function (driver) {
	return driver.dismissAlert();
};