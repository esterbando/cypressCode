import IGeneral from './interface/IGeneral';

class General extends IGeneral {
    login() {
    }

    waitUntil(callback) {
        cy.waitUntil(callback);
    }
}

module.exports = new General();