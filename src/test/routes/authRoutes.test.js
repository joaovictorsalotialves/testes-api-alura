import { afterEach, beforeEach, describe } from '@jest/globals'
import request from 'supertest'
import app from '../../app.js'

let servidor
beforeEach(() => {
  const port = 3000
  servidor = app.listen(port)
})

afterEach(() => {
  servidor.close()
})

describe('Testando a rota login', () => {
  it('O login deve possuir um email e senha para de autenticar', async () => {
    const loginMock = {
      email: 'teste@gmail.com',
    }

    await request(servidor).post('/login').send(loginMock).expect(500).expect('"A senha de usuario é obrigatório."')
  })

  it('O login deve validar se o usuario esta cadastrado', async () => {
    const loginMock = {
      email: 'raphael.teste@teste.com.br',
      senha: '123456',
    }

    await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario não cadastrado."')
  })

  it('O login deve validar email e senha incorreto', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '12345',
    }

    await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."')
  })

  it('O login deve validar se esta sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '123456',
    }

    const resposta = await request(app).post('/login').set('Accept', 'application/json').send(loginMock).expect(201)

    expect(resposta.body.message).toBe('Usuario conectado')
    expect(resposta.body).toHaveProperty('accessToken')
  })
})
