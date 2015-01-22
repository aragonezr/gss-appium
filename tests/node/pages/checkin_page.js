"use strict";

var xpathReadMore = '//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[2]/UIAButton[1]';

exports.assert = function (driver) {
	return driver.elementByName('Check-in').should.eventually.exist;
};

exports.clickClose = function (driver) {
	return driver.elementByName('CloseButton').click();
};

exports.clickCheckIn = function (driver) {
	return driver.elementByName('Check-in Now').click();
};

exports.clickReadMore = function (driver) {
  return driver.elementByXPath(xpathReadMore).click();
};