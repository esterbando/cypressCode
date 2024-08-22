import templateEditor from '../e2e/models/templateEditor';

export const clause = ['article', 'paragraph', 'subparagraph', 'point', 'item'];
export const clausePOM = [templateEditor.article, templateEditor.paragraphCy, templateEditor.subparagraph,
    templateEditor.point, templateEditor.item];
export const elementPOM = [templateEditor.elMarkup, templateEditor.elTextInput,
    templateEditor.elSelect, templateEditor.elMoney, templateEditor.elDate,
    templateEditor.elSwitcher, templateEditor.elButton, templateEditor.elLink,
    templateEditor.elCalculation, templateEditor.elImage, templateEditor.elRte,
    templateEditor.elPageNumber, templateEditor.elQR];

export const tableSelector = {
    elTable: {
        name: 'table',
        numPositive: 10,
        numNegative: 0
    },
    elTableRow: {
        name: 'table-row',
        numPositive: 10,
        numNegative: 0
    },
    //neexistuje v DE
    /*    elTableColumn: {
            name: 'table-column',
            numPositive: 10,
            numNegative: 0
        },*/
    elTableCell: {
        name: 'table-cell',
        numPositive: 10,
        numNegative: 0
    }
}
export const element = [
    {
        name: 'select',
        numPositive: 10,
        numNegative: 0
    },
    {
        name: 'money',
        numPositive: 10,
        numNegative: 0
    },
    {
        name: 'date',
        numPositive: 10,
        numNegative: 0
    },
    {
        name: 'counter',
        numPositive: 10,
        numNegative: 0
    },
    {
        name: 'link',
        numPositive: 10,
        numNegative: 0
    },
    {
        name: 'image',
        numPositive: 20,
        numNegative: 0
    },
    {
        name: 'textInput',
        numPositive: 20,
        numNegative: 0
    },
    {
        name: 'markup',
        numPositive: 70,
        numNegative: 40
    }]
export const condition = {
    objectName: 'Question',
    templateQuestionInST: '2. Question in ST',
};
export const data = {
    elInSt: {
        clauses: {
            documentID: 8510,
            artWithNum: [0, 1, 2, 3, 4],
            artWithoutNum: [5, 6, 7, 8, 9],
            clauseIndex: [0, 1, 2, 3, 4],
            answerQuestionIndex: 0,
            answerQuestionOption: 'no',
            textInClauseWithNum: [
                'TEST HERE - Article with numbering',
                'TEST HERE - Paragraph with numbering',
                'TEST HERE - Subparagraph with numbering',
                'TEST HERE - Point with numbering',
                'TEST HERE - Item with numbering'
            ],
            textInClauseWithoutNum: [
                'TEST HERE - Article without numbering',
                'TEST HERE - Paragraph without numbering',
                'TEST HERE - Subparagraph without numbering',
                'TEST HERE - Point without numbering',
                'TEST HERE - Item without numbering'],
            visible: true,
            notVisible: false,
            clauseNumbering: ['1', '2.1', '3.1.1', 'a', '●'],
            numOfClausesNegativeScenario: [8, 6, 4, 2, 0],
            numOfClausesPositiveScenario: [10, 10, 10, 10, 10],
            downloadWord: 'docx',
            downloadPdf: 'pdf',
        },
        templateID: {
            clauses: 19604,
            elements: 19606,
            elementsInTable: 19607,
            tables: 19608,
            question: 19610
        },

        question: {
            singleChoice: {
                clauseText: 'Question (options) Single Choice with activated/deactivated "First Option"',
                options: ['yes', 'no'],

                clauseTextObj: 'Question (Object Records) Single Choice with activated/deactivated "First Option"',
                optionsObj: ['financial value', 'identifier'],

                clauseTextCl: 'Question (options) Single Choice with activated/deactivated "First Option" placed in CL',
                optionsCl: ['', ''],
                templateCl: 'Single choice Question (options) - zadania 2.-11.',

                clauseTextObjCl: 'Question (Object Records) Single Choice with activated/deactivated "First Option" from CL',
                optionsObjCl: ['', ''],
                templateObjCl: 'Single + Multiple choice Question (OR) - zadania 2…',

                firstOptionActive: {
                    systemName: 'question-activated-first-option',
                    questionName: 'Question activated "first option"',

                    systemNameObj: 'or-question-activated-first-option',
                    questionNameObj: 'Question (OR) activated "first option"',

                    systemNameCl: 'cl-question-activated-first-option',
                    questionNameCl: 'CL - Question activated "first option"',

                    systemNameObjCl: 'cl-or-question-activated-first-option',
                    questionNameObjCl: 'CL Question (OR) activated "first option"',
                },
                firstOptionNonActive: {
                    systemName: 'question-deactivated-first-option',
                    questionName: 'Question deactivated "first option"',

                    systemNameObj: 'or-question-deactivated-first-option',
                    questionNameObj: 'Question (OR) deactivated "first option"',

                    systemNameCl: 'cl-question-deactivated-first-option',
                    questionNameCl: 'CL - Question deactivated "first option"',

                    systemNameObjCl: 'cl-or-question-deactivated-first-option',
                    questionNameObjCl: 'CL Question (OR) deactivated "first option"'
                },
            },
            multipleChoice: {
                systemName: 'multiple-choice-question-two-options-selected',
                questionName: 'Multiple choice Question - two options selected',
                clauseText: 'Question (Options) Multiple Choice (two/three options chosen)',
                options: ['one', 'two'],
                condValues: ['financial value', 'identifier', 'numerical value'],


                systemNameObj: 'or-multiple-choice-question-two-options-selected',
                questionNameObj: 'Multiple choice Question (OR) - two options selected',
                clauseTextObj: 'Question (Object Records) Multiple Choice (two/three options chosen)',

                systemNameCl: 'cl-multiple-choice-question-two-options-selected',
                questionNameCl: 'CL Multiple choice Question - two options selected',
                clauseTextCl: 'Question (Options) Multiple Choice (two/three options chosen) placed in CL',
                templateCl: 'Multiple choice Question (options) - zadania 2.-11…',

                systemNameObjCl: 'cl-or-multiple-choice-question-two-options-selecte…',
                questionNameObjCl: 'CL Multiple choice Question (OR) - two options selected',
                clauseTextObjCl: 'Question (Object Records) Multiple Choice (two/three options chosen) from CL',
                templateObjCl: 'Single + Multiple choice Question (OR) - zadania 2…',
            },
        },
    },
    elInNetBeforeSt: {},
    elInStBeforeSt: {},
    elInStBehindSt: {},
    elInNetBehindSt: {},
    elInHtBehindSt: {},
    elInHtAndNetBehindSt: {},
    netWithCondBeforeSt: {},
    netWithCondBehindSt: {},
    htWithCondBehindSt: {},
    htAndNetWithCondBehindSt: {},
    elAndCondInClInSt: {}
};