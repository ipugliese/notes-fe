describe('Note app', function() {
  beforeEach(function() {
    // Delete all records from database
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    let user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'Salainen.1'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    user = {
      name: 'Stella Pugliese',
      username: 'stella',
      password: 'S4!ainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    user = {
      name: 'Ivan Pugliese',
      username: 'ivan',
      password: 'a!23A56x'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user) 
    // a baseUrl was defined in cypress.config.js with value 'http://localhost:3000'
    cy.visit('')
  })

  describe('when starting', function() {
    it('front page can be opened', function() {
      cy.contains('Notes')
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })
  
    it('login form can be opened', function() {
      cy.contains('login').click()
      cy.get('#username').type('stella')
      cy.get('#password').type('S4!ainen')
      cy.get('#login-button').click()
      cy.contains('Logged')
      cy.contains('User: Stella Pugliese')
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.contains('Wrong credentials')
      cy.get('.error').contains('Wrong credentials')
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Logged')
    })
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ivan', password: 'a!23A56x' })
    })

    it('a new (not important) note can be created', function() {
      // I had to create an id on the new note button because I had notes that included the phrase "New note..." in their content
      cy.get('#new-note-togglable-button').click()
      cy.get('#contentNote').type('a note created by cypress', {timeout: 1000})
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and when a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })

  })
})