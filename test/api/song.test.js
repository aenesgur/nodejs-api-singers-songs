const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, songId;

describe('/api/songs tests',()=>{
  before((done)=>{
    chai.request(server)
        .post('/authenticate')
        .send({ username: 'testUser', password: '123456'})
        .end((err,res)=>{
            token = res.body.token;
            done();
        });
  });
  
    describe('/GET songs', ()=>{
        it('it should GET all the songs',(done)=>{
        chai.request(server)
            .get('/api/songs')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
  })

    describe('/POST song',()=>{
        it('it should POST a song',(done)=>{
        const songTestData = {
            name: 'Test Name',
            singer_id: '5e80ed089e042f3fe43bcd83',
            type: 'Test Type',
            published_year: 2000,
            sold_piece: 100
        };

        chai.request(server)
            .post('/api/songs')
            .send(songTestData)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('singer_id');
                res.body.should.have.property('type');
                res.body.should.have.property('published_year');
                res.body.should.have.property('sold_piece');
                songId = res.body._id;
                done();
            });
        });
    });

    describe('/GET/:song_id song',()=>{
        it('it should GET a song by the given song id',(done)=>{
            chai.request(server)
                .get('/api/songs/'+songId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(songId);
                    res.body.should.have.property('name');
                    res.body.should.have.property('singer_id');
                    res.body.should.have.property('type');
                    res.body.should.have.property('published_year');
                    res.body.should.have.property('sold_piece');
                    done();
                })
        });
    });

    describe('/PUT/:song_id song',()=>{
        it('it should UPDATE a song by the given song id',(done)=>{
        const songTestData = {
            name: 'Test Name 2',
            singer_id: '5e80ed089e042f3fe43bcd83',
            type: 'Test Type 2',
            published_year: 2005,
            sold_piece: 105
        };

        chai.request(server)
            .put('/api/songs/'+songId)
            .send(songTestData)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(songTestData.name);
                res.body.should.have.property('singer_id').eql(songTestData.singer_id);
                res.body.should.have.property('type').eql(songTestData.type);
                res.body.should.have.property('published_year').eql(songTestData.published_year);
                res.body.should.have.property('sold_piece').eql(songTestData.sold_piece);
                done();
            });
        });
    });

    describe('/DELETE/:song_id song',()=>{
        it('it should DELETE a song by the given song id',(done)=>{
        chai.request(server)
            .delete('/api/songs/'+songId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
        });
    });


});