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

describe('Create condition on multiple choice question - object', () => {
    before(() => {
        dashboard.loginIntoWorkspace(internalUser.email, internalUser.password, workspace);
    });
    Object.values(operators.question).forEach((operator, i) => {
        describe(`${operator.operatorName}`, () => {
            switch (operator.operatorId) {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11: {
                    before(() => {
                        templateEditor.openTemplate(templateID.clauses);
                        conditions.cleanCondClauses();
                        templateEditor.save();
                    });
                    describe('TEMPLATE EDITOR: conditions on clauses', () => {
                        describe('Set condition', () => {
                            it('Clauses WITH numbering', () => {
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        condition.templateQuestionInST,
                                        questionData.multipleChoice.systemNameObj,
                                        operator.operatorName,
                                        operator.optionObj,
                                        operator.condValueObjMultiple[1]);
                                    clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                    conditions.checkCond(condition.objectName,
                                        condition.templateQuestionInST,
                                        questionData.multipleChoice.systemNameObj,
                                        operator.operatorName,
                                        operator.optionObj,
                                        operator.condValueObjMultiple[1]);
                                }
                                templateEditor.publishAndReload();
                            });
                            it('Clauses WITHOUT numbering', () => {
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    clauses.selectClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                    conditions.createCond(condition.objectName,
                                        condition.templateQuestionInST,
                                        questionData.multipleChoice.systemNameObj,
                                        operator.operatorName,
                                        operator.optionObj,
                                        operator.condValueObjMultiple[0]);
                                    clauses.selectClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                    conditions.checkCond(condition.objectName,
                                        condition.templateQuestionInST,
                                        questionData.multipleChoice.systemNameObj,
                                        operator.operatorName,
                                        operator.optionObj,
                                        operator.condValueObjMultiple[0]);
                                }
                                templateEditor.publishAndReload();
                            });
                        });
                        describe('Check condition', () => {
                            describe('Clauses WITH numbering', () => {
                                before(() => {
                                    templateEditor.openTemplate(templateID.clauses);
                                });
                                for (let i = 0; i < clausesData.artWithNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        clauses.selectClause(clausesData.artWithNum[i], clausesData.clauseIndex[i]);
                                        conditions.checkCond(condition.objectName,
                                            condition.templateQuestionInST,
                                            questionData.multipleChoice.systemNameObj,
                                            operator.operatorName,
                                            operator.optionObj,
                                            operator.condValueObjMultiple[1]);
                                    });
                                }
                            });
                            describe('Clauses WITHOUT numbering', () => {
                                before(() => {
                                    templateEditor.openTemplate(templateID.clauses);
                                });
                                for (let i = 0; i < clausesData.artWithoutNum.length; i++) {
                                    it(`${clause[i]}`, () => {
                                        clauses.selectClause(clausesData.artWithoutNum[i], clausesData.clauseIndex[i]);
                                        conditions.checkCond(condition.objectName,
                                            condition.templateQuestionInST,
                                            questionData.multipleChoice.systemNameObj,
                                            operator.operatorName,
                                            operator.optionObj,
                                            operator.condValueObjMultiple[0]);
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
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseTextObj);
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
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseTextObj);
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
                            clauses.changeClauseVisibility(templateID.question, clause[0], questionData.multipleChoice.clauseTextObj);
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
                        it('Check if condition met & download pdf', () => {
                            //answer question one and two
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObj,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
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
                            });
                            //odklikni moznosti z question one and two
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObj,
                                questionData.multipleChoice.condoptionsValues).wait(7500).then(() => {
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
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObj,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
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
                            //
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObj,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
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
                                questionData.multipleChoice.questionNameObj,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
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
                            });
                            elements.chooseQuestionObjectValue(templateID.question,
                                questionData.multipleChoice.questionNameObj,
                                questionData.multipleChoice.condValues).wait(7500).then(() => {
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
                    });
                    break;
                }
            }
        });
    });
});
