import templateEditor from '../../e2e/models/templateEditor';
import documentEditor from '../../e2e/models/documentEditor';
import IConditions from './interface/IConditions';
import clauses from "./clauses";

/**
 * all methods expect one condition or condition group,
 * TODO: complete method if needed
 */
class Conditions extends IConditions {
    objects = {
        'Question': 0,
        'Clause': 0,
        'Text': 0,
        'Text Input': 1,
        'Select': 0,
        'Calculation': 1,
        'Switcher': 0,
        'Button': 1,
        'Amount-in-Money': 1,
        'Currency-in-Money': 1,
        'Date': 1,
        'Day-in-date': 1,
        'Month-in-date': 1,
        'Year-in-date': 1,
        'Link': 0,
        'Image': 0,
        'Document': 2,
        'Section': 0,
        'JSON Object': 3,
        'any Template Suite Content': 4
    }
    operators = {
        'equals to': 0,
        'not equal to': 0,
        'greater than': 0,
        'greater than or equal': 0,
        'less than': 0,
        'less than or equal': 0,
        'is present': 1,
        'is not present': 1,
        'is empty': 1,
        'is not empty': 1,
        'contains': 0,
        'does not contain': 0,
        'starts with': 0,
        'ends with': 0,
        'does not end with': 0,
        'is bilingual': 1,
        'is not bilingual': 1,
        'has primary language': 2,
        'has not primary language': 2,
        'has secondary language': 2,
        'has not secondary language': 2,
        'is before': 0,
        'is after': 0,
        'is': 2,
        'is not': 2,
        'hasn\'t been clicked': 1,
        'has been clicked': 1,
        'is set to': 2,
        'isn\'t set to': 2,
        'is e-mail': 1,
        'is url': 1,
    }

    openCond() {
        templateEditor.btnCond()
            .click();
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
    };

    closePanel() {
        templateEditor.btnClosePanel()
            .click();
        templateEditor.containerCond()
            .should('not.exist');
    };

    chooseObject(object) {
        templateEditor.objectCond()
            .click();
        templateEditor.dropdown()
            .contains(object)
            .click({force: true});
        this.checkObject(object);
    };

    chooseTemplate(templateName) {
        templateEditor.templateCond()
            .click();
        templateEditor.dropdown()
            .contains(templateName)
            .click({force: true});
        this.checkTemplate(templateName);
    };

    chooseObjectName(systemName) {
        templateEditor.systemNameCond()
            .click();
        templateEditor.dropdown()
            .contains(systemName)
            .click({force: true});
        this.checkObjectName(systemName);
    };

    chooseOperator(operator) {
        templateEditor.operatorCond(operator)
            .click();
        templateEditor.dropdown()
            .contains(operator)
            .click({force: true});
        this.checkOperator(operator);
    };

    chooseDocOperator(operatorDoc) {
        templateEditor.operatorDocCond()
            .click();
        templateEditor.dropdown()
            .contains(operatorDoc)
            .click({force: true});
        this.checkDocOperator(operatorDoc);
    };

    chooseOption(option) {
        templateEditor.optionCond()
            .click();
        templateEditor.dropdown()
            .contains(option)
            .click({force: true});
        this.checkOption(option);
    };

    chooseLanguage(language) {
        templateEditor.optionLanguageCond()
            .click();
        templateEditor.dropdown()
            .contains(language)
            .click({force: true});
        this.checkLanguage(language);
    };

    chooseIntegration(json) {
        templateEditor.jsonDocCond()
            .click();
        templateEditor.dropdown()
            .contains(json)
            .click({force: true});
        this.checkIntegration();
    };

    chooseIntegrationPart(jsonPart) {
        templateEditor.jsonPartCond()
            .click();
        templateEditor.dropdown()
            .contains(jsonPart)
            .click({force: true});
        this.checkIntegrationPart();
    };

    fillInCondValue(condValue) {
        templateEditor.inputValueCond()
            .clear()
            .type(condValue);
        this.checkCondValue(condValue);
    };

    fillInDate(date) {
        templateEditor.inputDateCond()
            .type(date);
        this.checkDate(date);
    };

    fillInSystemNameAny(systemName) {
        templateEditor.inputSystemNameAnyCond()
            .type(systemName);
        this.checkSystemNameAny(systemName);
    };

    chooseOperatorAny(operator) {
        templateEditor.operatorAnyCond()
            .click();
        templateEditor.dropdown()
            .contains(operator)
            .click();
        this.checkOperatorAny(operator);
    };

    fillInCondValueAny(condValue) {
        templateEditor.inputAnyCond()
            .type(condValue);
        this.checkCondValueAny(condValue);
    };

    createCond(object, templateName, systemName, operator, option = '', condValue = '') {
        this.openCond();
        templateEditor.btnCreateCond()
            .click();
        this.chooseObject(object);
        if (this.objects[object] === 2) {
            this.chooseDocOperator(operator);
            if (this.operators[operator] !== 1) {
                this.chooseLanguage(option);
            }
        } else if (this.objects[object] === 3) {
            this.chooseIntegration();
            this.chooseIntegrationPart();
        } else if (this.objects[object] === 4) {
            this.fillInSystemNameAny(systemName);
            this.chooseOperatorAny(operator);
            if (this.operators[operator] !== 1) {
                this.fillInCondValueAny(condValue);
            }
        } else {
            this.chooseTemplate(templateName);
            this.chooseObjectName(systemName);
            this.chooseOperator(operator);
            if (condValue) {
                object === 'Date' ? this.fillInDate(condValue) : this.fillInCondValue(condValue);
            } else if (this.operators[operator] === 2) {
                this.chooseOption(option);
            }
        }
        this.closePanel();
    };

