const request = require('supertest');
const { expect } = require('chai');

describe('Sessions functional tests', function() {
  let serverStarted = false;

  before(function (done) {
    this.timeout(5000);
    require('../src/main');
    setTimeout(() => { serverStarted = true; done(); }, 800);
  });

  it('POST /api/sessions/register - should register user', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/sessions/register')
      .send({ name: 'Tester', email: 'tester@example.com', password: 'pass123' })
      .set('Accept', 'application/json');
    expect(res.status).to.be.oneOf([200,201]);
    expect(res.body).to.have.property('id');
  });

  it('POST /api/sessions/login - should login user', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/sessions/login')
      .send({ email: 'tester@example.com', password: 'pass123' })
      .set('Accept', 'application/json');
    expect(res.status).to.be.oneOf([200,201]);
    expect(res.body).to.have.property('status', 'success');
  });
});
