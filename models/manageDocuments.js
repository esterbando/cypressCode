import '../../support/commands/commands';
import '../../support/commands/commandsIndentationSpacing';


class manageDocuments {
    modalEditDocRecord = () => cy.get('#frm-manager-documentRecordDialog-recordForm');
    buttonCloseModal = () => cy.get('a.close').filter(':visible');
    buttonCancelModal = () => this.modalEditDocRecord().find('[data-cy="record-dialog-cancel"]');
    buttonView = () => cy.get('[data-cy="view"]');

    /**
     * openSection opens section Manage Document by url
     */
    openSection(){
        cy.openPage('/management/list');
    }

    /**
     * showDocuments  selects number of viewed documents
     * @param {number} numOfDoc  - number of showed documents
     */
    showDocuments(numOfDoc){
        cy.openPage(`/management/list?manager-recordsPerPage=${numOfDoc}&do=manager-changeRecordsPerPage`);
    }

    /**
     * openDocRecord opens Document Record by click on "Edit" button
     * @param {number} index - index, according which document is opened
     * @returns 
     */
    openDocRecord(index){
        return this.buttonEditDocument()
        .eq(index)
        .invoke('removeAttr', 'target')
        .click()
        .wait(500);
    }
}

module.exports = new manageDocuments();
