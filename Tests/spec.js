/**
 * Created by Gio on 2/23/2015.
 */
// spec.js

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function signout(){
    element(by.id('userDropdown')).click();
    element(by.id('signout')).click();

    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /#!/.test(url);
        });
    });

    expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Start Page
}

var newUserNameProspective = makeid();
var newUserNameCurrent = makeid();
var newUserNameAlumni = makeid();

describe('CEN3031 login', function() {
    it('should sign up prospective member', function() {
        browser.get('http://localhost:3000');
        element(by.id('signup')).click();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /signup/.test(url);
            });
        });

        element(by.id('firstName')).sendKeys('Test');
        element(by.id('lastName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('buttonProspective')).click();
        element(by.id('username')).sendKeys(newUserNameProspective);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('instrument')).sendKeys('Trombone');
        element(by.id('highSchool')).sendKeys('Test');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('permanentAddress')).sendKeys('Test');
        element(by.id('graduationDate')).sendKeys('Test');
        element(by.id('signup')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /prospective/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Change to new current page header
        signout();
    });

    it('should sign up current member', function() {
        newUserName = makeid();

        element(by.id('signup')).click();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /signup/.test(url);
            });
        });

        element(by.id('firstName')).sendKeys('Test');
        element(by.id('lastName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('buttonCurrent')).click();
        element(by.id('username')).sendKeys(newUserNameCurrent);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('instrument')).sendKeys('Trombone');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('permanentAddress')).sendKeys('Test');
        element(by.id('graduationDate')).sendKeys('Test');
        element(by.id('signup')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /current/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Change to new current page header
        signout();
    });

    it('should sign up alumni member', function() {
         newUserName = makeid();

        element(by.id('signup')).click();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /signup/.test(url);
            });
        });

        element(by.id('firstName')).sendKeys('Test');
        element(by.id('lastName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('buttonAlumni')).click();
        element(by.id('username')).sendKeys(newUserNameAlumni);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('instrument')).sendKeys('Trombone');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('permanentAddress')).sendKeys('Test');
        element(by.id('graduationDate')).sendKeys('Test');
        element(by.id('signup')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /alumni/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Change to new current page header
        signout();
    });

    it('should log in', function() {
        element(by.id('login')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /signin/.test(url);
            });
        });

        element(by.id('username')).sendKeys(newUserNameProspective);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('signin')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /prospective/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Current page
        signout();
    });

});
