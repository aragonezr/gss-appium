"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('../helpers/appium-servers');

// pages
var loginPage = require("../pages/login_page").loginPage;
var checkInPage = require("../pages/checkin_page").checkInPage;
var homePage = require("../pages/home_page").homePage;
var valetPage = require("../pages/valet_page").valetPage;

describe("Testing Valet flow", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  // login assertions/actions
  var loginPageAssert;
  var loginFillUsername;
  var loginFillPassword;
  var loginClickSignIn;
  // home assertions/actions
  var homePageAssert;
  var homeCheckInIsShown;
  var homeRoomKeyIsShown;
  var homeClickMenu;
  var homeClickSignOut;
  var homeClickValet;
  // check-in assertions/actions
  var checkInAssert;
  var checkInClickClose;
  var checkInClickCheckIn;
  var checkInClickReadMore;
  // Valet assertions/actions
  var valetAssert;
  var valetCheckTicketNumberEntered;
  var valetCheckRequestMyCarAlert;
  var valetCheckRequestMyCarAlertErrorOccurred;
  var valetClickClose;
  var valetClickSave;
  var valetClickCancel;
  var valetClickDone;
  var valetClickRequestMyCarConfirm;
  var valetClickRequestMyCarCancel;
  var valetClickRequestMyCar;
  var valetClickRequestMyCarAlertErrorOccurredDismiss;
  var valetEnterTicketNumber;

  // credentials
  var username = '011';
  var password = 'whatever';

  function initializePageMethods () {
    // Init assertions/actions 
    // login
    loginPageAssert       = _.partial(loginPage.assert, driver);
    loginFillUsername     = _.partial(loginPage.fillUsername, driver);
    loginFillPassword     = _.partial(loginPage.fillPassword, driver);
    loginClickSignIn      = _.partial(loginPage.clickSignIn, driver);
    // home
    homePageAssert        = _.partial(homePage.assert, driver);
    homeCheckInIsShown    = _.partial(homePage.checkInIsShown, driver);
    homeRoomKeyIsShown    = _.partial(homePage.roomKeyIsShown, driver);
    homeClickMenu         = _.partial(homePage.clickMenu, driver);
    homeClickSignOut      = _.partial(homePage.clickSignOut, driver);
    homeClickValet        = _.partial(homePage.clickValet, driver);
    // check-in
    checkInAssert         = _.partial(checkInPage.assert, driver);
    checkInClickClose     = _.partial(checkInPage.clickClose, driver);
    checkInClickCheckIn   = _.partial(checkInPage.clickCheckIn, driver);
    checkInClickReadMore  = _.partial(checkInPage.clickReadMore, driver);
    // Valet assertions/actions
    valetAssert                                       = _.partial(valetPage.assert, driver);
    valetCheckTicketNumberEntered                     = _.partial(valetPage.checkTicketNumberEntered, driver);
    valetCheckRequestMyCarAlert                       = _.partial(valetPage.checkRequestMyCarAlert, driver);
    valetCheckRequestMyCarAlertErrorOccurred          = _.partial(valetPage.checkRequestMyCarAlertErrorOccurred, driver);
    valetClickClose                                   = _.partial(valetPage.clickClose, driver);
    valetClickSave                                    = _.partial(valetPage.clickSave, driver);
    valetClickCancel                                  = _.partial(valetPage.clickCancel, driver);
    valetClickDone                                    = _.partial(valetPage.clickDone, driver);
    valetClickRequestMyCarConfirm                     = _.partial(valetPage.clickRequestMyCarConfirm, driver);
    valetClickRequestMyCarCancel                      = _.partial(valetPage.clickRequestMyCarCancel, driver);
    valetClickRequestMyCar                            = _.partial(valetPage.clickRequestMyCar, driver);
    valetClickRequestMyCarAlertErrorOccurredDismiss   = _.partial(valetPage.clickRequestMyCarAlertErrorOccurredDismiss, driver);
    valetEnterTicketNumber                            = _.partial(valetPage.enterTicketNumber, driver);
  }

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

  describe("From login screen", function () {

      beforeEach('logs in and dismiss check-in modal', function () {

        initializePageMethods();

        return driver.chain().then(function () {
            return loginPageAssert()
          })
          .then(function () {
            return loginFillUsername(username)
          })
          .then(function () {
            return loginFillPassword(password)
          })
          .then(function () {
            return loginClickSignIn().sleep(3000)
          })
          .then(function () {
            return checkInAssert()
          }).then(function () {
            return checkInClickClose().sleep(1000)
          });
      });

      afterEach('logs out from home screen', function () {
        return driver.chain().then(function () {
            return homePageAssert()
          }).then(function () {
            return homeClickMenu().sleep(1000)
          })
          .then(function () {
            return homeClickSignOut().sleep(3000)
          })
          .then(function () {
            return loginPageAssert()
          });
      });

      describe("Enter Valet Service from home", function () {
        beforeEach("Click Valet", function () {
          return driver.chain().then(function () {
            return homePageAssert();
          })
          .then(function () {
            return homeClickValet().sleep(3000);
          })
          .then(function () {
            return valetAssert();
          });
        });

        afterEach("going back home", function () {
          return driver.chain().then(function () {
            return valetClickClose();
          })
          .then(function () {
            return homePageAssert();
          });
        });

        it("Save it and request car", function() {
          var ticketNumber = '123';
          return driver.chain().then(function () {
            return valetEnterTicketNumber(ticketNumber);
          })
          .then(function () {
            return valetClickSave().sleep(3000);
          })
          .then(function () {
            return valetAssert();
          })
          .then(function () {
            return valetCheckTicketNumberEntered(ticketNumber);
          })
          .then(function () {
            return valetClickRequestMyCar();
          })
          .then(function () {
            return valetCheckRequestMyCarAlertErrorOccurred();
          })
          .then(function () {
            return valetClickRequestMyCarConfirm().sleep(3000);
          })
          .then(function () {
            return valetAssert();
          })
          .then(function () {
            return valetCheckTicketNumberEntered(ticketNumber);
          });
        });

        // it("Cancel it", function() {

        // });

        // it("Close it", function() {

        // });

      });

  });

});
