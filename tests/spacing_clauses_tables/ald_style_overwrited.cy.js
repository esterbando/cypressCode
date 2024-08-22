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
        describe(`3. Set spacing on the clause with the assigned ALD style, which has ${obj.name} 50.5 pt`, () => {
            describe('Template Editor', () => {
                before(() => {
                    templateEditor.openTemplate(obj.aldStyleOverwrited.templateId);
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.setAld);
                        templateEditor.selectClausesSeparatly(obj.checkAld);
                    }
                })
                it(`Set ${obj.name} manually by MULTIPLE click on clauses with value 20.5 via dropdown in design tab`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.aldStyleOverwrited.setSpacing);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.checkAld);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.aldStyleOverwrited.checkSpacing);
                    }
                    templateEditor.snapShot(obj.aldStyleOverwrited.snapShotNameMultiple);
                })
                it(`Set ${obj.name} manually by SINGLE click on each clause with value 20.5 via dropdown in design tab`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.aldStyleOverwrited.setSpacing);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.checkAld);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.aldStyleOverwrited.checkSpacing);
                    }
                    templateEditor.snapShot(obj.aldStyleOverwrited.snapShotNameSingle);
                })
            })
        })
        describe('Document Editor', () => {
            it(`Check ${obj.name} by snapshot`, () => {
                documentEditor.snapshotDocumentEditor(obj.documentId, obj.aldStyleOverwrited.snapShotName);
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