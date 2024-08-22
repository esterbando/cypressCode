const documentEditor = require("../../../e2e/models/documentEditor");
module.exports = class IClause {
    /**
     * click on button "Edit" located in clause panel,
     * check if
     * @param indexOfArt {number} - index of Article, where to select clause (0 - ...)
     * @param clauseIndex {number} - index of specific clause in Article (0 - 4)
     *
     * @return {void}
     */
    selectClause(indexOfArt, clauseIndex) {
    }

    /**
     * click on "Edit" button located above Article in clause menu
     * @param index {number} - index of Article, which to select
     *
     * @return {void}
     */
    selectArticle(index) {
    }

    /**
     * Methods in Document Editor
     */

    /**
     * verify quantity of required clause in specific part of Legito document in DE
     * @param templateId {number} - ID of template, where to find clause. Argument is used for searching exact part of whole legito document.
     * @param clause {string} - exact name of clause used in data-cy tags: [article, paragraph, subparagraph, point, item]
     * @param numOfClauses {number} - required number of clauses
     *
     * @return {void}
     */
    clausesQuantity(templateId, clause, numOfClauses) {
    }

    /**
     * verify quantity of required clause with exact string in specific part of Legito document in DE
     * @param templateId {number}
     * @param clause {string}
     * @param numOfClauses {number} - required number of clauses
     * @param text {string} - string according to count clauses
     *
     * @return {void}
     */
    clausesQuantityByText(templateId, clause, numOfClauses, text) {
    }


    /**
     * check if the required clause exist and is visible
     * @param templateID {number}
     * @param clause {string} - specific clause used in data-cy tags [article, paragraph, subparagraph, point, item]
     * @param index {number} - index of clause
     * @param text {string} - text in clause according to specify clause
     * @param visibility {boolean} - choose if clause is visible (true) or if clause does not exist (false)
     * @param numVisibility {boolean} - choose if numbering is visible (true) or if numbering does not exist (false)
     * @param numbering {string} - required number which to check (needs to be string, because of php)
     */
    checkClause(templateID, clause, index, text, visibility = true, numVisibility = false, numbering = '') {
    }

    /**
     * hide or display specific clause by clicking on "eye" icon located on left side of clause
     * @param clause - specific clause used in data-cy tags [article, paragraph, subparagraph, point, item]
     * @param clauseText - text in clause according to specify clause
     */
    changeClauseVisibility(clause, clauseText) {
    }
};