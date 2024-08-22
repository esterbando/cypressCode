import IClauses from './interface/IClauses';
import templateEditor from '../../e2e/models/templateEditor';
import documentEditor from '../../e2e/models/documentEditor';

class Clauses extends IClauses {

    getClauseInJQuery(templateId, clause) {
        return Cypress.$(`[id="document-${templateId}"]`)
            .find(`[data-cy=${clause}]`).length;
    };

    selectClause(articleIndex, clauseIndex) {
        templateEditor.article()
            .eq(articleIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                templateEditor.btnEditClause()
                    .eq(clauseIndex)
                    .click({force: true});
            });
    };

    selectArticle(index) {
        templateEditor.article()
            .eq(index)
            .within(() => {
                templateEditor.btnEditClause()
                    .first()
                    .click({force: true});
            });
    };

    /**
     * Methods in Document Editor
     */

    clausesQuantity(templateId, clause, numOfClauses) {
        cy.wait(500).then(() => {
            expect(this.getClauseInJQuery(templateId, clause)).to.eq(numOfClauses);
        });
    };

    clausesQuantityByText(templateId, clause, numOfClauses, text) {
        documentEditor.docPart(templateId)
            .find(`[data-cy="${clause}"]`)
            .filter(`:contains(${text})`)
            .should('have.length', `${numOfClauses}`);
    };

    checkClause(templateID, clause, index, text, visibility = true, numVisibility = false, numbering = '') {
        documentEditor.docPart(templateID)
            .within(() => {
                if (visibility) {
                    documentEditor.clause(clause)
                        .eq(index)
                        .contains(text)
                        .should('exist')
                        .should('be.visible');
                    this.checkNumbering(numVisibility, numbering, clause, text);
                } else {
                    cy.wait(500).then(() => {
                        expect(Cypress.$(`[data-cy=${clause}]`)
                            .eq(index)
                            .find(`:contains(${text})`).length)
                            .to.eq(0);
                    });
                }
            });
    };

    checkNumbering(visibility = true, numbering = '1', clause, clauseText) {
        if (visibility) {
            documentEditor.clauseByText(clause, clauseText)
                .within(() => {
                    documentEditor.numbering()
                        .find('span')
                        .should('have.text', numbering)
                        .should('exist')
                        .should('be.visible');
                });
        } else {
            documentEditor.clauseByText(clause, clauseText)
                .within(() => {
                    documentEditor.numbering()
                        .should('not.exist');
                });
        }
    };

    changeClauseVisibility(templateID, clause, clauseText) {
        documentEditor.docPart(templateID).within(() => {
            documentEditor.clauseByText(clause, clauseText).within(() => {
                documentEditor.iconEyeVisibility()
                    .click()
                    .wait(3000);
            });
        });
    };
}

module.exports = new Clauses();