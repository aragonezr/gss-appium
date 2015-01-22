"use strict";

var CheckInNowPage = function () {
	return {
		// assertions
		assert : function (driver) {
			return driver.alertText().should.exist;
		},

		// actions
		clickYes : function (driver) {
			return driver.acceptAlert();
		},

		clickCancel : function (driver) {
			return driver.dismissAlert();
		}
	}
};

// asserts

exports.checkInNowPage = new CheckInNowPage();