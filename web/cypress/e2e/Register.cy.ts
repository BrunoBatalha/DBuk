import { faker } from '@faker-js/faker';
import { passRegisterPage } from '../helpers/register-helper';

describe('Register', () => {
  it('Should be redirect to register path', () => {
    cy.visit('');
    cy.location('pathname').should('match', /\/register$/);
  });

  it('Should be disabled submit button if empty any fields', () => {
    cy.visit('register');
    cy.get('[data-testid=btn-submit]').should('be.disabled');
  });

  it('Should be redirect to path root after register', () => {
    passRegisterPage();
    cy.location('pathname').should('eq', '/');
  });

  it('Should be save credentials in storage', () => {
    const credentials = {
      username: faker.name.firstName(),
      password: faker.name.firstName()
    };
    passRegisterPage(credentials);

    cy.window().then((window) => {
      const usernameStorage = window.localStorage.getItem('username');
      const passwordStorage = window.localStorage.getItem('password');

      expect(usernameStorage).to.eq(credentials.username);
      expect(passwordStorage).to.eq(credentials.password);
    });
  });
});
