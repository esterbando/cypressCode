import conditions from '../../../../../../support/lib/conditions';
import clauses from '../../../../../../support/lib/clauses';
import templateEditor from '../../../../../../support/lib/templateEditor';
import documentEditor from '../../../../../../support/lib/documentEditor';
import elements from '../../../../../../support/lib/elements';
import dashboard from '../../../../../models/dashboard';
import {condition, element} from '../../../../../../fixtures/condData';
import {data} from '../../../../../../fixtures/condData';
import {operators} from '../../../../../../fixtures/condOperatorsData';
import {clause} from '../../../../../../fixtures/condData';
import {clausePOM} from '../../../../../../fixtures/condData';
import {elementPOM} from '../../../../../../fixtures/condData';

const internalUser = Cypress.env('legitoAdminUser');
const workspace = Cypress.env('masterWorkspace');
const questionData = data.elInSt.question;
const clausesData = data.elInSt.clauses;
const templateID = data.elInSt.templateID;

describe('Create condition on single choice question with ACTIVATED "first option" (normal)', () => {
    before(() => {
        dashboard.loginIntoWorkspace(internalUser.email, internalUser.password, workspace);
    });
    Object.values(operators.question).forEach((operator, i) => {
        before(() => {
            cy.clearLocalStorage();
        });
        describe(`${operator.operatorName}`, () => {
            switch (operator.operatorId) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5: {
                    before(() => {
                        templateEditor.openTemplate(templateID.elements);
                        /*                conditions.cleanCondClauses(); //clean conditionsElements
                                        templateEditor.save();*/
                    });
                    describe('TEMPLATE EDITOR: conditions on clauses', () => {
                        describe('Set condition', () => {
                            it('clauses WITH numbering', () => {
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    //clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                    elements.selectElementsInClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        condition.templateQuestionInST,
                                        questionData.multipleChoice.systemName,
                                        operator.operatorName,
                                        operator.optionsMultiple[0],
                                        operator.condValue);
                                }
                                templateEditor.publishAndReload();
                            });
                            it('clauses WITHOUT numbering', () => {
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    elements.selectElementsInClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        condition.templateQuestionInST,
                                        questionData.multipleChoice.systemName,
                                        operator.operatorName,
                                        operator.optionsMultiple[1],
                                        operator.condValue);
                                }
                                templateEditor.publishAndReload();
                            });
                        });
                        describe('Check condition', () => {
                            describe('clauses WITH numbering', () => {
                                beforeEach(() => {
                                    templateEditor.openTemplate(templateID.elements);
                                });
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        for (let j = 0; j < elementPOM.length; j++) {
                                            elements.selectElement(elementPOM[j], clausePOM[i], clausesData.clauseIndex[i]);
                                            conditions.checkCond(condition.objectName,
                                                condition.templateQuestionInST,
                                                questionData.multipleChoice.systemName,
                                                operator.operatorName,
                                                operator.optionsMultiple[0],
                                                operator.condValue);
                                        }
                                    });
                                }
                            });
                            describe('clauses WITHOUT numbering', () => {
                                beforeEach(() => {
                                    templateEditor.openTemplate(templateID.elements);
                                });
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        for (let j = 0; j < elementPOM.length; j++) {
                                            elements.selectElement(elementPOM[j], clausePOM[i], clausesData.clauseIndex[i]);
                                            conditions.checkCond(condition.objectName,
                                                condition.templateQuestionInST,
                                                questionData.multipleChoice.systemName,
                                                operator.operatorName,
                                                operator.optionsMultiple[1],
                                                operator.condValue);
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
            }
            switch (operator.operatorId) {
                case 2: {
                    //is present
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseText);
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elements, el.name, el.numNegative);
                            });
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseText);
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elements, el.name, el.numPositive);
                            });
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                    break;
                }
                case 3: {
                    //is not present
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elements, el.name, el.numNegative);
                            });
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseText);
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elements, el.name, el.numPositive);
                            });
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                    break;
                }
                case 4: {
                    //is empty
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download pdf', () => {
                            //answer question one and two
                            elements.answerQuestionMultiChoice(templateID.question,
                                questionData.multipleChoice.questionName,
                                questionData.multipleChoice.options).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elements, el.name, el.numNegative);
                                });
                            });
                            //odklikni moznosti z question one and two
                            elements.answerQuestionMultiChoice(templateID.question,
                                questionData.multipleChoice.questionName,
                                questionData.multipleChoice.options).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elements, el.name, el.numPositive);
                                });
                                documentEditor.saveDoc();
                                //documentEditor.downloadDoc('pdf');
                            });
                        });
                    });
                    break;
                }
                case 5: {
                    //is not empty
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elements, el.name, el.numNegative);
                            });
                            elements.answerQuestionMultiChoice(templateID.question,
                                questionData.multipleChoice.questionName,
                                questionData.multipleChoice.options).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elements, el.name, el.numPositive);
                                });
                                documentEditor.saveDoc();
                                //documentEditor.downloadDoc('pdf');
                            });
                        });
                    });
                    break;
                }
                case 0: {
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elements, el.name, el.numNegative);
                            });
                            elements.answerQuestionMultiChoice(templateID.question,
                                questionData.multipleChoice.questionName,
                                questionData.multipleChoice.options).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elements, el.name, el.numPositive);
                                });
                                documentEditor.saveDoc();
                                //documentEditor.downloadDoc('pdf');
                            });
                        });
                    });
                    break;
                }
                case 1: {
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            elements.answerQuestionMultiChoice(templateID.question,
                                questionData.multipleChoice.questionName,
                                questionData.multipleChoice.options).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elements, el.name, el.numNegative);
                                });
                            });
                            elements.answerQuestionMultiChoice(templateID.question,
                                questionData.multipleChoice.questionName,
                                questionData.multipleChoice.options).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elements, el.name, el.numPositive);
                                });
                                documentEditor.saveDoc();
                                //documentEditor.downloadDoc('pdf');
                            });
                        });
                    });
                    break;
                }
            }
        });
    });
});