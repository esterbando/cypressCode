import dashboard from '../../models/dashboard.js'
import documentEditor from '../../models/documentEditor'
import templateEditor from '../../models/templateEditor'
import { data } from '../../../fixtures/spacingData.js'

const legitoAdmin = Cypress.env('legitoAdminUser');
const urls = Cypress.env('urls');
const workspace = Cypress.env('workspaceOfChoice');

describe.skip(`Set spacing on Clauses`, () => {
    before(() => {
        dashboard.loginIntoWorkspace(legitoAdmin.email, legitoAdmin.password, workspace);
    })
    Object.values(data).forEach((obj) => {
        describe(`1.a) Set spacing to the clause with the default style, which has ${obj.name} 10pt`, () => {
            before(() => {
                dashboard.openStylesSettings(urls.stylesInSettings);
                dashboard.removeDefaultStyle(obj.styles);
                dashboard.setDefaultStyle(obj.defaultStyleOverwrited.legitoStyle, obj.styles);
            })
            describe('Template Editor', () => {
                before(() => {
                    templateEditor.openTemplate(obj.defaultStyleOverwrited.templateId);
                })
                it(`Change ${obj.name} by MULTIPLE click on Clauses in Template Editor via design tab`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.setMultipleClauses(obj.defaultStyleOverwrited.setSpacing);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyleOverwrited.checkStyle);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyleOverwrited.checkSpacing);
                    }
                    templateEditor.snapShot(obj.defaultStyleOverwrited.snapShotNameMultiple);
                })
                it(`Change ${obj.name} by SINGLE click on each Clause in Template Editor via design tab`, () => {
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyleOverwrited.setSpacing);
                    }
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyleOverwrited.checkStyle);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyleOverwrited.checkSpacing);
                    }
                    templateEditor.snapShot(obj.defaultStyleOverwrited.snapShotNameSingle);
                })
            })
        })
        describe('Document Editor', () => {
            it(`Check ${obj.name} by snapshot`, () => {
                documentEditor.snapshotDocumentEditor(obj.documentId, obj.defaultStyleOverwrited.snapShotName);
            })
            it(`Save and download document ${obj.name}`, () => {
                cy.openDocumentRecord(obj.documentId);
                cy.saveDocument().then(() => {
                    cy.downloadDocument();
                })
            })
            after(() => {
                dashboard.openStylesSettings(urls.stylesInSettings);
                dashboard.setDefaultStyle(obj.defaultStyleOverwrited.legitoStyle, data.spacingBefore.styles);
                dashboard.removeDefaultStyle(obj.styles);
            })
        })
    })
})