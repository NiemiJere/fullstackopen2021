describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Mattson',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Please log in to the application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
  
      cy.contains('Matti Mattson logged in')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()
  
      cy.contains('Password or username is wrong')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('testiposti')
      cy.get('#author').type('testaajakalle')
      cy.get('#url').type('testiposti.fi')
      cy.contains('save').click()
      cy.contains('testiposti')
      cy.contains('testaajakalle')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('testiposti')
      cy.get('#author').type('testaajakalle')
      cy.get('#url').type('testiposti.fi')
      cy.contains('save').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('testiposti')
      cy.get('#author').type('testaajakalle')
      cy.get('#url').type('testiposti.fi')
      cy.contains('save').click()
      cy.contains('Delete').click()
      cy.should('not.contain', 'testaajakalle')
    })
  })

  

})