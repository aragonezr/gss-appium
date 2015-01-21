#Node.js samples

## prerequisites

Upgrade Mocha to the latest version:

```
npm install -g -f mocha
```

Install local packages:

```
npm install
```

### to run tests locally

Install appium and start the appium server for your device, please refer to:

- http://appium.io
- https://github.com/appium/appium/blob/master/README.md

Install appium via node
$ npm install -g appium

Start the Appium
$ appium & (node .      Still figuring out why this one doesn't work)

##### Build gss-app Xcode project in order to get the .app that your tests will use

Go to TestApp folder (gss-appium/tests/node/apps/TestApp)
xcodebuild -sdk iphonesimulator -workspace /Users/2008322/Documents/slalom/gss-app/GuestSelfService.xcworkspace -scheme GuestSelfServiceQA SYMROOT=$(PWD)/build

This creates a build/Release-iphonesimulator directory in your within gss-appium/ that contains the .app package that you'll need to communicate with the Appium server.

###### to run tests using Sauce Labs cloud

[Sign up here](https://saucelabs.com/signup/trial)

Add environment variables
```
export SAUCE_USERNAME=<SAUCE_USERNAME>
export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>
```

###### Run a simple test to make sure your enviroment is all set.

Add environment variables
```
export DEV=true
```

mocha ios-simple.js

#### Reference
- https://github.com/admc/wd
- https://github.com/appium/appium/blob/master/README.md