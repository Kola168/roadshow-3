import caseDetail from '../../../consts/case-analysis.json';

export default {
    getCase(caseId) {
        return caseDetail.cases[caseId];
    }
}