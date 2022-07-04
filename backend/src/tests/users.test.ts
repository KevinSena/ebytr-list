import 'mocha';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users endpoint test', () => {
  let chaiResponse

  it('Devolve usuário pelo id', async () => {
    chaiResponse = await chai.request(app)
      .post('/user/login').send({"nickname": "kevin", "password": "secret_user"});

      expect(chaiResponse).to.have.status(200);
      expect(chaiResponse.body).to.be.an('object');
      expect(chaiResponse.body.token).to.be.a('string');
      expect(chaiResponse.body.user).to.have.all.keys(['id', 'username', 'nickname']);
  })
  it('Devolve erro se nick incorreto', async () => {
    chaiResponse = await chai.request(app)
      .post('/user/login').send({"nickname": "sena", "password": "secret_user"});

      expect(chaiResponse).to.have.status(401);
      expect(chaiResponse.body.message).to.be.equal('Incorrect nick or password');
  })
  it('Devolve erro se senha incorreto', async () => {
    chaiResponse = await chai.request(app)
      .post('/user/login').send({"nickname": "kevin", "password": "secret_usuario"});

      expect(chaiResponse).to.have.status(401);
      expect(chaiResponse.body.message).to.be.equal('Incorrect nick or password');
  })
});
