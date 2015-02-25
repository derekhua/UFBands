/**
 * Created by Gio on 2/23/2015.
 */
// spec.js
describe('CEN3031 login', function() {
    it('should sign up', function() {
        browser.get('http://localhost:3000');
        element(by.id('signup')).click();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /signup/.test(url);
            });
        });
        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment');
        element(by.id('firstName')).sendKeys('Test');
        element(by.id('lastName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('buttonCurrent')).click();
        element(by.id('currentTest')).sendKeys('Test');
        element(by.id('username')).sendKeys('Test');
        element(by.id('highSchool')).sendKeys('Test');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('permanentAddress')).sendKeys('Test');
        element(by.id('graduationDate')).sendKeys('Test');
        element(by.id('password')).sendKeys('Test');
        element(by.id('signup')).click();
    });

    it('should log in', function() {
        browser.get('http://localhost:3000');
        element(by.id('login')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /signin/.test(url);
            });
        });

        element(by.id('username')).sendKeys('g.delatorre');
        element(by.id('password')).sendKeys('spy00g11');
        element(by.model('signin')).click();

    });


});
