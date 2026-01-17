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
})
