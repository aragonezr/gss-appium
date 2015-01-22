"use strict";

var ValetPage = function () {

	return {
		// assertions
		assert : function (driver) {
			return driver.elementByName('Valet Parking').should.eventually.exist;
		},

		checkTicketNumberEntered : function (driver, ticketNumber) {
			return driver.elementByName(ticketNumber).should.exist;
		},

		checkRequestMyCarAlert : function (driver) {
			return driver.elementByName('Please confirm your request for car pickup.').should.exist;
		},

		checkRequestMyCarAlertErrorOccurred : function (driver) {
			return driver.elementByName('Unable to request your car.').should.exist;
		},

		// actions
		clickClose : function (driver) {
			return driver.elementByName('CloseButton').click();
		},

		clickSave : function (driver) {
			return driver.elementByName('Save').click();
		},

		clickCancel : function (driver) {
			return driver.elementByName('Cancel').click();
		},

		clickDone : function (driver) {
			return driver.elementByName('Done').click();
		},

		clickRequestMyCarConfirm : function (driver) {
			return driver.acceptAlert();
		},

		clickRequestMyCarCancel : function (driver) {
			return driver.dismissAlert();
		},

		clickRequestMyCar : function (driver) {
			return driver.elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[2]/UIAButton[1]").click();
		},

		clickRequestMyCarAlertErrorOccurredDismiss : function (driver) {
			return driver.elementByName('OK').click();
		},

		enterTicketNumber : function (driver, ticketNumber) {
			return driver.elementByClassName('UIATextField').sendKeys(ticketNumber);
		}
	};
};

exports.valetPage = new ValetPage();