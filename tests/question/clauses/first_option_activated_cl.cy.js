import conditions from '../../../../../../support/lib/conditions';
import clauses from '../../../../../../support/lib/clauses';
import templateEditor from '../../../../../../support/lib/templateEditor';
import documentEditor from '../../../../../../support/lib/documentEditor';
import elements from '../../../../../../support/lib/elements';
import dashboard from '../../../../../models/dashboard';
import {condition} from '../../../../../../fixtures/condData';
import {data} from '../../../../../../fixtures/condData';
import {operators} from '../../../../../../fixtures/condOperatorsData';
import {clause} from '../../../../../../fixtures/condData';

const internalUser = Cypress.env('legitoAdminUser');
const workspace = Cypress.env('masterWorkspace');
const clausesData = data.elInSt.clauses;
const questionData = data.elInSt.question;
const templateID = data.elInSt.templateID;

describe('Create condition on single choice question with ACTIVATED "first option" (clause library)', () => {
    before(() => {
        dashboard.loginIntoWorkspace(internalUser.email, internalUser.password, workspace);
    });
    Object.values(operators.question).forEach((operator, i) => {
        describe(`${operator.operatorName}`, () => {
            before(() => {
                templateEditor.openTemplate(templateID.clauses);
                conditions.cleanCondClauses();
                templateEditor.save();
            });
            describe('TEMPLATE EDITOR: conditions on clauses', () => {
                describe('Set condition', () => {
                    it('clauses WITH numbering', () => {
                        for (let i = 0; i < clausesData.artWithNum.length; i++) {
                            clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                            conditions.createCond(condition.objectName,
                                questionData.singleChoice.templateCl,
                                questionData.singleChoice.firstOptionActive.systemNameCl,
                                operator.operatorName,
                                operator.option,
                                operator.condValue);
                            clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                            conditions.checkCond(condition.objectName,
                                questionData.singleChoice.templateCl,
                                questionData.singleChoice.firstOptionActive.systemNameCl,
                                operator.operatorName,
                                operator.option,
                                operator.condValue);
                        }
                        templateEditor.publishAndReload();
                    });
                    it('clauses WITHOUT numbering', () => {
                        for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                            clauses.selectClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                            conditions.createCond(condition.objectName,
                                questionData.singleChoice.templateCl,
                                questionData.singleChoice.firstOptionActive.systemNameCl,
                                operator.operatorName,
                                operator.option,
                                operator.condValue);
                            clauses.selectClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                            conditions.checkCond(condition.objectName,
                                questionData.singleChoice.templateCl,
                                questionData.singleChoice.firstOptionActive.systemNameCl,
                                operator.operatorName,
                                operator.option,
                                operator.condValue);
                        }
                        templateEditor.publishAndReload();
                    });
                });
                describe('Check condition', () => {
                    describe('clauses WITH numbering', () => {
                        before(() => {
                            templateEditor.openTemplate(templateID.clauses);
                        });
                        for (let i = 0; i < clausesData.artWithNum.length; i++) {
                            it(`${clause[i]}`, () => {
                                clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                conditions.checkCond(condition.objectName,
                                    questionData.singleChoice.templateCl,
                                    questionData.singleChoice.firstOptionActive.systemNameCl,
                                    operator.operatorName,
                                    operator.option,
                                    operator.condValue);
                            });
                        }
                    });
                    describe('clauses WITHOUT numbering', () => {
                        before(() => {
                            templateEditor.openTemplate(templateID.clauses);
                        });
                        for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                            it(`${clause[i]}`, () => {
                                clauses.selectClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                conditions.checkCond(condition.objectName,
                                    questionData.singleChoice.templateCl,
                                    questionData.singleChoice.firstOptionActive.systemNameCl,
                                    operator.operatorName,
                                    operator.option,
                                    operator.condValue);
                            });
                        }
                    });
                });
            });
            switch (operator.operatorId) {
                case 2: {
                    //is present
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.singleChoice.clauseTextCl);
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.notVisible
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                    clausesData.notVisible
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesNegativeScenario[i]
                                );
                            }
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.singleChoice.clauseTextCl);
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.visible,
                                    clausesData.visible,
                                    clausesData.clauseNumbering[i]
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesPositiveScenario[i]
                                );
                            }
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
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.notVisible
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                    clausesData.notVisible
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesNegativeScenario[i]
                                );
                            }
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.singleChoice.clauseTextCl);
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.visible,
                                    clausesData.visible,
                                    clausesData.clauseNumbering[i]
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesPositiveScenario[i]
                                );
                            }
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
                        it('Check if condition met & download', () => {
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.notVisible
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                    clausesData.notVisible
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesNegativeScenario[i]
                                );
                            }
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
                        it('Check if condition met & download pdf', () => {
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.visible,
                                    clausesData.visible,
                                    clausesData.clauseNumbering[i]
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesPositiveScenario[i]
                                );
                            }
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                    break;
                }
                default: {
                    describe('DOCUMENT EDITOR', () => {
                        before(() => {
                            documentEditor.openDoc(clausesData.documentID);
                        });
                        it('Check if condition met & download', () => {
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.notVisible
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                    clausesData.notVisible
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesNegativeScenario[i]
                                );
                            }
                            elements.answerQuestion(questionData.singleChoice.firstOptionActive.questionNameCl, questionData.singleChoice.options[1]);
                            for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithNum[i],
                                    clausesData.textInClauseWithNum[i],
                                    clausesData.visible,
                                    clausesData.visible,
                                    clausesData.clauseNumbering[i]
                                );
                            }
                            for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                clauses.checkClause(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.artWithoutNum[i],
                                    clausesData.textInClauseWithoutNum[i],
                                );
                                clauses.clausesQuantity(
                                    templateID.clauses,
                                    clause[i],
                                    clausesData.numOfClausesPositiveScenario[i]
                                );
                            }
                            documentEditor.saveDoc();
                            //documentEditor.downloadDoc('pdf');
                        });
                    });
                }
            }
        });
    });
});
