import { faker } from '@faker-js/faker';

type Credentials = {
  username?: string;
  password?: string;
};

export function passRegisterPage(credentials: Credentials = {}) {
  cy.intercept({ method: 'POST', url: /users$/ }, {});

  cy.visit('register');
  cy.get('[data-testid=input-username]').type(credentials.username || faker.name.firstName());
  cy.get('[data-testid=input-password]').type(credentials.password || faker.name.firstName());
  cy.get('[data-testid=btn-submit]').click();
}
