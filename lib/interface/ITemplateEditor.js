module.exports = class ITemplateEditor {
    /**
     * publish template by clicking on button "Publish" located on top panel of TE,
     * after publishing template reload the page
     * check if
     *
     * @return {void}
     */
    publishAndReload() {
    }

    /**
     * save template by clicking on "Save" button located on top panel of TE,
     * check that text "All changes saved" has appeared
     *
     * @return {void}
     */
    save() {
    }

    /**
     * open TE by url using template ID,
     * check if Template Editor exist
     * @param templateID {number}- ID of specific template
     *
     * @return {void}
     */
    openTemplate(templateID) {
    }

    /**
     * open DE by clicking on button "Test" located on top panel of TE
     *
     * @return {void}
     */
    switchToDE() {
    }

    /**
     * Set default value to element
     * @param value {number}
     * @param element {POM}
     * @param clause {POM}
     * @param clauseIndex {number}
     * @param contentIndex {number}
     * @param elementPos {number}
     *
     *
     * @return {void}
     */
    setDefaultValue(value, element, clause, clauseIndex, contentIndex, elementPos) {
    };

    /**
     * Close default value panel
     *
     * @return {void}
     */
    closeDefValPanel() {
    };

};