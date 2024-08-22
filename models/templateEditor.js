import '../../support/commands/commands';
import '../../support/commands/commandsIndentationSpacing';

class templateEditor {
    /**
     * selectors
     */
    body = () => cy.get('.body-corporate-definition-editor');
    topPanel = () => cy.get('.panel-container');
    btnClosePanel = () => cy.get('.exit-panel-button');
    dropdown = () => cy.get('.dropdown-body').not('hidden');
    dropdownOption = (option) => this.dropdown().contains(option);
    arrowDown = (index) => cy.get('[data-icon="chevron-down"]').eq(index);
    btnSave = () => cy.get('[data-cy="editor-panel-save"]');
    allChangesSaved = () => cy.contains('.saving', 'All changes saved.');
    btnPublish = () => cy.get('[data-cy="editor-panel-publish"]');
    iconCheckCircle = () => cy.get('[data-icon="check-circle"]');
    btnTest = () => cy.get('[data-cy="editor-panel-test"]');
    //TODO POTREBNE PREMENOVAT NA btnEdit
    btnEditClause = () => cy.get('[data-cy="element-panel-edit"]');
    btnEditTableCol = () => cy.get('[data-cy="table-menu-col-edit"]');
    btnEditTableRow = () => cy.get('[data-cy="table-menu-row-edit"]');
    /**
     * DEFAULT VALUES selectors
     */

    btnDefValues = () => cy.get('[data-cy="item-detail-default-values"]');
    containerDefValues = () => cy.get(".default-values-wrapper");
    /**
     * CLAUSES selectors
     */
    article = () => cy.get('[data-cy="clause-article"]');
    paragraphCy = () => cy.get('[data-cy="clause-paragraph"]');
    paragraph = () => cy.get('.pioneer-tree-paragraph');
    subparagraph = () => cy.get('[data-cy="clause-subparagraph"]');
    point = () => cy.get('[data-cy="clause-point"]');
    item = () => cy.get('[data-cy="clause-item"]')
    /**
     * CONDITIONS selectors
     */
    btnCond = () => cy.get('[data-cy="item-detail-conditions"]');
    btnCreateCond = () => cy.get('[data-cy="conditions-create-condition"]');
    objectCond = () => cy.contains('.cond-picker-container', 'Question').find('button').first();
    templateCond = () => cy.contains('[data-cy="conditions-picker-term"]', 'Choose').find('button');
    systemNameCond = () => cy.contains('[data-cy="conditions-picker-part"]', 'Choose').find('button');
    operatorCond = () => cy.get('[data-cy="conditions-picker-target"]').find("button");
    optionCond = () => cy.get('[data-cy="conditions-picker-is-required"]').find('button');
    inputDateCond = () => cy.get('[data-cy="conditions-picker-input-date"]');
    objectValueCond = () => cy.get('.cond-picker-container').find('span').first();
    templateValueCond = () => cy.get('[data-cy="conditions-picker-term"]').find('span');
    systemNameValueCond = () => cy.get('[data-cy="conditions-picker-part"]').find('span');
    operatorValueCond = () => cy.get('[data-cy="conditions-picker-target"]').find('span');
    optionValueCond = () => cy.get('[data-cy="conditions-picker-is-required"]').find('span');
    inputSystemNameAnyCond = () => cy.get('[data-cy="conditions-picker-any-system-name"]').find('input');
    operatorAnyCond = () => cy.get('[data-cy="conditions-picker-any-operator"]').find('button');
    operatorAnyValueCond = () => cy.get('[data-cy="conditions-picker-any-operator"]').find('span');
    inputAnyCond = () => cy.get('[data-cy="conditions-picker-any-input"]');
    jsonDocCond = () => cy.contains('[data-cy="conditions-picker-json-document"]', 'Choose').find('button');
    jsonDocValueCond = () => cy.get('[data-cy="conditions-picker-json-document"]').find('span');
    jsonPartCond = () => cy.contains('[data-cy="conditions-picker-json-part"]', 'Choose').find('button');
    jsonPartValueCond = () => cy.get('[data-cy="conditions-picker-json-part"]').find('span');
    optionLanguageCond = () => cy.contains('[data-cy="conditions-picker-language-value"]', 'Choose').find('button');
    optionLanguageValueCond = () => cy.get('[data-cy="conditions-picker-language-value"]');
    operatorDocCond = () => cy.contains('[data-cy="conditions-picker-language-operator"]', 'Choose').find('button');
    operatorDocValueCond = () => cy.get('[data-cy="conditions-picker-language-operator"]').find('span');
    inputValueCond = () => cy.get('[data-cy="conditions-picker-input"]');
    btnApplyRecentCond = () => cy.get('[data-cy="conditions-apply-recent"]');
    btnPasteCond = () => cy.get('[data-cy="conditions-paste-condition"]');
    btnNextCond = (index) => cy.contains('button', ' + Next Condition ').eq(index);
    btnCopyCond = () => cy.contains('[data-cy="conditions-copy-condition"]', 'Copy');
    btnAddCondGroup = () => this.dropdown().contains('button', '+ Add Conditions Group ');
    containerCond = () => cy.get('.conditions-panel-container');
    constructorCond = () => cy.get('.cond-picker-container');
    condGroup = () => cy.get('.condition-group');
    containerHeaderCond = () => cy.get('.conditions-head-panel-wrapper');
    btnRemoveSingleCond = () => cy.get('[data-cy="conditions-remove-single"]');
    btnRemoveAllCond = () => cy.get('[data-cy="conditions-remove-all"]');
    btnRemoveSingleCondInGroup = (index) => cy.get('[data-cy="conditions-remove-single-term"]').eq(index);
    btnRemoveCondGroup = () => this.dropdown().contains('button', ' Remove Group ');
    inputSearchInDropdown = () => this.dropdown().find('.search-input');
    inputSearchCond = () => this.containerCond().find('.search-input');
    suggestionCond = (index) => cy.get('.condition-suggestion-body').eq(index);
    suggestionCondBySN = (systemName, index) => this.inputSearchCond().type(systemName).then(() => {
        this.suggestionCond(index);
    })
    suggestionInDropdownCond = (index) => this.dropdown().find('.sentence-dropdown-option').eq(index);
    suggestionCondInDropdownBySN = (systemName, index) => this.inputSearchInDropdown().type(systemName).find('.sentence-dropdown-option').eq(index);
    /**
     * ELEMENTS selectors
     */
    elQuestion = () => cy.get('[data-cy="element-question"]');
    elTable = () => cy.get('[data-cy="element-table"]');
    elMarkup = () => cy.get('[data-cy="element-markup"]');
    elTextInput = () => cy.get('[data-cy="element-textfield"]');
    elSelect = () => cy.get('[data-cy="element-select"]');
    elMoney = () => cy.get('[data-cy="element-money"]');
    elDate = () => cy.get('[data-cy="element-date"]');
    elSwitcher = () => cy.get('[data-cy="element-switcher"]');
    elButton = () => cy.get('[data-cy="element-button"]');
    elLink = () => cy.get('[data-cy="element-link"]');
    elImage = () => cy.get('[data-cy="element-image"]');
    elPageNumber = () => cy.get('[data-cy="element-page-number"]');
    elToc = () => cy.get('.toc');
    elCalculation = () => cy.get('[data-cy="element-calculation"]');
    elRte = () => cy.get('[data-cy="element-rich-text"]');
    elQR = () => cy.get('.element-container');
    elDynamicClause = () => cy.get('.pioneer-tree-dynamic-clause');
    clauseContent = () => cy.get('.content-container');
    elementContainer = () => cy.get('.item-container');

