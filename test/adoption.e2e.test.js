const request = require('supertest');
const { expect } = require('chai');
const { Test } = require('@nestjs/testing');
const { INestApplication } = require('@nestjs/common');

const AppModule = require('../src/app.module').AppModule;
const JwtAuthGuard = require('../src/auth/jwt-auth.guard').JwtAuthGuard;

describe('Adoption Module e2e', function () {
  this.timeout(10000);
  let app;
  let server;

  before(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  after(async () => {
    await app.close();
  });

  it('GET /adoptions - initially empty array', async () => {
    const res = await request(server).get('/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(0);
  });

  let createdId;

  it('POST /adoptions - create adoption', async () => {
    const res = await request(server)
      .post('/adoptions')
      .send({ petId: 'pet1', userId: 'user1' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.include({ petId: 'pet1', userId: 'user1' });
    createdId = res.body.id;
  });

  it('GET /adoptions - contains created item', async () => {
    const res = await request(server).get('/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.find(i => i.id === createdId)).to.exist;
  });

  it('GET /adoptions/:id - success', async () => {
    const res = await request(server).get(`/adoptions/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', createdId);
  });

  it('PUT /adoptions/:id - update', async () => {
    const res = await request(server)
      .put(`/adoptions/${createdId}`)
      .send({ petId: 'pet2' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('petId', 'pet2');
  });

  it('DELETE /adoptions/:id - remove', async () => {
    const res = await request(server).delete(`/adoptions/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ ok: true });
  });

  it('GET /adoptions/:id - not found after delete', async () => {
    const res = await request(server).get(`/adoptions/${createdId}`);
    expect(res.status).to.equal(404);
  });
});
