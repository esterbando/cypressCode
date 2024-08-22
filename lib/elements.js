import IElements from './interface/IElements';
import documentEditor from '../../e2e/models/documentEditor';
import templateEditor from '../../e2e/models/templateEditor';

class Elements extends IElements {
    selectElement(element, clause, clauseIndex, elementPos = 0) {
        clause()
            .eq(clauseIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                cy.get('.content-container').eq(clauseIndex).within(() => {
                    element().eq(elementPos).click({force: true});
                });
            });
    };

    selectElements(element, clause, clauseIndex) {
        clause()
            .eq(clauseIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                cy.get('.content-container').first().within(() => {
                    element().click({multiple: true, ctrlKey: true});
                });
            });
    };

    selectAllElements() {
        cy.get('.item-container').click({multiple: true});
    };

    /**
     * methods in Document Editor
     */

    answerQuestion(questionName, option) {
        documentEditor.elQuestionByName(questionName)
            .contains(option)
            .click()
            .wait(5000); //need to reimplement as interception
    };

    checkAnswerQuestion(questionName, optionIndex) {
        documentEditor.elQuestionByName(questionName)
            .find('input')
            .eq(optionIndex)
            .invoke('attr', 'checked')
            .should('equal', 'checked');
    };

    fillOutTextInput(templateID, clauseText, value) {
        documentEditor.docPart(templateID).within(() => {
            cy.get('.paragraph')
                .filter(`:contains(${clauseText})`)
                .find('[data-cy="textInput"]')
                .focus()
                .clear()
                .type(value)
                .blur();
        });
    };

    getTextQuantity(templateID, text) {
        return Cypress.$(`[id="document-${templateID}"]`)
            .find(`:contains(${text})`)
            .filter(function () {
                return Cypress.$(this).text() === text;
            });
    };

    checkQuestionVisibility(templateID, elName, visibility = true) {
        documentEditor.docPart(templateID).within(() => {
            if (visibility) {
                cy.wrap(this.getTextQuantity(templateID, elName))
                    .should('exist')
                    .should('be.visible');
            } else {
                cy.wrap(this.getTextQuantity(templateID, elName))
                    .should('not.exist');
            }
        });
    };

    answerQuestionMultiChoice(docPartId, questionName, options) {
        return documentEditor.docPart(docPartId).within(() => {
            documentEditor.elQuestionByName(questionName).within(() => {
                options.forEach((option) => {
                    documentEditor.questionOptionLabel(option).click();
                });
            });
        });
    };

    chooseQuestionObjectValue(docPartId, questionName, options) {
        return documentEditor.docPart(docPartId).within(() => {
            documentEditor.elQuestionByName(questionName).within(() => {
                documentEditor.questionObjectOptionPicker().click().then(() => {
                    documentEditor.dropdown().should('be.visible').then(() => {
                        options.forEach((option) => {
                            documentEditor.dropdown().within(() => {
                                documentEditor.dropdownItem(option).click({force: true});
                            });
                        });
                        documentEditor.elQuestionByName(questionName).click();
                    });
                });
            });
        });
    };

    selectElementsInClause(articleIndex, clauseIndex) {
        templateEditor.article()
            .eq(articleIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                templateEditor.clauseContent()
                    .eq(clauseIndex)
                    .within(() => {
                        templateEditor.elementContainer().click({multiple: true, ctrlKey: true});
                        templateEditor.elQR().click({multiple: true, ctrlKey: true});
                    });
            });
    };

    selectElementsInTable(articleIndex, clauseIndex, tableIndex = 0) {
        templateEditor.article()
            .eq(articleIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                templateEditor.clauseContent()
                    .eq(clauseIndex)
                    .within(() => {
                        templateEditor.elTable().eq(tableIndex).within(() => {
                            templateEditor.elementContainer().click({multiple: true, ctrlKey: true});
                            templateEditor.elQR().click({multiple: true, ctrlKey: true});
                        });
                    });
            });
    };

    selectTable(articleIndex, clauseIndex, tableIndex = 0) {
        templateEditor.article()
            .eq(articleIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                templateEditor.clauseContent()
                    .eq(clauseIndex)
                    .within(() => {
                        templateEditor.elTable()
                            .eq(tableIndex)
                            .parents('.table-item')
                            .within(() => {
                                templateEditor.btnEditClause()
                                    .click({force: true});
                            });
                    });
            });
    };

    selectTableCol(articleIndex, clauseIndex, tableIndex = 0, colIndex = 0) {
        templateEditor.article()
            .eq(articleIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                templateEditor.clauseContent()
                    .eq(clauseIndex)
                    .within(() => {
                        templateEditor.elTable()
                            .eq(tableIndex)
                            .within(() => {
                                templateEditor.btnEditTableCol()
                                    .eq(colIndex)
                                    .click({force: true});
                            });
                    });
            });
    };

    selectTableRow(articleIndex, clauseIndex, tableIndex = 0, rowIndex = 0) {
        templateEditor.article()
            .eq(articleIndex)
            .parents('.pioneer-tree-paragraph')
            .within(() => {
                templateEditor.clauseContent()
                    .eq(clauseIndex)
                    .within(() => {
                        templateEditor.elTable()
                            .eq(tableIndex)
                            .within(() => {
                                templateEditor.btnEditTableRow()
                                    .eq(rowIndex)
                                    .click({force: true});
                            });
                    });
            });
    };

    getElementInJQuery(templateId, element) {
        return Cypress.$(`[id="document-${templateId}"]`)
            .find(`[data-cy="${element}"]`);
    };

    elementQuantity(templateId, element, quantity) {
        cy.wait(500).then(() => {
            expect(this.getElementInJQuery(templateId, element)
                .filter(':visible'))
                .to.have.length(quantity);
        });
    };
}

module.exports = new Elements();