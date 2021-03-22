const MIN_SEQUENCE_SIZE = 4
const MIN_SENQUENCE_FOUND = 2

const OnlyNucleotideRegex = /^[ATCG]+$/;
const quantifierNucleotideRegex = new RegExp(
    `(A{${MIN_SEQUENCE_SIZE}}|T{${MIN_SEQUENCE_SIZE}})|C{${MIN_SEQUENCE_SIZE}}|G{${MIN_SEQUENCE_SIZE}}`, 
    'g');

const isString = value => typeof value === 'string';

const isValidSequence = sequence => sequence.toUpperCase().match(OnlyNucleotideRegex);

const hasTheSameSize = dna =>
    dna.every(sequence => sequence.length === dna[0].length);

const isNxNTable = dna => 
    dna.length >= MIN_SEQUENCE_SIZE && dna.length === dna[0].length;

const isMutantSequence = sequence => sequence.match(quantifierNucleotideRegex) ? true: false;

const generateDNAMatrix = dna => dna.map(sequence => sequence.split(''));

const analyze = (dna) => {
    const dnaMatrix = generateDNAMatrix(dna);

    let mutantSequencesFound = 0;
    let leftObliqueSequence = '';
    let rightObliqueSequence = '';
    let startAt = 0;

    for(let i = 0; i < dnaMatrix.length; i++) {
        const horizontalSequence = dnaMatrix[i].join('');
        mutantSequencesFound += isMutantSequence(horizontalSequence) && 1;
        
        if (mutantSequencesFound >= MIN_SENQUENCE_FOUND) { break; }

        leftObliqueSequence += horizontalSequence.substring(startAt, startAt + 1);
        mutantSequencesFound += isMutantSequence(leftObliqueSequence) && 1;;
        
        if (mutantSequencesFound >= MIN_SENQUENCE_FOUND) { break; }
        
        rightObliqueSequence += dnaMatrix[i]
                                    .reverse()
                                    .join('')
                                    .substring(startAt, startAt + 1 );
        mutantSequencesFound += isMutantSequence(rightObliqueSequence) && 1;;

        startAt++;
        if (mutantSequencesFound >= MIN_SENQUENCE_FOUND) { break; }

        for(let j = 0; j < horizontalSequence.length; j++) {
            if ( i + 1 >= dnaMatrix.length) { break; }
            const complementarySequence = dnaMatrix.slice(0, i).map( sequence => sequence[j]).join('');
            const verticalSequence = complementarySequence + dnaMatrix[i + 1][j];
            
            mutantSequencesFound += isMutantSequence(verticalSequence) && 1;;

            if (mutantSequencesFound >= MIN_SENQUENCE_FOUND) { break; }
        }
    }
   return mutantSequencesFound >= MIN_SENQUENCE_FOUND;
}

const isMutant = dna => analyze(dna);

module.exports = {
    MIN_SEQUENCE_SIZE,
    isString,
    isValidSequence,
    hasTheSameSize,
    isNxNTable,
    isMutant
}