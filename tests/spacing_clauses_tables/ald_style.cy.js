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
        describe(`4. Set ${obj.name} through Word styles in ALD`, () => {
            describe('Template Editor', () => {
                before(() => {
                    templateEditor.openTemplate(obj.aldStyle.templateId);
                })
                it(`Set spacing on clauses via ALD named ${obj.name} 50.5pt in editor`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.setAld);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.checkAld);
                    }
                })
            })
            describe('Document Editor', () => {
                it(`Check ${obj.name} by snapshot`, () => {
                    documentEditor.snapshotDocumentEditor(obj.documentId, obj.aldStyle.snapShotName);
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
})