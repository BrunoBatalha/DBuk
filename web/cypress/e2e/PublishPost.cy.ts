import { passRegisterPage } from '../helpers/register-helper';

describe('PublishPost', () => {
  beforeEach(() => {
    mockRequests();
    passRegisterPage();
    cy.get('[data-testid=menu-option-publish]').click();
  });

  it('Should be disabled publish button when select categories', () => {
    selectCategories();
    cy.get('[data-testid=btn-submit]').should('be.disabled');
  });

  it('Should be disabled publish button when select file image', () => {
    passSelectFile();
    cy.get('[data-testid=btn-submit]').should('be.disabled');
  });

  it('Should be change pathname', () => {
    cy.location('pathname').should('match', /\/publish-post$/);
  });

  it('Should publish post', () => {
    selectCategories();

    passSelectFile();
    cy.get('[data-testid=btn-submit]').click();

    cy.get('@request-create-post.all').should('have.length', 1);
  });
});

function passSelectFile() {
  cy.get('[data-testid=input-file-upload]').attachFile('image-300x300.png');
  cy.get('[data-testid=btn-save-crop-image]').click();
}

function mockRequests() {
  cy.intercept({ method: 'POST', url: /users$/ }, {});
  cy.intercept({ method: 'GET', url: /(posts)*(perPage=5)*(page=0)/ }, { fixture: 'get-posts-page-1' });
  cy.intercept({ method: 'GET', url: /categories/ }, { fixture: 'get-categories' });
  cy.intercept({ method: 'POST', url: /posts/ }, {}).as('request-create-post');
}

function selectCategories() {
  cy.get('[data-testid=select-category]').click();
  cy.get('[data-testid=select-category-item]').should('have.length', 2);
  cy.get('[data-testid=select-category-item]').first().click();
  cy.get('[data-testid=select-category-item]').last().click();
  cy.get('body').type('{esc}');
}
