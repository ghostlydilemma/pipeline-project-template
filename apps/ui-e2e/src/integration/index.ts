beforeEach(() => {
  cy.visit('/', {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'language', { value: 'en-GB' })
      Object.defineProperty(win.navigator, 'languages', { value: ['en'] })
      Object.defineProperty(win.navigator, 'accept_languages', {
        value: ['en'],
      })
    },
    headers: {
      'Accept-Language': 'en',
    },
  })
})
