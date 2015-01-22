"use strict";

var RoomKeyPage = function () {

	return {
		// assertions
		assert : function (driver) {
			return driver.elementByName('Room Key').should.eventually.exist;
		},

		// actions
		confirmation : function (driver) {
			return driver.elementByName('You\'re checked in.').should.eventually.exist;
		},

		clickDone : function (driver) {
			return driver.elementByName('Done').click();
		},

		clickClose : function (driver) {
			return driver.elementByName('CloseButton').click();
		}
	}

};

exports.roomKeyPage = new RoomKeyPage();