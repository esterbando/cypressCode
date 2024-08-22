import IDocumentEditor from './interface/IDocumentEditor';
import documentEditor from '../../e2e/models/documentEditor';

class DocumentEditor extends IDocumentEditor {
    saveDoc() {
        documentEditor.btnSave()
            .click()
            .wait((7500)).then(() => {
            documentEditor.alertSavedDocComplete()
                .should('exist')
                .should('be.visible');
        });
    };

    openDoc(docID) {
        cy.visit(`/document/default/${docID}`);
        documentEditor.body()
            .should('exist')
            .should('be.visible');
    };

    downloadDoc(format) {
        documentEditor.btnDownload()
            .click()
            .then(() => {
                cy.intercept('POST', '/CZ/en/document/load-data?code=*')
                    .as('postIntercept');
                if (format === 'docx') {
                    documentEditor.btnWord()
                        .eq(0)
                        .click()
                        .wait(5000)
                        .then(() => {
                            cy.wait('@postIntercept')
                                .then((intercept) => {
                                    expect(intercept.response.statusCode)
                                        .to
                                        .equal(201);
                                });
                        });
                } else if (format === 'pdf') {
                    documentEditor.btnPdf()
                        .eq(0)
                        .click()
                        .wait(5000)
                        .then(() => {
                            cy.wait('@postIntercept')
                                .then((intercept) => {
                                    expect(intercept.response.statusCode)
                                        .to
                                        .equal(201);
                                });
                        });
                }
            }).then(() => {
            documentEditor.btnCloseDialog()
                .click();
        });
    };

    closePopup() {
        if (
            Cypress.$('#snippet-rendererSSIDManager-ssidManagerSnippetData').is(
                ':visible'
            )
        ) {
            documentEditor.btnStartAgain()
                .should('exist')
                .should('be.visible')
                .click()
                .wait(500);
        }
    };

    fillOutTextInput(templateID, clauseText, value) {
        documentEditor.docPart(templateID).within(() => {
            documentEditor.clauseContainer()
                .filter(`:contains(${clauseText})`)
                .find('[data-cy="textInput"]')
                .focus()
                .clear()
                .type(value)
                .blur();
        });
    };


    clearTextInput(templateID, clauseText) {
        documentEditor.docPart(templateID).within(() => {
            documentEditor.clauseContainer()
                .filter(`:contains(${clauseText})`)
                .find('[data-cy="textInput"]')
                .focus()
                .clear()
                .blur();
        });
    };
}

module.exports = new DocumentEditor();