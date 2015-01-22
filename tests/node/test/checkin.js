"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('../helpers/appium-servers');

// pages
var loginPage = require("../pages/login_page").loginPage;
var checkInPage = require("../pages/checkin_page").checkInPage;
var homePage = require("../pages/home_page").homePage;
var roomDescPage = require("../pages/room_desc_page").roomDescPage;
var checkInNowPage = require("../pages/checkin_now_page").checkInNowPage;
var roomKeyPage = require("../pages/room_key_page").roomKeyPage;

describe("Testing Check-In flow", function () {
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
  // check-in now assertions/actions
  var checkInNowAssert;
  var checkInNowClickYes;
  var checkInNowClickCancel;
  // Room Description assertions/actions
  var roomDescAssert;
  var roomDescClickBack;
  // Room Key assertions/actions
  var roomKeyPageAssert;
  var roomKeyPageConfirmation;
  var roomKeyPageClickDone;
  var roomKeyPageClickClose;

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
    // check-in now assertions/actions
    checkInNowAssert      = _.partial(checkInNowPage.assert, driver);
    checkInNowClickYes    = _.partial(checkInNowPage.clickYes, driver);
    checkInNowClickCancel = _.partial(checkInNowPage.clickCancel, driver);
    // Room description assertions/actions
    roomDescAssert        = _.partial(roomDescPage.assert, driver);
    roomDescClickBack     = _.partial(roomDescPage.clickBack, driver);
    // Room Key assertions/actions
    roomKeyPageAssert         = _.partial(roomKeyPage.assert, driver);
    roomKeyPageConfirmation   = _.partial(roomKeyPage.confirmation, driver);
    roomKeyPageClickDone      = _.partial(roomKeyPage.clickDone, driver);
    roomKeyPageClickClose     = _.partial(roomKeyPage.clickClose, driver);
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

      beforeEach('logs in ', function () {

        initializePageMethods();

        return driver.chain().then(function () {
            return loginPageAssert();
          })
          .then(function () {
            return loginFillUsername(username)
          })
          .then(function () {
            return loginFillPassword(password)
          })
          .then(function () {
            return loginClickSignIn().sleep(3000)
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

      it("Dismiss check-in", function () {
        return driver.chain().then(function () {
            return checkInAssert()
          }).then(function () {
            return checkInClickClose().sleep(1000)
          });
      });

      it("Click Check-In Now then cancel", function () {
        return driver.chain().then(function () {
            return checkInAssert()
          }).then(function () {
            return checkInClickCheckIn().sleep(1000)
          }).then(function () {
            return checkInNowAssert()
          })
          .then(function () {
            return checkInNowClickCancel().sleep(1000)
          })
          .then(function () {
            return checkInAssert()
          })
          .then(function () {
            return checkInClickClose().sleep(1000)
          })
          .then(function () {
            return homeCheckInIsShown().sleep(1000)
          });
      });

      it("Click Check-In Now and click Done", function () {
        return driver.chain().then(function () {
            return checkInAssert();
          }).then(function () {
            return checkInClickCheckIn().sleep(1000);
          }).then(function () {
            return checkInNowAssert();
          })
          .then(function () {
            return checkInNowClickYes().sleep(1000);
          })
          .then(function () {
            return roomKeyPageAssert();
          })
          .then(function () {
            return roomKeyPageConfirmation();
          })
          .then(function () {
            return roomKeyPageClickDone().sleep(1000);
          })
          .then(function () {
            return homePageAssert().sleep(1000);
          })
          .then(function () {
            return homeRoomKeyIsShown();
          });
      });

      it("Click Check-In Now and click Close", function () {
        return driver.chain().then(function () {
            return checkInAssert();
          }).then(function () {
            return checkInClickCheckIn().sleep(3000);
          }).then(function () {
            return checkInNowAssert();
          })
          .then(function () {
            return checkInNowClickYes().sleep(1000);
          })
          .then(function () {
            return roomKeyPageAssert();
          })
          .then(function () {
            return roomKeyPageConfirmation();
          })
          .then(function () {
            return roomKeyPageClickClose().sleep(1000);
          })
          .then(function () {
            return homePageAssert().sleep(1000);
          })
          .then(function () {
            return homeRoomKeyIsShown();
          });
      });

      it("Click Read More", function () {
        return driver.chain().then(function () {
            return checkInAssert()
          }).then(function () {
            return checkInClickReadMore().sleep(1000)
          })
          .then(function () {
            return roomDescAssert();
          })
          .then(function () {
            return roomDescClickBack().sleep(1000);
          })
          .then(function () {
            return checkInAssert();
          })
          .then(function () {
            return checkInClickClose().sleep(1000)
          });
      });

  });

});
