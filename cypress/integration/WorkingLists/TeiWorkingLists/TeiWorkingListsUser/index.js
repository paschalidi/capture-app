import '../../sharedSteps';
import '../../../sharedSteps';

beforeEach(() => {
    cy.loginThroughForm();
});

Given('you open the main page with Ngelehun and child programme context', () => {
    cy.visit('#/?programId=IpHINAT79UW&orgUnitId=DiszpKrYNg8');
});

Then('the default working list should be displayed', () => {
    const names = [
        'Alan',
        'Alan',
        'Andrea',
        'Anna',
        'Anthony',
        'Donald',
        'Donald',
        'Donna',
        'Elizabeth',
        'Emily',
        'Emma',
        'Emma',
        'Evelyn',
        'Filona',
        'Frances',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});

When('you select the working list called completed enrollments', () => {
    cy.get('[data-test="workinglists-template-selector-chips-container"]')
        .contains('Completed enrollments')
        .click();
});

Then('the list should display teis with a completed enrollment', () => {
    const names = [
        'Alan Thompson',
        'Emma Johnson',
        'Filona Ryder',
        'Frank Fjordsen',
        'Gertrude Fjordsen',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 6)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[0])
                    .should('exist');

                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[1])
                    .should('exist');
            }
        });
});

Then('the enrollment status filter button should show that the completed filter is in effect', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status: Completed')
        .should('exist');
});

When('you set the enrollment status filter to completed', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status')
        .click();

    cy.get('[data-test="list-view-filter-contents"]')
        .contains('Completed')
        .click();
});

When('you apply the current filter', () => {
    cy.get('[data-test="list-view-filter-apply-button"]')
        .click();
});

When('you set the enrollment status filter to active', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status')
        .click();

    cy.get('[data-test="list-view-filter-contents"]')
        .contains('Active')
        .click();
});

When('you set the assginee filter to none', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Assigned to')
        .click();

    cy.get('[data-test="list-view-filter-contents"]')
        .contains('None')
        .click();
});

Then('the enrollment status filter button should show that the active filter is in effect', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status: Active')
        .should('exist');
});

Then('the assignee filter button should show that unassigned filter is in effect', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Assigned to: None')
        .should('exist');
});

Then('the list should display teis with an active enrollment and unassinged events', () => {
    const names = [
        'Alan',
        'Alan',
        'Andrea',
        'Anna',
        'Anthony',
        'Donald',
        'Donald',
        'Donna',
        'Elizabeth',
        'Emily',
        'Emma',
        'Evelyn',
        'Frances',
        'Heather',
        'Jack',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});

Then('the list should display teis with John as the first name', () => {
    const names = [
        'John',
        'John',
        'Johnny',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 4)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});


When('you open the column selector', () => {
    cy.get('button[title="Select columns"]')
        .click();
});

When('you select the registering unit and save from the column selector', () => {
    cy.get('div[role="dialog"]')
        .contains('Registering unit')
        .find('input')
        .click();

    cy.get('div[role="dialog"]')
        .contains('Save')
        .click();
});

Then('the registering unit should display in the list', () => {
    cy.get('[data-test="online-list-table"]')
        .contains('Registering unit')
        .should('exist');
});

Then('the list should display data for the second page', () => {
    const names = [
        'Frank',
        'Gertrude',
        'Heather',
        'Jack',
        'James',
        'Joe',
        'John',
        'John',
        'Johnny',
        'Julia',
        'Lily',
        'Maria',
        'Noah',
        'Olvia',
        'Scott',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[0])
                    .should('exist');
            }
        });
});

Then('the list should display 10 rows of data', () => {
    const names = [
        'Alan',
        'Alan',
        'Andrea',
        'Anna',
        'Anthony',
        'Donald',
        'Donald',
        'Donna',
        'Elizabeth',
        'Emily',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 11)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[0])
                    .should('exist');
            }
        });
});

When('you click the first name column header', () => {
    cy.get('[data-test="online-list-table"]')
        .contains('First name')
        .click();
});

Then('the list should display data ordered descendingly by first name', () => {
    const names = [
        'Wayne',
        'Tom',
        'Tom',
        'Tim',
        'Sophia',
        'Sharon',
        'Scott',
        'Olvia',
        'Noah',
        'Maria',
        'Lily',
        'Julia',
        'Johnny',
        'John',
        'John',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});
