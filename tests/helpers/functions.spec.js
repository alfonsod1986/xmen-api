import { isString, isValidSequence, hasTheSameSize, isNxNTable, analyze } from '../../src/helpers';

describe('isString', () => {
    it('Should return true if send a string value', () => {
        const value = 'I\'m a string';

        expect(isString(value)).toBeTruthy();
    });

    it('Should return false if send a null value', () => {
        expect(isString(null)).toBeFalsy();
    });

    it('Should return false if send a number value', () => {
        expect(isString(3)).toBeFalsy();
    });

    it('Should return false if send an object', () => {
        expect(isString({})).toBeFalsy();
    });

    it('Should return false if send an array', () => {
        expect(isString([])).toBeFalsy();
    });
});

describe('isValidSequence', () => {
    it('Should return true if send a valid sequence', () => {
        const sequence = 'ATGCGAA';

        expect(isValidSequence(sequence)).toBeTruthy();
    });

    it('Should return false if send an invalid sequence', () => {
        const sequence = 'ATGCGAAXAW321MNUIOLPÑ';

        expect(isValidSequence(sequence)).toBeFalsy();
    });
});

describe('hasTheSameSize', () => {
    it('Should return true if send a dna with equal sequence sizes', () => {
        const dna = ['ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA'];

        expect(hasTheSameSize(dna)).toBeTruthy();
    });

    it('Should return false if send a dna with different sequence sizes', () => {
        const dna = ['ATGCGAAATTCCCCG', 'A', 'ATGCGAA', 'ATG', 'ATGCGAA', 'ATGCGAA']

        expect(hasTheSameSize(dna)).toBeFalsy();
    });
});

describe('isNxNTable', () => {
    it('Should return true if send a dna  N x N table', () => {
        const dna = ['ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA']

        expect(isNxNTable(dna)).toBeTruthy();
    });

    it('Should return false if send a dna with different sequence sizes', () => {
        const dna = ['ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA']

        expect(isNxNTable(dna)).toBeFalsy();
    });
});

describe('Verifying DNA sequences', ()=> {
    it('Should return true if dna is mutant', () => {
        const dna = ['ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA'];

        const isMutant = Array.isArray(dna) &&  dna.length != 0 && 
            dna.every(isString) && dna.every(isValidSequence)  && hasTheSameSize(dna) && isNxNTable(dna) && analyze(dna);
        
        expect(isMutant).toBeTruthy();
    });

    it('Should return false if dna is not mutant', () => {
        const dna = ['ATGCGAA', null, undefined, 3, {}, 'ATGCGAA'];

        const isMutant = Array.isArray(dna) &&  dna.length != 0 && 
            dna.every(isString) && dna.every(isValidSequence)  && hasTheSameSize(dna) && isNxNTable(dna) && analyze(dna);
        
        expect(isMutant).toBeFalsy();
    });
});