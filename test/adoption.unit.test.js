const { expect } = require('chai');
const AdoptionService = require('../src/adoption/adoption.service').AdoptionService;

describe('AdoptionService unit tests', () => {
  let service;

  beforeEach(() => {
    service = new AdoptionService();
  });

  it('should create an adoption', () => {
    const dto = { petId: 'p1', userId: 'u1' };
    const item = service.create(dto);
    expect(item).to.have.property('id');
    expect(item).to.include({ petId: 'p1', userId: 'u1' });
  });

  it('should find one by id', () => {
    const dto = { petId: 'p2', userId: 'u2' };
    const created = service.create(dto);
    const found = service.findOne(created.id);
    expect(found).to.deep.equal(created);
  });

  it('should update an adoption', () => {
    const created = service.create({ petId: 'p3', userId: 'u3' });
    const updated = service.update(created.id, { petId: 'p3-mod' });
    expect(updated).to.have.property('petId', 'p3-mod');
  });

  it('should remove an adoption', () => {
    const created = service.create({ petId: 'p4', userId: 'u4' });
    const ok = service.remove(created.id);
    expect(ok).to.equal(true);
    expect(service.findOne(created.id)).to.equal(null);
  });
});
