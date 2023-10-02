const pool = require('../config/DataBase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { tokenPassword } = require('../../sensitiveDate')


const userRegister = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const passwordEncrypt = await bcrypt.hash(senha, 10)

        const newUser = await pool.query('insert into usuarios ( nome, email, senha ) values ($1, $2, $3) returning *',
            [nome, email, passwordEncrypt])

        const { id, nome: userName, email: userEmail } = newUser.rows[0];

        const user = { id, nome: userName, email: userEmail };

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }

}

const userLogin = async (req, res) => {
    const { email, senha } = req.body

    try {

        const user = await pool.query('select * from usuarios where email = $1', [email])

        if (user.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Email ou Senha inválida' })
        }
        const passwordValid = await bcrypt.compare(senha, user.rows[0].senha)

        if (!passwordValid) {
            return res.status(404).json({ mensagem: "Email ou Senha inválida" })
        }

        const token = jwt.sign({ id: user.rows[0].id }, tokenPassword, { expiresIn: '1h' })

        const { id, nome: userName, email: userEmail } = user.rows[0];

        const loggedUser = { id, nome: userName, email: userEmail };

        return res.json({ loggedUser, token })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })

    }
}


module.exports = {
    userRegister,
    userLogin
}   
