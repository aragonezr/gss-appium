"use strict";

var LoginPage = function() {

	return {
		// assertions
		assert : function(driver) {
			return driver.elementByName('My Stay').should.eventually.exist;
		},

		// actions
		fillUsername : function (driver, username) {
			return driver.elementByClassName('UIATextField').click().then(function (el) {
			  return el.sendKeys(username);
			});
		},

		fillPassword : function (driver, password) {
			return driver.elementByClassName('UIASecureTextField').click().then(function (el) {
			  return el.sendKeys(password);
			});
		},

		clickSignIn : function(driver, clickSignIn) {
			return driver.elementByName('Sign In').click();
		}
	};
};

exports.loginPage = new LoginPage();