    //TODO: ASK Ester if its done
    //TODO: create condition, fill in specific condition constructor
    createNextCond(object, templateName, systemName, operator, option = '', condValue = '') {
        this.openCond();
        templateEditor.btnNextCond()
            .click();
        templateEditor.constructorCond()
            .first()
            .next()
            .should('exist')
            .should('be.visible');
    };

    removeSingleCond(index = 0) {
        templateEditor.btnCond()
            .click();
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible')
            .then(() => {
                if (Cypress.$('.cond-picker-container').is(':visible')) {
                    if (index !== 0) {
                        templateEditor.btnRemoveSingleCondInGroup(index)
                            .click();
                    } else {
                        templateEditor.btnRemoveSingleCond()
                            .click();
                    }
                }
            })
        templateEditor.constructorCond()
            .should('not.exist')
        templateEditor.containerHeaderCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    removeAllCond() {
        this.openCond();
        templateEditor.btnRemoveAllCond()
            .click();
        templateEditor.constructorCond()
            .should('not.exist')
        templateEditor.containerHeaderCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    removeCondGroup() {
        this.openCond();
        templateEditor.btnRemoveCondGroup()
            .click();
        templateEditor.condGroup()
            .should('not.exist')
        templateEditor.containerHeaderCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };


    //TODO: adding data-cy tag for copy button in condition container
    copyCond() {
        this.openCond();
        templateEditor.btnCopyCond()
            .click();
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
        templateEditor.constructorCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    pasteCond() {
        this.openCond();
        templateEditor.btnPasteCond()
            .click();
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
        templateEditor.constructorCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    applyRecentCond(dropdownOption = '', index = 0) {
        this.openCond();
        if (dropdownOption) {
            templateEditor.arrowDown(index)
                .click();
            templateEditor.dropdown()
                .contains(dropdownOption)
                .click();
        } else {
            templateEditor.btnApplyRecentCond()
                .click();
        }
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
        templateEditor.constructorCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    chooseSuggestion(index, systemName = '') {
        this.openCond();
        if (systemName) {
            templateEditor.suggestionCondBySN(systemName, index)
                .click();
        } else {
            templateEditor.suggestionCond(index)
                .click();
        }
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
        templateEditor.constructorCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    chooseSuggestionInDropdown(index, systemName = '') {
        this.openCond();
        if (systemName) {
            templateEditor.suggestionCondInDropdownBySN(systemName, index)
                .click();
        } else {
            templateEditor.suggestionInDropdownCond(index)
                .click();
        }
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
        templateEditor.constructorCond()
            .should('exist')
            .should('be.visible');
        this.closePanel();
    };

    checkObject(object) {
        templateEditor.objectValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', object);
    };

    checkTemplate(templateName) {
        templateEditor.templateValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', templateName);
    };

    checkObjectName(systemName) {
        templateEditor.systemNameValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', systemName);
    };

    checkOperator(operator) {
        templateEditor.operatorValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', operator);
    };

    checkDocOperator(operatorDoc) {
        templateEditor.operatorDocValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', operatorDoc);
    };

    checkOption(option) {
        templateEditor.optionValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', option);
    };

    checkLanguage(language) {
        templateEditor.optionLanguageValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', language);
    };

    checkIntegration(json) {
        templateEditor.jsonDocValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', json);
    };

    checkIntegrationPart(jsonPart) {
        templateEditor.jsonPartValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.text', jsonPart);
    };

    checkCondValue(condValue) {
        templateEditor.inputValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.value', condValue);
    };

    checkDate(date) {
        templateEditor.inputDateCond()
            .should('exist')
            .should('be.visible')
            .should('have.value', date);
    };

    checkSystemNameAny(systemName) {
        templateEditor.inputSystemNameAnyCond()
            .should('exist')
            .should('be.visible')
            .should('have.value', systemName);
    };

    checkOperatorAny(operator) {
        templateEditor.operatorAnyValueCond()
            .should('exist')
            .should('be.visible')
            .should('have.value', operator);
    };

    checkCondValueAny(condValue) {
        templateEditor.inputAnyCond()
            .should('exist')
            .should('be.visible')
            .should('have.value', condValue);
    };

    checkCond(object, templateName, systemName, operator, option = '', condValue = '') {
        this.openCond();
        templateEditor.containerCond()
            .should('exist')
            .should('be.visible');
        this.checkObject(object);
        if (this.objects[object] === 2) {
            this.checkDocOperator(operator);
            if (this.operators[operator] !== 1) {
                this.checkLanguage(option);
            }
        } else if (this.objects[object] === 3) {
            this.checkIntegration();
            this.checkIntegrationPart();
        } else if (this.objects[object] === 4) {
            this.checkSystemNameAny(systemName);
            this.checkOperatorAny(operator);
            if (this.operators[operator] !== 1) {
                this.checkCondValueAny(condValue);
            }
        } else {
            this.checkTemplate(templateName);
            this.checkObjectName(systemName);
            this.checkOperator(operator);
            if (condValue) {
                object === 'Date' ? this.checkDate(condValue) : this.checkCondValue(condValue);
            } else if (this.operators[operator] === 2) {
                this.checkOption(option);
            }
        }
        this.closePanel();
    };

    cleanCondClauses() {
        Cypress._.times(10, (n) => {
            n >= 5 ? clauses.selectClause(n, n - 5) : clauses.selectClause(n, n);
            this.removeSingleCond();
        })
    };

    /**
     * methods in DE
     */
    applyCond() {
        documentEditor.btnView()
            .click();
        documentEditor.viewTab()
            .should('exist')
            .should('be.visible');
        documentEditor.toggleApplyingCond().click();
        documentEditor.viewTab()
            .should('not.exist');
    };
}

module.exports = new Conditions();