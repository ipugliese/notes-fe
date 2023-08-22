describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    let user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'Salainen.1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    user = {
      name: 'Stella Pugliese',
      username: 'stella',
      password: 'S4!ainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    user = {
      name: 'Ivan Pugliese',
      username: 'ivan',
      password: 'a!23A56x'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
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
   })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('ivan')
      cy.get('input:last').type('a!23A56x')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      // I had to create an id on the new note button because I had notes that included the phrase "New note..." in their content
      cy.get('#new-note-togglable-button').click()
      cy.get('#contentNote').type('a note created by cypress', {timeout: 1000})
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('New note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
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