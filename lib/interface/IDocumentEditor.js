module.exports = class IDocumentEditor {
    /**
     * save document by clicking "Save" button located on top panel right
     * check if alert "Document save complete" appears
     *
     * @return {void}
     */
    saveDoc() {
    }

    /**
     * open DE by url using ID of specific template suite,
     * check if DE is opened
     * @param docID - ID of document (template suite)
     *
     * @return {void}
     */
    openDoc(docID) {

    }

    /**
     * download Legito document in required format according your argument,
     * downloaded document is checked by POST intercept
     * @param {string} format - specify in which format you would like to download document
     * Use following arguments :
     *      'docx' for downloading document in Word,
     *      'pdf' for downloading document in Pdf
     *
     *@return {void}
     */
    downloadDoc(format) {
    }

    /**
     * check if numbering of specific clause is visible or if numbering does not exist
     * @param visibility {boolean} - choose if numbering is visible (true) or if numbering does not exist (false)
     * @param numbering {string} - required number which to check (needs to be string, because of php)
     * @param clause {string} - specific clause used in data-cy tags [article, paragraph, subparagraph, point, item]
     * @param clauseText {string} - text in clause according to specify clause
     *
     * @return {void}
     */
    checkNumbering(visibility = true, numbering = '1', clause, clauseText) {
    }

    /**
     * Check if pop up Start Again / Continue appears, if it does, close pop up
     *
     * @return {void}
     */
    closePopup() {
    }

    /**
     * Find element text input in document part specified by unique text in clause
     * and fill the text input with value
     *
     * @param templateID {number}
     * @param clauseText {string}
     * @param value {string}
     *
     * @return {void}
     */
    fillOutTextInput(templateID, clauseText, value) {
    };

    /**
     * Find element text input in document part specified by unique text in clause
     * and remove value from the text input
     *
     * @param templateID {number}
     * @param clauseText {string}
     *
     * @return {void}
     */
    clearTextInput(templateID, clauseText) {
    };
};