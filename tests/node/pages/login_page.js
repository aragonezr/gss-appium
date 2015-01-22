"use strict";

exports.assert = function (driver) {
	return driver.elementByName('My Stay').should.eventually.exist;
};

exports.fillUsername = function (driver, username) {
	return driver.elementByClassName('UIATextField').click().then(function (el) {
	  return el.type(username);
	});
};

exports.fillPassword = function (driver, password) {
	return driver.elementByClassName('UIASecureTextField').click().then(function (el) {
	  return el.type(password);
	});
};

exports.clickSignIn = function (driver) {
	return driver.elementByName('Sign In').click();
};