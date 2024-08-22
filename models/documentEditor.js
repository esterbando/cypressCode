import '../../support/commands/commands'

class documentEditor {
    btnDownload = () => cy.get('[data-cy="controls-download"]');
    btnWord = () => cy.get('[data-cy="download-docx"]');
    btnPdf = () => cy.get('[data-cy="download-pdf"]');
    btnCloseDialog = () => cy.get('a.close').filter(':visible');
    alertSavedDocComplete = () => cy.contains('#snippet--flashes', 'Document save complete');
    body = () => cy.get('[data-cy="renderer-body"]'); //DE - Document Editor
    textInput = () => this.body().find('[data-cy="textInput"]');
    iconRendererMenu = () => cy.get('#snippet--outlineSnippet');
    btnView = () => cy.get('[data-cy="navbar-tab-button-view"]');
    viewTab = () => cy.get('#view');
    toggleApplyingCond = () => cy.contains('.btn-control__inner', 'Applying conditions');
    btnSave = () => cy.get('[data-cy="controls-save"]');
    //elQuestion = () => cy.get('[data-cy="question"]');
    clause = (clause) => cy.get(`[data-cy="${clause}"]`);
    clauseByText = (clause, clauseText) => cy.contains(`[data-cy="${clause}"]`, clauseText);
    docPart = (templateId) => cy.get(`[id="document-${templateId}"]`);
    numbering = () => cy.get('[data-cy="numbering"]');
    iconEyeVisibility = () => cy.get('[data-cy="visibility"]');
    questionOptionLabel = (name) => cy.get('.paragraph__options-selection').contains(name);
    questionObjectOptionPicker = () => cy.get('[data-cy="selectBox"]');
    dropdown = () => cy.get('.dropdown-menu').filter(':visible');
    dropdownItem = (option) => cy.get('.dropdown-item').contains(option)

    /**
     * ELEMENTS selectors
     */
    elQuestion = () => cy.get('[data-cy="question"]');
    elQuestionByName = (questionName) => cy.contains('[data-cy="question"]', questionName);
    elTable = () => cy.get('[data-cy="table"]');
    elMarkup = () => cy.get('[data-cy="markup"]');
    elTextInput = () => cy.get('[data-cy="textInput"]');
    elSelect = () => cy.get('[data-cy="select"]');
    elMoney = () => cy.get('[data-cy="money"]');
    elDate = () => cy.get('[data-cy="date"]');
    elSwitcher = () => cy.get('.btn-control-switcher');
    elButton = () => cy.get('[data-cy="counter"]');
    elLink = () => cy.get('[data-cy="link"]');
    elImage = () => cy.get('[data-cy="image"]');
    //elToc = () => cy.get('.toc');
    elCalculation = () => cy.get('[data-cy="calculation"]');
    elRte = () => cy.get('[data-cy="element-rich-text"]');
    elQR = () => cy.get('.paragraph--content--table');
    btnStartAgain = () => cy.contains('Start again');
    clauseContainer = () => cy.get('.paragraph');


    //elDynamicClause = () => cy.get('.pioneer-tree-dynamic-clause');

    /**
     * fillFirstTextInput fills first textInput with NUMBER.
     * @param {number} number - number of your choice. Number is required data type of argument because of money element, which has the same [data-cy] tag.
     */
    fillFirstTextInput(number) {
        this.textInput()
            .first()
            .clear()
            .type(number);
        this.iconRendererMenu()
            .click()
            .wait(1000);
    }
}

module.exports = new documentEditor();