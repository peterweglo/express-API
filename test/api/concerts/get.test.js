const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  it('should get all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('/:id should return one concert by :id', async () => {
    const concerts = await Concert.find();
    const concertId = concerts[0].id;
    const res = await request(server).get(`/api/concerts/${concertId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.equal(concertId.toString());
  });

  it('/performer/:performer should return concerts by performer', async () => {
    const performerName = 'John Doe';
    const res = await request(server).get(
      `/api/concerts/performer/${performerName}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/genre/:genre should return concerts from genre', async () => {
    const genreName = 'R&B';
    const res = await request(server).get(`/api/concerts/genre/${genreName}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/price/:price_min/:price_max should return concerts within a price range', async () => {
    const priceMin = 30;
    const priceMax = 50;
    const res = await request(server).get(
      `/api/concerts/price/${priceMin}/${priceMax}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/day/:day should return concerts on a chosen day', async () => {
    const day = 1;
    const res = await request(server).get(`/api/concerts/day/${day}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });
});
