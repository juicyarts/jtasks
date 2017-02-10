this.HeimspielPage = function (driver) {
  GalenPages.extendPage(this, driver, {
    wrapper: '#bg-two',
    frame: '#frame',
    load: function () {
      this.open('http://heimspiel.de')
      return this.waitForIt()
    }
  })
}
