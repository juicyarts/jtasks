'use strict'

test('Heimspie Website', function () {
  var driver = createDriver('http://heimspiel.de', '640x480', 'chrome')

  // assign gspecs
  checkLayout(driver, 'test/e2e/galen/specs/heimspiel.gspec')

  // quote driver
  driver.quit()
})
