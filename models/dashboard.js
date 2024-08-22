import '../../support/commands/commands'

class dashboard {
    loginIntoWorkspace(email, password, workspace) {
        cy.loginIntoWorkspace(email, password, workspace);
        //cy.skipGuidedTour();
    }

    /**
     * Login into chosen workspace by corporate ID.
     * @param {string} email
     * @param {string} password
     * @param {number} workspaceID - corporate ID of specific workspace.
     */
    loginIntoWorkspaceByID(email, password, workspaceID) {
        cy.login(email, password);
        cy.chooseWorkspaceByID(workspaceID);
        //cy.skipGuidedTour();
    }

    openStylesSettings(url) {
        cy.openPage(url);
        cy.waitForLoadingOverlayToFade();
    }

    removeDefaultStyle(clauses) {
        cy.setOrRemoveOriginalDefaultStyle(clauses);
    }

    setDefaultStyle(styleName, clauses) {
        cy.setDefaultStyle(styleName, clauses);
    }
}

module.exports = new dashboard();