"use strict";

var RoomDescPage = function () {
	
	return {
		// assertions
		assert : function (driver) {
			return driver.elementByName('Room Description').should.eventually.exist;
		},

		// actions
		clickBack : function (driver) {
			return driver.elementByName('LargeArrow Left').click();
		}
	}
};

exports.roomDescPage = new RoomDescPage();