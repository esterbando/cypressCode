const clauses = require("../clauses");
const templateEditor = require("../../../e2e/models/templateEditor");
module.exports = class IConditions {
    /**
     * click on button "Condition" located in options panel,
     * check that condition container appears and contains header in condition container
     *
     * @return {void}
     */
    openCond() {
    }

    /**
     * close option panel by clicking on button "X" (cross) located right in options panel,
     * check that condition container disappears
     *
     * @return {void}
     */
    closePanel() {
    }

    /**
     * select condition object from first dropdown in condition constructor according to object,
     * check if condition object is selected
     * @param object {string}- element on which to set a condition
     *
     * @return {void}
     */
    chooseObject(object) {
    }

    /**
     * select condition template from second dropdown in condition constructor according to template name,
     * check if condition template is selected
     * @param templateName {string} - name of specific template
     *
     * @return {void}
     */
    chooseTemplate(templateName) {
    }

    /**
     * select object name from third dropdown in condition constructor according to system name of specific element,
     * check if condition object name (system name) is selected
     * @param systemName {string} - system name of specific condition object
     *
     * @return {void}
     */
    chooseObjectName(systemName) {
    }

    /**
     * select specific operator (type of condition) from forth dropdown in condition constructor,
     * check if condition operator is selected
     * @param operator {string} - condition operator
     *
     * @return {void}
     */
    chooseOperator(operator) {
    }

    /**
     * select specific operator (type of condition) from second dropdown in condition constructor,
     * use only if "Document" condition object was selected,
     * check if condition operator is selected
     * @param condTYpeDoc {string} - condition operator for "Document" object
     *
     * @return {void}
     */
    chooseDocOperator(condTypeDoc) {
    }

    /**
     * select option from fifth dropdown in condition constructor if required,
     * check if condition option is selected
     * @param option {string} - select element or question element option
     *
     * @return {void}
     */
    chooseOption(option) {
    }

    /**
     * select language from third dropdown in condition constructor,
     * use only if "Document" object is selected for creating condition,
     * check if language is selected
     * @param language {string} - exact name of language, which to choose
     *
     * @return {void}
     */
    chooseLanguage(language) {
    }

    /**
     * select JSON integration document from second dropdown in condition constructor,
     * use only if "JSON Object" is selected for creating condition,
     * check if JSON document is selected
     * @param json {string} - name of JSON integration document
     *
     * @return {void}
     */
    chooseIntegration(json) {
    }

    /**
     * select JSON integration part from third dropdown in condition constructor,
     * use only if "JSON Object" is selected for creating condition,
     * check if JSON integration part is selected
     * @param jsonPart - exact name of part in JSON integration
     *
     * @return {void}
     */
    chooseIntegrationPart(jsonPart) {
    }

    /**
     * fill input in condition constructor with condition value,
     * check if condition value has correct value
     * @param condValue {string} - required value for "Numeric" and "Text" type of condition
     *
     * @return {void}
     */
    fillInCondValue(condValue) {
    }

    /**
     * fill date input in condition constructor with date,
     * check if the date input has correct value
     * @param date {string}
     *
     * @return {void}
     */
    fillInDate(date) {
    }

    /**
     * fill input in condition constructor with system name,
     * use only if "any Template Suite Content" condition object is selected to create condition,
     * check if the input has correct value
     * @param systemName {string} - exact name of element
     *
     * @return {void}
     */
    fillInSystemNameAny(systemName) {
    }

    /**
     * select specific operator (type of condition) in condition constructor,
     * use only if "any Template Suite Content" condition object is selected to create condition,
     * check if condition operator is selected
     * @param operator {string} - type of condition
     *
     * @return {void}
     */
    chooseOperatorAny(operator) {
    }

    /**
     * fill input in condition constructor with any value,
     * use only if "any Template Suite Content" condition object is selected to create condition,
     * check if the input has correct value
     * @param condValue - any condition value
     *
     * @return {void}
     */
    fillInCondValueAny(condValue) {
    }

    /**
     * create condition on required object(element) according to arguments
     * @param object {string}
     * @param templateName {string}
     * @param systemName {string}
     * @param operator {string}
     * @param option {string}
     * @param condValue {string}
     *
     * @return {void}
     */
    createCond(object, templateName, systemName, operator, option, condValue) {
    }

    /**
     * create "Next Condition" according to arguments,
     * check if condition constructor appears
     * @param object {string}
     * @param templateName {string}
     * @param systemName {string}
     * @param operator {string}
     * @param option {string} - optional param
     * @param condValue {string} - optional param
     *
     * @return {void}
     */
    createNextCond(object, templateName, systemName, operator, option, condValue) {
    }

    /**
     * delete single condition by clicking on trash button,
     * check if condition constructor of single condition disappears and header of condition container appears
     * @param index {number} - index of condition, which to remove; optional param
     *
     * @return {void}
     */
    removeSingleCond(index) {
    }

    /**
     * delete all condition by click on button "Remove All Conditions",
     * check if header in condition container appears and condition constructor disappears
     *
     * @return {void}
     */
    removeAllCond() {
    }

    /**
     * delete condition group by click on button "Remove Group" with trash icon located at the bottom of the dropdown in condition group,
     * use only if condition group exist,
     * check if condition group disappears and header of condition container exist
     *
     * @return {void}
     */
    removeCondGroup() {
    }

    /**
     * copy conditions of specific object by click on button "Copy" located top right in condition container,
     * check if condition container and condition constructor appears
     *
     * @return {void}
     */
    copyCond() {
    }

    /**
     * paste condition by click on button "Paste condition" located in header of condition container,
     * check if condition container exist and condition constructor appears
     *
     * @return {void}
     */
    pasteCond() {
    }

    /**
     * apply recent condition by click on button "Apply recent condition" located in header of condition container,
     * recent condition is the last used condition,
     * if dropdownOption not equals '', click on arrow button and select condition suggestion (recent condition) from dropdown according to index,
     * check if condition container exist and condition constructor appears
     * @param dropdownOption {string} - option/s that suggest you the last used conditions, optional param
     * @param index {number} - index of condition in dropdown, optional parameter
     *
     * @return {void}
     */
    applyRecentCond(dropdownOption, index) {
    }

    /**
     * select condition suggestion from condition container by index of object(element),
     * if systemName not equals '', find suggestion through "Search" and select specific suggestion according to systemName and index,
     * check if condition container exist and condition constructor appears
     * @param index {number} - index of individual specific suggestion
     * @param systemName {string} - system name of condition object (element), optional param
     *
     * @return {void}
     */
    chooseSuggestion(index, systemName) {
    }

    /**
     * select condition suggestion from dropdown located in condition container by index of object(element),
     * if systemName not equals '', find suggestion in dropdown through "Search" and select specific suggestion according to systemName and index,
     * check if condition container exist and condition constructor appears
     * @param index {number} - index of individual specific suggestion in dropdown
     * @param systemName {string} - system name of condition object (element), optional param
     *
     * @return {void}
     */
    chooseSuggestionInDropdown(index, systemName) {
    }

    /**
     * check if condition object in condition constructor has correct value
     * @param object {string} - element for which is condition created
     *
     * @return {void}
     */
    checkObject(object) {
    }

    /**
     * check if condition template name in condition constructor has correct value
     * @param templateName {string} - name of specific template
     *
     * @return {void}
     */
    checkTemplate(templateName) {
    }

    /**
     * check if object name in condition constructor has correct value
     * @param systemName {string} - system name of specific condition object
     *
     * @return {void}
     */
    checkObjectName(systemName) {
    }

    /**
     * check if condition operator (type of condition) in condition constructor has correct value
     * @param operator {string} - condition operator
     *
     * @return {void}
     */
    checkOperator(operator) {
    }

    /**
     * check if condition operator (type of condition) in condition constructor has correct value
     * @param condTypeDoc {string} - condition operator for "Document" object
     *
     * @return {void}
     */
    checkDocOperator(condTypeDoc) {
    }

    /**
     * check if condition option in condition constructor has correct value
     * @param option {string} - option of select element or question element option
     *
     * @return {void}
     */
    checkOption(option) {
    }

    /**
     * check if language option in condition constructor has correct value
     * @param language {string} - exact name of language
     *
     * @return {void}
     */
    checkLanguage(language) {
    }

    /**
     * check if JSON integration in condition constructor has correct value
     * @param json {string} - name of JSON integration document
     *
     * @return {void}
     */
    checkIntegration(json) {
    }

    /**
     * check if JSON integration part in condition constructor has correct value
     * @param jsonPart {string} - exact name of part in JSON integration
     *
     * @return {void}
     */
    checkIntegrationPart(jsonPart) {
    }


    /**
     * check if input in condition value located on condition constructor has correct value
     * @param condValue {string} - required value for "Numeric" and "Text" type of condition
     *
     * @return {void}
     */
    checkCondValue(condValue) {
    }

    /**
     * check if date input located on condition constructor has correct value
     * @param date {string}
     *
     * @return {void}
     */
    checkDate(date) {
    }

    /**
     * check if input in condition constructor for "any Template Suite Content" has correct value
     * @param systemName {string} - exact name of element
     *
     * @return {void}
     */
    checkSystemNameAny(systemName) {
    }

    /**
     * check if condition operator (type of condition) in condition constructor for "any Template Suite Content" has correct value
     * @param operator {string} - type of condition
     *
     * @return {void}
     */
    checkOperatorAny(operator) {
    }

    /**
     * check if input for condition value (any Template Suite Content) in condition constructor has correct value
     * @param condValue {string} - any condition value
     *
     * @return {void}
     */
    checkCondValueAny(condValue) {
    }

    /**
     * check if condition is set properly and condition parameters have correct values
     * @param object {string} - element for which is condition created
     * @param templateName {string} - name of specific template
     * @param systemName {string} - system name of specific condition object
     * @param operator {string} - condition operator
     * @param option {string} - option of select element or question element option, optional parameter
     * @param condValue {string} - required value for "Numeric" and "Text" type of condition, optional parameter
     *
     * @return {void}
     */
    checkCond(object, templateName, systemName, operator, option, condValue) {
    }

    /**
     * TODO:
     * create condition group by click button "+ Add Conditions Group" in dropdown located in condition container,
     * check if condition container exist and condition group appears
     *
     * @return {void}
     */
    addCondGroup() {
    }

    /**
     * remove conditions from clauses if existed,
     * method is suitable for template created for conditions - clauses on at-db-dev server
     *
     * @return {void}
     */
    cleanCondClauses() {
    }

    /**
     * Document Editor
     */
    /**
     * turn off or turn on toggle "Applying condition" in DE
     *
     * @return {void}
     */
    applyCond() {
    }
};