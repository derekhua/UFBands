function signout(){
    element(by.id('userDropdown')).click();
    element(by.id('signout')).click();

    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /#!/.test(url);
        });
    });

    expect(browser.getTitle()).toEqual('UF Bands - Member Portal'); //Start Page
}

describe('Admin Testing', function(){
  it('should log in as admin', function(){
       browser.get('http://localhost:3000');
       element(by.id('login')).click();

       browser.driver.wait(function() {
           return browser.driver.getCurrentUrl().then(function(url) {
               return /home/.test(url);
           });
       });

       element(by.id('username')).sendKeys('jwatkins');
       element(by.id('password')).sendKeys('cen3031bandapp');
       element(by.id('signin')).click();

       browser.driver.wait(function() {
           return browser.driver.getCurrentUrl().then(function(url) {
               return /admin/.test(url);
           });
       });
       expect(element(by.id('header')).getText()).toEqual('Hello, Admin');
     });


  it('should be able to view rosters', function(){

    browser.get('http://localhost:3000/#!/admin/rosters');
    expect(element(by.id('header')).getText()).toEqual('Band Rosters');
    element(by.id('backButton')).click();

    browser.driver.wait(function() {
       return browser.driver.getCurrentUrl().then(function(url) {
           return /admin/.test(url);
       });
     });

  });

  it('should be able to view uniforms', function(){

    browser.get('http://localhost:3000/#!/admin/uniforms');
    expect(element(by.id('header')).getText()).toEqual('Uniform Repairs');
    element(by.id('backButton')).click();

    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /admin/.test(url);
          });
      });

    });

  it('should be able to view instruments', function(){

      browser.get('http://localhost:3000/#!/admin/instruments');
      expect(element(by.id('header')).getText()).toEqual('Instrument Repairs');
      element(by.id('backButton')).click();

      browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /admin/.test(url);
          });
        });

      });

  it('should be able to view pending applications', function(){


      element(by.id('listAppButton')).click();

      browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /bandapplications/.test(url);
          });
        });

    });

  it('should be able to edit moderators', function(){

    browser.get('http://localhost:3000/#!/mods/list');

    element(by.id('editButton')).click();
    element(by.id('firstName')).clear();
    element(by.id('firstName')).sendKeys("Blake");
    element(by.id('lastName')).clear();
    element(by.id('lastName')).sendKeys("Garcia");
    element(by.id('username')).clear();
    element(by.id('username')).sendKeys("uni-mod");
    element(by.id('password')).clear();
    element(by.id('password')).sendKeys("Password");
    element(by.id('email')).clear();
    element(by.id('email')).sendKeys("bgg1103@ufl.edu");
    element(by.id('submitButton')).click();

    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
          return /list/.test(url);
        });
      });


  });

  it('should create new music paths', function(){

    browser.get('http://localhost:3000/#!/home/admin');
    element(by.id('createMusicButton')).click();

    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /create/.test(url);
        });
    });

    element(by.id('title')).sendKeys("Title");
    element(by.id('composer')).sendKeys("Composer");
    element.all(by.repeater('instrument in instruments')).click();
    element(by.id('path')).sendKeys("Path");
    element(by.id('submit')).click();

  });

  it('should sign out', function(){
    browser.get('http://localhost:3000/#!/home/admin');
    signout();

  });

});
