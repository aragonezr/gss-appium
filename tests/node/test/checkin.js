"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('../helpers/appium-servers');

// pages
var loginPage = require("../pages/login_page");
var checkInPage = require("../pages/checkin_page");
var homePage = require("../pages/home_page");
var roomDescPage = require("../pages/room_desc_page");
var checkInNowPage = require("../pages/checkin_now_page");
var roomKeyPage = require("../pages/room_key_page");

describe("Testing Check-In flow", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;
  var page;

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

      beforeEach('logs in', function () {
        return driver.chain().then(function () {
            return loginPage.assert(driver)
          })
          .then(function () {
            return loginPage.fillUsername(driver, "011")
          })
          .then(function () {
            return loginPage.fillPassword(driver, "011")
          })
          .then(function () {
            return loginPage.clickSignIn(driver).sleep(3000)
          });
      });

      afterEach('logs out from home screen', function () {
        return driver.chain().then(function () {
            return homePage.assert(driver)
          }).then(function () {
            return homePage.clickMenu(driver).sleep(1000)
          })
          .then(function () {
            return homePage.clickSignOut(driver).sleep(3000)
          })
          .then(function () {
            return loginPage.assert(driver)
          });
      });

      it("Dismiss check-in", function () {
        return driver.chain().then(function () {
            return checkInPage.assert(driver)
          }).then(function () {
            return checkInPage.clickClose(driver).sleep(1000)
          });
      });

      it("Click Check-In Now then cancel", function () {
        return driver.chain().then(function () {
            return checkInPage.assert(driver)
          }).then(function () {
            return checkInPage.clickCheckIn(driver).sleep(1000)
          }).then(function () {
            return checkInNowPage.assert(driver)
          })
          .then(function () {
            return checkInNowPage.clickCancel(driver).sleep(1000)
          })
          .then(function () {
            return checkInPage.assert(driver)
          })
          .then(function () {
            return checkInPage.clickClose(driver).sleep(1000)
          })
          .then(function () {
            return homePage.checkInIsShown(driver).sleep(1000)
          });
      });

      it("Click Check-In Now and click Done", function () {
        return driver.chain().then(function () {
            return checkInPage.assert(driver);
          }).then(function () {
            return checkInPage.clickCheckIn(driver).sleep(1000);
          }).then(function () {
            return checkInNowPage.assert(driver);
          })
          .then(function () {
            return checkInNowPage.clickYes(driver).sleep(1000);
          })
          .then(function () {
            return roomKeyPage.assert(driver);
          })
          .then(function () {
            return roomKeyPage.confirmation(driver);
          })
          .then(function () {
            return roomKeyPage.clickDone(driver).sleep(1000);
          })
          .then(function () {
            return homePage.assert(driver).sleep(1000);
          })
          .then(function () {
            return homePage.roomKeyIsShown(driver);
          });
      });

      it("Click Check-In Now and click Close", function () {
        return driver.chain().then(function () {
            return checkInPage.assert(driver);
          }).then(function () {
            return checkInPage.clickCheckIn(driver).sleep(1000);
          }).then(function () {
            return checkInNowPage.assert(driver);
          })
          .then(function () {
            return checkInNowPage.clickYes(driver).sleep(1000);
          })
          .then(function () {
            return roomKeyPage.assert(driver);
          })
          .then(function () {
            return roomKeyPage.confirmation(driver);
          })
          .then(function () {
            return roomKeyPage.clickClose(driver).sleep(1000);
          })
          .then(function () {
            return homePage.assert(driver).sleep(1000);
          })
          .then(function () {
            return homePage.roomKeyIsShown(driver);
          });
      });

      it("Click Read More", function () {
        return driver.chain().then(function () {
            return checkInPage.assert(driver)
          }).then(function () {
            return checkInPage.clickReadMore(driver).sleep(1000)
          })
          .then(function () {
            return roomDescPage.assert(driver);
          })
          .then(function () {
            return roomDescPage.clickBack(driver).sleep(1000);
          })
          .then(function () {
            return checkInPage.assert(driver);
          })
          .then(function () {
            return checkInPage.clickClose(driver).sleep(1000)
          });
      });

  });

});
