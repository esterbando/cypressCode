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
        describe(`6. Set ${obj.name} in settings via Legito Style (assigned to Clause by default)`, () => {
            before(() => {
                dashboard.openStylesSettings(urls.stylesInSettings);
                dashboard.removeDefaultStyle(obj.styles);
                dashboard.setDefaultStyle(obj.defaultStyle.legitoStyle, obj.styles);
            })
            describe('Template Editor', () => {
                before(() => {
                    templateEditor.openTemplate(obj.defaultStyle.templateId);
                })
                it('Publish and check setted legito style in Template Editor.', () => {
                    templateEditor.publish();
                    for (let i = 0; i < 2; i++) {
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyle.checkStyle);
                        templateEditor.selectArticle(i);
                        templateEditor.selectClausesSeparatly(obj.defaultStyle.checkSpacing);
                    }
                    templateEditor.snapShot(obj.defaultStyle.snapShotNameEditor)
                })
            })
        })
        describe('Document Editor', () => {
            it(`Check ${obj.name} by snapshot`, () => {
                documentEditor.snapshotDocumentEditor(obj.documentId, obj.defaultStyle.snapShotName);
            })
            it(`Save and download document ${obj.name}`, () => {
                cy.openDocumentRecord(obj.documentId);
                cy.saveDocument().then(() => {
                    cy.downloadDocument();
                })
            })
            after(() => {
                dashboard.openStylesSettings(urls.stylesInSettings);
                dashboard.setDefaultStyle(obj.defaultStyle.legitoStyle, obj.styles);
                dashboard.removeDefaultStyle(obj.styles);
            })
        })
    })
})