/**
 * Created by Gio on 2/23/2015.
 */
// spec.js
describe('angularjs homepage', function() {
    it('should have a title', function() {
        browser.get('http://localhost:3000/#!/signin');

        expect(browser.getTitle()).toEqual('CEN3031Project - Development Environment');
        element(by.id('username')).sendKeys('g.delatorre');
        element(by.id('password')).sendKeys('spy00g11');
        element(by.model('signin')).click();
    });
});