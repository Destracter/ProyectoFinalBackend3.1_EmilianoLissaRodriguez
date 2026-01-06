const express = require('express');
const request = require('supertest');
const { expect } = require('chai');

function createTestApp() {
  const app = express();
  app.use(express.json());

  const users = [ { _id: 'u1', first_name: 'Test', last_name: 'User', pets: [] } ];
  const pets = [ { _id: 'p1', name: 'Fido', specie: 'dog', adopted: false, owner: null } ];
  const adoptions = [ { _id: 'a1', owner: 'u1', pet: 'p1' } ];

  app.get('/api/adoptions', (req, res) => {
    res.send({ status: 'success', payload: adoptions });
  });

  app.get('/api/adoptions/:aid', (req, res) => {
    const adoption = adoptions.find(a => a._id === req.params.aid);
    if(!adoption) return res.status(404).send({ status: 'error', error: 'Adoption not found' });
    res.send({ status: 'success', payload: adoption });
  });

  app.post('/api/adoptions/:uid/:pid', (req, res) => {
    const { uid, pid } = req.params;
    const user = users.find(u => u._id === uid);
    if(!user) return res.status(404).send({ status: 'error', error: 'user Not found' });
    const pet = pets.find(p => p._id === pid);
    if(!pet) return res.status(404).send({ status: 'error', error: 'Pet not found' });
    if(pet.adopted) return res.status(400).send({ status: 'error', error: 'Pet is already adopted' });
    user.pets.push(pet._id);
    pet.adopted = true;
    pet.owner = user._id;
    const newAdoption = { _id: `a${adoptions.length+1}`, owner: user._id, pet: pet._id };
    adoptions.push(newAdoption);
    res.send({ status: 'success', message: 'Pet adopted' });
  });

  return app;
}

describe('Adoption Router functional tests', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('GET /api/adoptions - should return list of adoptions', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('payload').that.is.an('array');
  });

  it('GET /api/adoptions/:aid - success', async () => {
    const res = await request(app).get('/api/adoptions/a1');
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property('_id', 'a1');
  });

  it('GET /api/adoptions/:aid - not found', async () => {
    const res = await request(app).get('/api/adoptions/nonexistent');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error');
  });

  it('POST /api/adoptions/:uid/:pid - user not found', async () => {
    const res = await request(app).post('/api/adoptions/unknown/p1');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'user Not found');
  });

  it('POST /api/adoptions/:uid/:pid - pet not found', async () => {
    const res = await request(app).post('/api/adoptions/u1/unknown');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'Pet not found');
  });

  it('POST /api/adoptions/:uid/:pid - pet already adopted', async () => {
    await request(app).post('/api/adoptions/u1/p1');
    const res = await request(app).post('/api/adoptions/u1/p1');
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Pet is already adopted');
  });

  it('POST /api/adoptions/:uid/:pid - success', async () => {
    const freshApp = createTestApp();
    const res = await request(freshApp).post('/api/adoptions/u1/p1');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Pet adopted');
  });
});
