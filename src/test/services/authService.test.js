import { describe, expect, it } from '@jest/globals'
import AuthService from '../../services/authService.js'

const authService = new AuthService()

describe('Testando a authService.cadastrarUsuario', () => {
  it('Não deve cadastrar usuario sem informar a senha', async () => {
    const usuarioMock = {
      nome: 'João Silva',
      email: 'joao.silva@email.com',
    }

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock)

    await expect(usuarioSalvo).rejects.toThrowError('A senha do usuario é obrigatória!')
  })
})
