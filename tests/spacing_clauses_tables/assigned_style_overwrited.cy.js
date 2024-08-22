import dashboard from '../../models/dashboard.js'
import documentEditor from '../../models/documentEditor'
import templateEditor from '../../models/templateEditor'
import { data } from '../../../fixtures/spacingData.js'

const legitoAdmin = Cypress.env('legitoAdminUser');
const workspace = Cypress.env('workspaceOfChoice');

describe.skip(`Set spacing on Clauses`, () => {
    before(() => {
        dashboard.loginIntoWorkspace(legitoAdmin.email, legitoAdmin.password, workspace);
    })
    Object.values(data).forEach((obj) => {
        describe(`2. Set spacing on a clause with an assigned style that has ${obj.name} 10pt `, () => {
            describe('Template Editor', () => {
                before(() => {
                    templateEditor.openTemplate(obj.assignedStyleOverwrited.templateId);
                    cy.waitForLoadingOverlayToFade();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.assignedStyleOverwrited.setStyle);
                        templateEditor.selectClausesSeparatly(obj.assignedStyleOverwrited.checkStyle);
                    }
                })
                it(`Set ${obj.name} manually by MULTIPLE click on clauses with value 20.5 via dropdown in design tab`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.assignedStyleOverwrited.setSpacing);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyleOverwrited.checkStyle);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyleOverwrited.checkSpacing);
                    }
                    templateEditor.snapShot(obj.assignedStyleOverwrited.snapShotNameMultiple);
                })
                it(`Set ${obj.name} manually by SINGLE click on each clause with value 20.5 via dropdown in design tab`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyleOverwrited.setSpacing);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyleOverwrited.checkStyle);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyleOverwrited.checkSpacing);
                    }
                    templateEditor.snapShot(obj.assignedStyleOverwrited.snapShotNameSingle);
                })
            })
        })
        describe('Document Editor', () => {
            it(`Check ${obj.name} by snapshot`, () => {
                documentEditor.snapshotDocumentEditor(obj.documentId, obj.assignedStyleOverwrited.snapShotName);
            })
            it(`Save and download document ${obj.name}`, () => {
                cy.openDocumentRecord(obj.documentId);
                cy.saveDocument().then(() => {
                    cy.downloadDocument();
                })
            })
        })
    })
})