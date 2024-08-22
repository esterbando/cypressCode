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
        describe(`5. Set ${obj.name} in Legito Styles (manually set for a specific Clause)`, () => {
            describe('Template Editor', () => {
                before(() => {
                    templateEditor.openTemplate(obj.assignedStyle.templateId);
                })
                it(`Set spacing via Legito style named ${obj.name} 20.5pt in Template Editor`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.assignedStyle.setStyle);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyle.checkStyle);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.assignedStyle.checkSpacing);
                    }
                    templateEditor.snapShot(obj.assignedStyle.snapShotNameEditor);
                })
            })
        })
        describe('Document Editor', () => {
            it(`Check ${obj.name} by snapshot`, () => {
                documentEditor.snapshotDocumentEditor(obj.documentId, obj.assignedStyle.snapShotName);
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