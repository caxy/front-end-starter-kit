import { getWelcomeMessage } from 'modules/exampleModule';

describe('(Modules) exampleModule', () => {
    describe('getWelcomeMessage', () => {
        it('should return correct welcome message', () => {
            expect(getWelcomeMessage()).to.equal('Caxy Front End Starter Kit!');
        });
    });
});
