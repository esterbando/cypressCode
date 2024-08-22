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
                        templateEditor.openTemplate(templateID.elementsInTable);
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
                                        questionData.multipleChoice.templateObjCl,
                                        questionData.multipleChoice.systemNameObjCl,
                                        operator.operatorName,
                                        operator.optionObj,
                                        operator.condValueObjMultiple[1]);
                                }
                                templateEditor.publishAndReload();
                            });
                            it('clauses WITHOUT numbering', () => {
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    elements.selectElementsInClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        questionData.multipleChoice.templateObjCl,
                                        questionData.multipleChoice.systemNameObjCl,
                                        operator.operatorName,
                                        operator.optionObj,
                                        operator.condValueObjMultiple[0]);
                                }
                                templateEditor.publishAndReload();
                            });
                        });
                        describe('Check condition', () => {
                            describe('clauses WITH numbering', () => {
                                beforeEach(() => {
                                    templateEditor.openTemplate(templateID.elementsInTable);
                                });
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        for (let j = 0; j < elementPOM.length; j++) {
                                            elements.selectElement(elementPOM[j], clausePOM[i], clausesData.clauseIndex[i]);
                                            conditions.checkCond(condition.objectName,
                                                questionData.multipleChoice.templateObjCl,
                                                questionData.multipleChoice.systemNameObjCl,
                                                operator.operatorName,
                                                operator.optionObj,
                                                operator.condValueObjMultiple[1]);
                                        }
                                    });
                                }
                            });
                            describe('clauses WITHOUT numbering', () => {
                                beforeEach(() => {
                                    templateEditor.openTemplate(templateID.elementsInTable);
                                });
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        for (let j = 0; j < elementPOM.length; j++) {
                                            elements.selectElement(elementPOM[j], clausePOM[i], clausesData.clauseIndex[i]);
                                            conditions.checkCond(condition.objectName,
                                                questionData.multipleChoice.templateObjCl,
                                                questionData.multipleChoice.systemNameObjCl,
                                                operator.operatorName,
                                                operator.optionObj,
                                                operator.condValueObjMultiple[0]);
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
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseTextObjCl);
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elementsInTable, el.name, el.numNegative);
                            });
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseTextObjCl);
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elementsInTable, el.name, el.numPositive);
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
                                elements.elementQuantity(templateID.elementsInTable, el.name, el.numNegative);
                            });
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseTextObjCl);
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elementsInTable, el.name, el.numPositive);
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
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObjCl,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elementsInTable, el.name, el.numNegative);
                                });
                            });
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObjCl,
                                questionData.multipleChoice.condoptionsValues).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elementsInTable, el.name, el.numPositive);
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
                                elements.elementQuantity(templateID.elementsInTable, el.name, el.numNegative);
                            });
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObjCl,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elementsInTable, el.name, el.numPositive);
                                });
                                documentEditor.saveDoc();
                                //documentEditor.downloadDoc('pdf');
                            });
                        });
                    });
                    break;
                }
                //contains, starts with, ends with
                case 6:
                case 8:
                case 10: {
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            element.forEach(el => {
                                elements.elementQuantity(templateID.elementsInTable, el.name, el.numNegative);
                            });
                            //
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObjCl,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elementsInTable, el.name, el.numPositive);
                                });
                                documentEditor.saveDoc();
                                //documentEditor.downloadDoc('pdf');
                            });
                        });
                    });
                    break;
                }
                case 7:
                case 9:
                case 11: {
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObjCl,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elementsInTable, el.name, el.numNegative);
                                });
                            });
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObjCl,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
                                element.forEach(el => {
                                    elements.elementQuantity(templateID.elementsInTable, el.name, el.numPositive);
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