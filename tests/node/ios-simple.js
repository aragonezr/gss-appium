"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    Q = require('q'),
    serverConfigs = require('./helpers/appium-servers');

describe("ios simple", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.SAUCE ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = _.clone(require("./helpers/caps").ios81);
    desired.app = require("./helpers/apps").guestSelfServiceQA;
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

  function printEnvironmentVariables() {

    console.log();
    console.log("This is the environment you are trying to run:");
    var pointingToSauce = "no";
    if (process.env.SAUCE) {
      pointingToSauce = "yes";
    }
    console.log("    Using Sauce servers: " + pointingToSauce);
    console.log("    Configuration for simulator: " + JSON.stringify(_.clone(require("./helpers/caps").ios81)));
    if (process.env.DEV) {
      console.log("    Using Env: Dev");
    } else {
      console.log("    Using Env: Other");
    }
    console.log("    Pulling app from: " + require("./helpers/apps").guestSelfServiceQA);
    console.log();
  }

  it("run this", function () {
    return driver
      .resolve(printEnvironmentVariables()).then(function () {
        return driver;
      });
  });

});
