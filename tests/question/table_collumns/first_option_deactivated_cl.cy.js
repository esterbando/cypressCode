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
import {tableSelector} from '../../../../../../fixtures/condData'

const internalUser = Cypress.env('legitoAdminUser');
const workspace = Cypress.env('masterWorkspace');
const questionData = data.elInSt.question;
const clausesData = data.elInSt.clauses;
const templateID = data.elInSt.templateID;

describe('Create condition on single choice question with ACTIVATED "first option" (clause library)', () => {
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
                        templateEditor.openTemplate(templateID.tables);
                        /*                conditions.cleanCondClauses(); //clean conditionsElements
                                        templateEditor.save();*/
                    });
                    describe('TEMPLATE EDITOR: conditions on clauses', () => {
                        describe('Set condition', () => {
                            it('clauses WITH numbering', () => {
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    //clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                    elements.selectTableCol(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        questionData.singleChoice.templateCl,
                                        questionData.singleChoice.firstOptionNonActive.systemNameCl,
                                        operator.operatorName,
                                        operator.option,
                                        operator.condValue);
                                }
                                templateEditor.publishAndReload();
                            });
                            it('clauses WITHOUT numbering', () => {
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    elements.selectTableCol(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        questionData.singleChoice.templateCl,
                                        questionData.singleChoice.firstOptionNonActive.systemNameCl,
                                        operator.operatorName,
                                        operator.option,
                                        operator.condValue);
                                }
                                templateEditor.publishAndReload();
                            });
                        });
                        describe('Check condition', () => {
                            describe('clauses WITH numbering', () => {
                                beforeEach(() => {
                                    templateEditor.openTemplate(templateID.tables);
                                });
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        elements.selectTableCol(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                        conditions.checkCond(condition.objectName,
                                            questionData.singleChoice.templateCl,
                                            questionData.singleChoice.firstOptionNonActive.systemNameCl,
                                            operator.operatorName,
                                            operator.option,
                                            operator.condValue);
                                    });
                                }
                            });
                            describe('clauses WITHOUT numbering', () => {
                                beforeEach(() => {
                                    templateEditor.openTemplate(templateID.tables);
                                });
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        elements.selectTableCol(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                        conditions.checkCond(condition.objectName,
                                            questionData.singleChoice.templateCl,
                                            questionData.singleChoice.firstOptionNonActive.systemNameCl,
                                            operator.operatorName,
                                            operator.option,
                                            operator.condValue);
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
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.singleChoice.clauseTextCl);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numNegative);
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.singleChoice.clauseTextCl);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
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
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numNegative);
                            //skryt question
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.singleChoice.clauseTextCl);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
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
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
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
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numNegative);
                            //answer question yes or not - doesnt matter
                            elements.answerQuestion(questionData.singleChoice.firstOptionNonActive.questionNameCl,
                                questionData.singleChoice.options[1]);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                    break;
                }
                case 0:
                case 6:
                case 8:
                case 10: {
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numNegative);
                            elements.answerQuestion(questionData.singleChoice.firstOptionNonActive.questionNameCl,
                                questionData.singleChoice.options[0]);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numNegative);
                            elements.answerQuestion(questionData.singleChoice.firstOptionNonActive.questionNameCl,
                                questionData.singleChoice.options[1]);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                    break;
                }
                case 1:
                case 7:
                case 9:
                case 11: {
                    //is not present
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
                            //answer Question 'yes'
                            elements.answerQuestion(questionData.singleChoice.firstOptionNonActive.questionNameCl,
                                questionData.singleChoice.options[0]);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numNegative);
                            //answer Question 'no'
                            elements.answerQuestion(questionData.singleChoice.firstOptionNonActive.questionNameCl,
                                questionData.singleChoice.options[1]);
                            elements.elementQuantity(templateID.tables, tableSelector.elTable.name, tableSelector.elTable.numPositive);
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                    break;
                }
            }
        });
    });
});