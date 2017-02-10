describe('Heimspiel Website', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true
  })
  it('should have a title', function () {
    browser.get('http://www.heimspiel.de')
    expect(browser.getTitle()).toEqual('HEIM:SPIEL Medien GmbH & Co. KG')
  })
})
