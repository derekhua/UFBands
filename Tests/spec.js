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
var randomText = makeid();

describe('CEN3031 Testing', function() {
/*    it('should sign up prospective member', function() {
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

    it('should sign up curren member', function() {
//        browser.get('http://localhost:3000');
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

    it('should sign up alumni member', function() {
//        browser.get('http://localhost:3000');
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
    });*/

    it('should log in', function() {
        browser.get('http://localhost:3000');
        element(by.id('login')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /signin/.test(url);
            });
        });

        element(by.id('username')).sendKeys('giodelatorre1');
        element(by.id('password')).sendKeys('spy00g11');
        element(by.id('signin')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /prospective/.test(url);
            });
        });

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment');
    });

/*    it('should apply for bands', function() {
        element(by.id('applyButton')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /bands/.test(url);
            });
        });

        element(by.id('bandButton')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /create/.test(url);
            });
        });

        element(by.id('marchingBand')).click();
        element.all(by.repeater('instruments in instruments')).click();
        element(by.id('secondaryYears')).sendKeys('5');
        element.all(by.repeater('status in status')).click();
        element(by.id('mbWeight')).sendKeys('50');
        //element.all(by.repeater('size in size')).click();
        element(by.id('submitButton')).click();


        });

      it('should send in uniform repairs', function(){
        browser.get('http://localhost:3000/#!/home/prospective');

        element(by.id('repairDropdown')).click();
        element(by.id('uniformRepair')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /uniform/.test(url);
            });
        });

        element(by.id('uniformID')).sendKeys('TestID');
        element(by.id('description')).sendKeys('Uniform Smells Bad');
        element(by.id('submit')).click();  //How to deal with alert??

      });


      it('should send in uniform repairs', function(){
        browser.get('http://localhost:3000/#!/home/prospective');

        element(by.id('repairDropdown')).click();
        element(by.id('instrumentRepair')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /instrument/.test(url);
            });
        });

        element.all(by.repeater('instruments in instruments')).click();
        element(by.id('instrumentID')).sendKeys('TestID');
        element(by.id('description')).sendKeys('Uniform Smells Bad'); //How to deal with alert?
        element(by.id('submit')).click();

      }); */

      it('should edit profile information', function(){
        browser.get('http://localhost:3000/#!/home/prospective');

        element(by.id('userDropdown')).click();
        element(by.id('viewProfile')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /profile/.test(url);
            });
        });

        element(by.id('editToggle')).click();
        element(by.id('nickName')).clear();
        element(by.id('nickName')).sendKeys('New Nickname');
        element(by.id('major')).clear();
        element(by.id('major')).sendKeys('New Major')
        element(by.id('update')).click();
        element(by.id('reloadPage')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /profile/.test(url);
            });
        });

      });

    });
