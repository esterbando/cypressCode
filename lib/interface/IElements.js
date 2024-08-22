const documentEditor = require("../../../e2e/models/documentEditor");
module.exports = class IElements {
    /**
     * By given clause (e.x. paragraph) and given order index of clause in template (e.x. 2)
     * select given element by performing click action at it to select given element
     * @param element {pageObject} Element from Elements POM, which you want to select
     * @param clause {pageObject} Name of the clause, where desired element is located
     * @param clauseIndex {number} Order index of clause where desired element is located
     * @param elementPos {number}
     *
     * @return {void}
     */
    selectElement(element, clause, clauseIndex, elementPos) {
    };

    /**
     *TODO
     * @param element {pageObject}
     * @param clause {pageObject}
     * @param clauseIndex {number}
     */
    selectElements(element, clause, clauseIndex) {
    };

    /**
     * TODO
     */
    selectAllElements() {
    };

    /**
     * TODO
     * @param element {pageObject} Element from Elements POM, which you want to select
     * @param clause {pageObject} Name of the clause, where desired element is located
     * @param clauseIndex {number} Order index of clause where desired element is located
     * @param elementPos {number}
     */

    deleteElement(element, clause, clauseIndex, elementPos) {
    };

    /**
     * TODO
     * @param element {pageObject}
     * @param clause {pageObject}
     * @param clauseIndex {number}
     */
    deleteElements(element, clause, clauseIndex) {
    };

    /**
     * TODO
     */
    deleteAllElements() {
    };

    /**
     * select required option in Question element
     * @param questionName {string} - name of question, where to select option
     * @param option {string} - option, which to select
     *
     * @return {void}
     */
    answerQuestion(questionName, option) {
    }

    /**
     * check if element Question has selected correct answer
     * @param questionName {string}
     * @param optionIndex {number}
     *
     * @return {void}
     */
    checkAnswerQuestion(questionName, optionIndex) {
    }

    /**
     * fill in value for text input in Document Editor
     * @param templateID {number}
     * @param clauseText {string} - text in clause where is located textinput
     * @param value {string} - required value which to fill in
     */
    fillOutTextInput(templateID, clauseText, value) {
    }

    /**
     * fill out options in multiple choice question
     * @param docPartId {number} id of template in document editor
     * @param questionName {string} unique name of the question in template
     * @param options {string[]} array of options to be selected
     */
    answerQuestionMultiChoice(docPartId, questionName, options) {
    }

    /**
     * Choose options in question element from object options
     * @param docPartId {number} id of template in document editor
     * @param questionName {string} unique name of the question in template found in DE
     * @param options {string[]} array of options to be selected
     */
    chooseQuestionObjectValue(docPartId, questionName, options) {
    }

    /**
     * TODO
     * @param articleIndex {number}
     * @param clauseIndex {number}
     */
    selectElementsInClause(articleIndex, clauseIndex) {
    };

    /**
     * TODO
     * @param articleIndex {number}
     * @param clauseIndex {number}
     * @param tableIndex {number}
     */
    selectElementsInTable(articleIndex, clauseIndex, tableIndex = 0) {
    };

    /**
     * TODO
     * @param articleIndex {number}
     * @param clauseIndex {number}
     * @param tableIndex {number}
     */
    selectTable(articleIndex, clauseIndex, tableIndex = 0) {
    };

    /**
     * TODO
     * @param articleIndex {number}
     * @param clauseIndex {number}
     * @param tableIndex {number}
     * @param colIndex {number}
     */
    selectTableCol(articleIndex, clauseIndex, tableIndex = 0, colIndex = 0) {
    };

    /**
     * TODO
     * @param articleIndex {number}
     * @param clauseIndex {number}
     * @param tableIndex {number}
     * @param rowIndex {number}
     */
    selectTableRow(articleIndex, clauseIndex, tableIndex = 0, rowIndex = 0) {
    };

    /**
     * TODO
     * @param templateId {number}
     * @param element {string}
     */
    getElementInJQuery(templateId, element) {
    };

    /**
     * TODO
     * @param templateId {number}
     * @param element {string}
     * @param quantity {number}
     */
    elementQuantity(templateId, element, quantity) {
    };

    /**
     * TODO
     * @param templateID
     * @param text
     */
    getTextQuantity(templateID, text) {
    };

    /**
     * TODO
     * @param templateID
     * @param elName
     * @param visibility
     */
    checkQuestionVisibility(templateID, elName, visibility = true) {

    };
};