import Case from '../../../json/cases/cases.json';

export default {
    getCase(caseId) {
        return Case.cases[caseId];
    }
}