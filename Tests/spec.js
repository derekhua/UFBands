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
        element(by.id('nickName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('gatorlink')).sendKeys('test@ufl.edu');
        element(by.id('buttonProspective')).click();
        //element(by.id('instrument')).sendKeys('Trombone');
        element(by.id('primary')).click();
        element.all(by.repeater('instruments in instruments')).click();
        element(by.id('primaryYears')).sendKeys('Test');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('highSchool')).sendKeys('Test');
        element(by.id('username')).sendKeys(newUserNameProspective);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('permanentLine1')).sendKeys('Test');
        element(by.id('permanentLine2')).sendKeys('Test');
        element(by.id('permanentCity')).sendKeys('Test');
        element(by.id('permanentState')).sendKeys('Fl');
        element(by.id('permanentZip')).sendKeys('32611');
        element(by.id('localLine1')).sendKeys('Test');
        element(by.id('localLine2')).sendKeys('Test');
        element(by.id('localCity')).sendKeys('Test');
        element(by.id('localState')).sendKeys('Fl');
        element(by.id('localZip')).sendKeys('32611');
        element(by.id('major')).sendKeys('Test');
        element(by.id('class')).sendKeys('Test');
        element(by.id('year')).sendKeys('Test');
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
        element(by.id('nickName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('gatorlink')).sendKeys('test@ufl.edu');
        element(by.id('buttonCurrent')).click();
        //element(by.id('instrument')).sendKeys('Trombone');
        element(by.id('primary')).click();
        element.all(by.repeater('instruments in instruments')).click();
        element(by.id('primaryYears')).sendKeys('Test');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('highSchool')).sendKeys('Test');
        element(by.id('username')).sendKeys(newUserNameCurrent);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('permanentLine1')).sendKeys('Test');
        element(by.id('permanentLine2')).sendKeys('Test');
        element(by.id('permanentCity')).sendKeys('Test');
        element(by.id('permanentState')).sendKeys('Fl');
        element(by.id('permanentZip')).sendKeys('32611');
        element(by.id('localLine1')).sendKeys('Test');
        element(by.id('localLine2')).sendKeys('Test');
        element(by.id('localCity')).sendKeys('Test');
        element(by.id('localState')).sendKeys('Fl');
        element(by.id('localZip')).sendKeys('32611');
        element(by.id('major')).sendKeys('Test');
        element(by.id('class')).sendKeys('Test');
        element(by.id('year')).sendKeys('Test');
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
        element(by.id('nickName')).sendKeys('Test');
        element(by.id('email')).sendKeys('test@test.com');
        element(by.id('gatorlink')).sendKeys('test@ufl.edu');
        element(by.id('buttonAlumni')).click();
        //element(by.id('instrument')).sendKeys('Trombone');
        element(by.id('primary')).click();
        element.all(by.repeater('instruments in instruments')).click();
        element(by.id('primaryYears')).sendKeys('Test');
        element(by.id('phoneNumber')).sendKeys('Test');
        element(by.id('highSchool')).sendKeys('Test');
        element(by.id('username')).sendKeys(newUserNameAlumni);
        element(by.id('password')).sendKeys('TestTest');
        element(by.id('permanentLine1')).sendKeys('Test');
        element(by.id('permanentLine2')).sendKeys('Test');
        element(by.id('permanentCity')).sendKeys('Test');
        element(by.id('permanentState')).sendKeys('Fl');
        element(by.id('permanentZip')).sendKeys('32611');
        element(by.id('localLine1')).sendKeys('Test');
        element(by.id('localLine2')).sendKeys('Test');
        element(by.id('localCity')).sendKeys('Test');
        element(by.id('localState')).sendKeys('Fl');
        element(by.id('localZip')).sendKeys('32611');
        element(by.id('major')).sendKeys('Test');
        element(by.id('class')).sendKeys('Test');
        element(by.id('year')).sendKeys('Test');
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
