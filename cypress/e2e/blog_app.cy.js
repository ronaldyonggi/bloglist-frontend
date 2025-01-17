describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`,)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    const otherUser = {
      name: 'Another User',
      username: 'other',
      password: 'abc123',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, otherUser)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('button','log in').click()
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('button','log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('button', 'log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      // Ensures error is displayed in red
      // cy.contains('Wrong username or password')
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      // Ensure user log in message is not displayed
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'mluukkai',
        password: 'salainen'
      })

    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[data-cy="input-title"]').type('A blog created by cypress')
      cy.get('[data-cy="input-author"]').type('Cypress')
      cy.get('[data-cy="input-url"]').type('www.cypress.io')

      cy.get('[data-cy="button-create"]').click()
      cy.contains('A blog created by cypress')
    })

    it('User can like a blog', function() {
      cy.createBlog({
        title: 'A blog created by cypress',
        author: 'Cypress',
        url: 'www.cypress.io'
      })

      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it('User who created a blog can delete it', function() {
      cy.createBlog({
        title: 'A blog created by cypress',
        author: 'Cypress',
        url: 'www.cypress.io'
      })

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('html').should('not.contain', 'A blog created by cypress')
    })

    it('Only the creator can see delete button of a blog', function() {
      cy.createBlog({
        title: 'A blog created by cypress',
        author: 'Cypress',
        url: 'www.cypress.io'
      })

      cy.contains('logout').click()
      cy.login({
        username: 'other',
        password: 'abc123'
      })

      cy.contains('view').click()

      cy.contains('remove').should('not.exist')

    })

    it.only('Blogs are ordered according to likes', function() {
      cy.createBlog({
        title: 'How to create a test',
        author: 'Dan Brown',
        url: 'www.dantest.com',
        likes: 395
      })

      cy.createBlog({
        title: 'Is this how it all started?',
        author: 'Cindy Gallan',
        url: 'www.dcind.io',
        likes: 184
      })

      cy.createBlog({
        title: 'Heyo',
        author: 'Anonymous',
        url: 'www.hacker.io',
        likes: 8
      })

      cy.get('.blog').eq(0).should('contain', 'How to create a test')
      cy.get('.blog').eq(1).should('contain', 'Is this how it all started?')

    })

  })

})