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

var newUserName = makeid();

describe('CEN3031 login', function() {
    it('should sign up', function() {
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
        element(by.id('buttonCurrent')).click();
        element(by.id('currentTest')).sendKeys('Test');
        element(by.id('username')).sendKeys(newUserName);
        element(by.id('highSchool')).sendKeys('Test');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('permanentAddress')).sendKeys('Test');
        element(by.id('graduationDate')).sendKeys('Test');
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('signup')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /#!/.test(url);
            });
        });

         expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Change to new current page header

    });

    it('should sign out', function(){
        element(by.id('dropdown')).click();
        element(by.id('signout')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /#!/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Start Page

    });

    it('should log in', function() {
        element(by.id('login')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /signin/.test(url);
            });
        });

        element(by.id('username')).sendKeys(newUserName);
        element(by.id('password')).sendKeys('TestTest');
        element(by.model('signin')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /prospective/.test(url); //should be current, address bug
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Current page

    });

    it('should sign out', function(){
        element(by.id('dropdown')).click();
        element(by.id('signout')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /#!/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment'); //Start Page

    });

});
