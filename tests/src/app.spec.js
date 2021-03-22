import { startServer } from '../../src/fake.server';
import { MIN_SEQUENCE_SIZE } from '../../src/helpers/index'
import supertest from 'supertest';

describe('Testing API', () => {
    let request = null;
    beforeAll(async() => {
        let app = await startServer();
        request = supertest(app);
    });

    it('API should return status 404 if the route does not exist', async() => {
        await request.get('/does-not-exits')
            .expect(404);
    });

    it('POST /mutant should return status 400 if not send dna array', async() => {
        await request.post('/mutant')
            .expect(400);
    });

    it('POST /mutant should return status 400 if dna is not an array', async() => {
        await request.post('/mutant')
            .send({ dna: null })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe('dna must be an array');
            });
    });

    it('POST /mutant should return status 400 if dna is an empty array', async() => {
        await request.post('/mutant',{ dna: [] })
            .send({ dna: [] })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe('dna must not be empty');
            });
    });

    it('POST /mutant should return status 400 if dna sequences are not strings', async() => {
        const dna = ['ATGCGAA', null, undefined, 3, {}, 'ATGCGAA'];

        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe('All dna sequences must be strings');
            });
    });

    it('POST /mutant should return status 400 if dna sequences are not valid and contains more than A,T,G,C letters', async() => {
        const dna = ['ATGCGAAATTCCCCG', 'AXHH56', 'alepJCAQPE', 'ATG', 'ATGCGAA', 'ATGCGAA'];
        
        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe('All dna sequences must be valid and only contains A,T,G,C');
            });
    });

    it('POST /mutant should return status 400 if dna sequences size are not equal', async() => {
        const dna = ['ATGCGAAATTCCCCG', 'A', 'ATGCGAA', 'ATG', 'ATGCGAA', 'ATGCGAA']
        
        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe('All dna sequences sizes must be equal');
            });
    });

    it('POST /mutant should return status 400 if dna is not a N x N table', async() => {
        const dna = ['ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA'];
        
        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe(`dna must be a ${MIN_SEQUENCE_SIZE} x ${MIN_SEQUENCE_SIZE} table`);
            });
    });


    it('POST /mutant should return status 400 if dna is not a N x N table', async() => {
        const dna = ['ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA', 'ATGCGAA'];
        
        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(400)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe(`dna must be a ${MIN_SEQUENCE_SIZE} x ${MIN_SEQUENCE_SIZE} table`);
            });
    });

    it('POST /mutant should return status 403 if dna is not a mutant', async() => {
        const dna = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
        
        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(403)
            .then(({ body: response }) => {
                expect(response.success).toBe(false);
                expect(response.message).toBe('Not mutant');
            });
    });

    it('POST /mutant should return status 200 if dna is a mutant', async() => {
        const dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
        
        await request.post('/mutant',{ dna })
            .send({ dna })
            .expect(200)
            .then(({ body: response }) => {
                expect(response.success).toBe(true);
                expect(response.message).toBe('Mutant');
            });
    });

    it('GET /stats should return count_mutant_dna, count_human_dna and ratio properties on response', async() => {
        const attributes = ['count_mutant_dna', 'count_human_dna', 'ratio'];
        await request.get('/stats')
            .expect(200)
            .then(({ body: response}) => {
                const keys = Object.keys(response);
                
                expect(keys.join('') == attributes.join('')).toBe(true);
            });
    });
});