    removeBoldCM(isText, identifier) {
        isText ? cy.contains(identifier).rightclick() : cy.get(identifier).rightclick({multiple: true});
        cy.get('[data-icon="bold"]').click();
    }

    checkRemovedClassCM(isText, identifier, className) {
        isText ? cy.contains(identifier).rightclick() : cy.get(identifier).rightclick({multiple: true});
        cy.get('[data-icon="bold"]').parent().parent().should('not.have.class', className);
    }


    checkIconClassCM(isText, identifier, className) {
        isText ? cy.contains(identifier).rightclick() : cy.get(identifier).rightclick({multiple: true});
        cy.get('[data-icon="bold"]').parent().parent().should('have.class', className);
    }

    checkIconClassDesign(isText, identifier, className) {
        isText ? cy.contains(identifier).click() : cy.get(identifier).click({multiple: true});
        cy.get('[data-icon="palette"]').click();
        cy.get('[data-icon="bold"]').parent().parent().should('have.class', className);
        cy.contains(' Repeat ').click();
    }

    setBoldDesign(isText, identifier) {
        isText ? cy.contains(identifier).click() : cy.get(identifier).click({multiple: true});
        cy.get('[data-icon="palette"]').click();
        cy.get('[data-icon="bold"]').click();
        cy.contains(' Repeat ').click();
    }

    publish() {
        cy.publishTemplate();
        cy.reload();
        cy.waitForLoadingOverlayToFade();
    }

    save() {
        cy.get('[data-icon="save"]').click();
    }

    switchToDocumentEditor() {
        cy.get('[data-icon="play-circle"]').invoke('removeAttr', 'target').click();
    }

    openTemplate(templateId) {
        cy.openTemplate(templateId);
        cy.waitForLoadingOverlayToFade();
    }

    selectArticle(index) {
        cy.get('.tab-panel.type-clause.tab-panel-article')
            .eq(index)
            .contains('Edit')
            .click({force: true});
    }

    setMultipleClauses(callback, value) {
        cy.setMultipleClauses(callback, value);
    }

    setIndentationOnTable(tablePart, selector, value, specialIndentation = false) {
        cy.editTable(tablePart).then(() => {
            specialIndentation ? cy.setSpecialIndentation(selector, value) : cy.setIndentation(selector, value);
        })
    }

    checkIndentationOnTable(tablePart, selector, value = null, specialIndentation = false) {
        cy.editTable(tablePart).then(() => {
            if (specialIndentation) {
                if (value) cy.checkSpecialIndentation(selector, value);
            } else {
                cy.checkIndentation(selector, value);
            }
        })
    }

    setAldOnTable(tablePart, aldName) {
        cy.editTable(tablePart);
        cy.setAldInEditor(aldName);
    }

    checkAldOnTable(tablePart, aldName) {
        cy.editTable(tablePart);
        cy.checkAldInEditor(aldName);
    }

    setLegitoStyleOnTable(tablePart, styleName) {
        cy.editTable(tablePart);
        cy.setLegitoStyleInEditor(styleName);
    }

    checkLegitoStyleOnTable(tablePart, styleName) {
        cy.editTable(tablePart);
        cy.checkLegitoStyleInEditor(styleName);
    }

    selectClausesSeparatly(callback) {
        cy.selectClausesSeparatly(callback);
    }

    snapShot(name) {
        cy.percySnapshot(name);
    }

    //General model
    checkVisual(name) {
        cy.get('[data-icon="puzzle-piece"]').click().then(() => {
            cy.percySnapshot(name);
        });
    }
}

module.exports = new templateEditor();