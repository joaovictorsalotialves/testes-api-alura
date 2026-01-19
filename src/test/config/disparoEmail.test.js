import 'dotenv/config'
import { describe, expect } from '@jest/globals'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
})

const verificarConexao = () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, sucess) => {
      if (error) {
        reject(error)
      } else {
        resolve(sucess)
      }
    })
  })
}

describe('Testando disparo de email', () => {
  it('O sistema deve validar se a conexão com o sistema de disparo de email está ok', async () => {
    const estaConectado = true

    const validarConexao = await verificarConexao()

    expect(validarConexao).toStrictEqual(estaConectado)
  })
})
