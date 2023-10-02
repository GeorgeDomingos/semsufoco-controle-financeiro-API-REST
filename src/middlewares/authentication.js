const jwt = require('jsonwebtoken');
const { tokenPassword } = require('../../sensitiveDate');
const pool = require('../config/DataBase');


const checkLoggedUser = async (req, res, next) =>{
    const {authorization} = req.headers;

    if (!authorization || authorization === 'Bearer') {
        return res.status(401).json({mensagem: "Usuário não logado"})
    }
    const token = authorization.split(' ')[1]

    try{
        const {id} = jwt.verify(token,tokenPassword);

        const fetchUser = await pool.query(`
            select * 
            from usuarios 
            where id=$1`, [id]);

        if (fetchUser.rowCount < 1) {
            return res.status(401).json({mensagem: "Usuário inválido"})
        }

        req.loggedUserId = fetchUser.rows[0]

        next()

        

    }catch(error){
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }




}




module.exports = {checkLoggedUser}
