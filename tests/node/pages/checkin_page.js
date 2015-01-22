"use strict";

var CheckInPage = function () {

	var xpathReadMore = '//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[2]/UIAButton[1]';

	return {
		// assertions
		assert : function (driver) {
			return driver.elementByName('Check-in').should.eventually.exist;
		},

		// actions
		clickClose : function (driver) {
			return driver.elementByName('CloseButton').click();
		},

		clickCheckIn : function (driver) {
			return driver.elementByName('Check-in Now').click();
		},

		clickReadMore : function (driver) {
		  return driver.elementByXPath(xpathReadMore).click();
		}
	};
};

exports.checkInPage = new CheckInPage();