import { getWelcomeMessage } from 'modules/exampleModule';

describe('(Modules) exampleModule', () => {
    describe('getWelcomeMessage', () => {
        it('welcome message should be correct', () => {
            expect(getWelcomeMessage()).to.equal('Caxy Front End Starter Kit!');
        });
    });
});
