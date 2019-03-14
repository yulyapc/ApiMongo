let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

/*
let index = require('../src/index');
chai.use(chaiHttp);

describe('/GET', () => {
    it('Devolver todos los clientes', (done) => {
      chai.request(index)
          .get('/')
          .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
            done();
          });
    });
});

*/