import ITemplateEditor from './interface/ITemplateEditor';
import templateEditor from '../../e2e/models/templateEditor';
import elements from './elements';

class TemplateEditor extends ITemplateEditor {
    //add to iTemplateEditor
    publish() {
        templateEditor.btnPublish()
            .click().then(() => {
            templateEditor.topPanel()
                .contains('Publishing')
                .should('exist')
                .should('be.visible');
        });
    };

    publishAndReload() {
        templateEditor.btnPublish()
            .click().then(() => {
            templateEditor.topPanel()
                .contains('Publishing')
                .should('exist')
                .should('be.visible')
                .wait(2000).then(() => {
                cy.reload();
                cy.waitForLoadingOverlayToFade();
            });
        });
    };

    save() {
        templateEditor.btnSave()
            .click()
            .wait(1000)
            .then(() => {
                templateEditor.allChangesSaved()
                    .should('exist')
                    .should('be.visible');
                templateEditor.iconCheckCircle()
                    .should('exist')
                    .should('be.visible');
            });
    };

    openTemplate(templateID) {
        cy.visit(`/definition/editor/${templateID}`);
        cy.waitForLoadingOverlayToFade().then(() => {
            templateEditor.body()
                .should('exist')
                .should('be.visible');
        });
    };

    switchToDE() {
        templateEditor.btnTest()
            .click();
    };

    setDefaultValue(value, element, clause, clauseIndex, contentIndex, elementPos) {
        elements.selectElement(element, clause, clauseIndex, elementPos); //TODO Prerobit PRECO?
        templateEditor.btnDefValues()
            .should('exist')
            .and('be.visible')
            .click()
            .then(() => {
                templateEditor.containerDefValues()
                    .should('exist')
                    .should('be.visible').find('input').clear().type(value);
                this.closeDefValPanel();
            });
    };

    closeDefValPanel() {
        templateEditor.btnClosePanel()
            .should('exist')
            .and('be.visible')
            .click();
        templateEditor.containerDefValues()
            .should('not.exist');
    };
}

module.exports = new TemplateEditor();