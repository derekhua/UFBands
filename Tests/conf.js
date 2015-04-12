/**
 * Created by Gio on 2/23/2015.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
      'prospectiveTests.js',
      'currentTests.js',
      'alumniTests.js',
      'adminTests.js'
    ]
}
