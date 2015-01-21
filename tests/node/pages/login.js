"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    Q = require('q'),
    serverConfigs = require('../helpers/appium-servers');

describe("ios simple", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.SAUCE ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("../helpers/logging").configure(driver);

    var desired = _.clone(require("../helpers/caps").ios81);
    desired.app = require("../helpers/apps").guestSelfServiceQA;
    if (process.env.SAUCE) {
      desired.name = 'ios - simple';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.SAUCE) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  function populate() {
    var xpaths = [
      '//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[2]/UIATextField[1]',
      '//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[3]/UIASecureTextField[1]'
    ];
    var i=0;
    var seq = _(xpaths).map(function (value) {
      return function () {
        return driver.elementByXPath(value).click().then(function (el) {
          return el.type('011').then(function () { });
        }).then(function () { });
      };
    });
    return seq.reduce(Q.when, new Q(0));
  }

  it("should login succesfully", function () {
    return driver
      .resolve(populate()).then(function () {
        return driver.
          elementByAccessibilityId('Sign In')
            .click().sleep(5000);
      });
  });

});
