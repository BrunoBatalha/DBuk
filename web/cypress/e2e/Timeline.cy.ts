import { passRegisterPage } from '../helpers/register-helper';

describe('Timeline', () => {
  it('Should be like post', () => {
    cy.intercept({ method: 'POST', url: /react-post/ }, {}).as('request-react-post');
    cy.intercept({ method: 'GET', url: /(posts)*(perPage=5)*(page=0)/ }, { fixture: 'get-posts-page-1' });

    passRegisterPage();

    cy.get('[data-testId=btn-like]').first().click();
    cy.get('@request-react-post.all').should('have.length', 1);
  });

  it('Should list posts and scroll to bottom to load many posts', () => {
    cy.intercept({ method: 'GET', url: /(posts)*(perPage=5)*(page=0)/ }, { fixture: 'get-posts-page-1' });
    cy.intercept({ method: 'GET', url: /(posts)*(perPage=5)*(page=1)/ }, { fixture: 'get-posts-page-2' });

    passRegisterPage();

    cy.get('[data-testid=section-post').should('have.length', 5);
    cy.get('[data-testid=container-posts]').scrollTo('bottom');
    cy.get('[data-testid=section-post').should('have.length', 7);
  });
});
