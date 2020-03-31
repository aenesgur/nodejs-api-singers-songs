const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, singerId;

describe('api/singers test',()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'testUser', password: '123456'})
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
      });

      describe('/GET singers',()=>{
        it('it should GET all singers',(done)=>{
            chai.request(server)
                .get('/api/singers')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });
      });

      describe('/GET group singers',()=>{
        it('it should GET only groups singers',(done)=>{
            chai.request(server)
                .get('/api/singers/group')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });
      });

      describe('/POST singers',()=>{
          it('it should POST the singer',(done)=>{
          const singerTestData = {
              name: 'Test Name',
              surname: 'Test Surname',
              is_group:true,
              country: 'Test Country'
            }
              chai.request(server)
                .post('/api/singers')
                .send(singerTestData)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('is_group');
                    res.body.should.have.property('country');
                    singerId=res.body._id;
                    done();
                });
          });
      });

      describe('/GET/:singer_id singers',()=>{
        it('it should GET the singer by the singer id',(done)=>{
            chai.request(server)
                .get('/api/singers/'+singerId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(singerId);
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('is_group');
                    res.body.should.have.property('country');
                    done();
                });
            });
      });

      describe('/PUT/:singer_id singers',()=>{
        it('it should UPDATE the singer by the singer id',(done)=>{
            const singerTestData = {
                name: 'Test Name 2',
                surname: 'Test Surname 2',
                is_group:false,
                country: 'Test Country 2'
              }
            chai.request(server)
                .put('/api/singers/'+singerId)
                .send(singerTestData)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(singerTestData.name);
                    res.body.should.have.property('surname').eql(singerTestData.surname);
                    res.body.should.have.property('is_group').eql(singerTestData.is_group);
                    res.body.should.have.property('country').eql(singerTestData.country);
                    done();
                });
                
            });
      });

      describe('/DELETE/:singer_id singers',()=>{
        it('it should DELETE the singer by the singer id',(done)=>{
            chai.request(server)
                .delete('/api/singers/'+singerId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })
        })
      });
});