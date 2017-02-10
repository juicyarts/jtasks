module.exports = {
  'Heimspie Website': function (client) {
    client
      .url('http://www.heimspiel.de')
      .waitForElementVisible('body', 1000)
      .assert.title('HEIM:SPIEL Medien GmbH & Co. KG')
      .end()
  }
}
