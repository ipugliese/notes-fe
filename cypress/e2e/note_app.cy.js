describe('Note app', function() {
  beforeEach(function() {
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
  })
})