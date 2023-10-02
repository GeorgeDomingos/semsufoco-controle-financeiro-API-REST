const pool = require('../config/DataBase')

const checkName = (req, res, next) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo 'Nome' é obrigatorio" })
    }

    next();
}

const checkEmail = async (req, res, next) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ mensagem: "O campo 'Email' é obrigatorio" })
    }

    try{
        const existingEmail = await pool.query('select email from usuarios where email = $1', [email])

        if (existingEmail.rowCount > 0) {
            return res.status(400).json({ mensagem: "Email já utilizado" });
        }
    }catch(error){
        return res.status(500).json({mensagem: 'Erro interno do servidor'});
    }

    next();
}

const checkPassword = (req, res, next) => {
    const { senha } = req.body

    if (!senha) {
        return res.status(400).json({ mensagem: "O campo 'Senha' é obrigatorio" })
    }

    next();
}

const checkExistingEmail = async (req, res, next) => {
    const { email } = req.body

    try{
        const existingEmail = await pool.query('select email from usuarios where email = $1', [email])

        if (existingEmail.rowCount < 1) {
            return res.status(400).json({ mensagem: "Email ou Senha inválida" });
        }
    }catch(error){
        return res.status(500).json({mensagem: 'Erro interno do servidor'});
    }

    next();
}

const checkUserEmail = async (req, res, next) => {
    const loggedUserId = req.loggedUserId.id;
    const {email} = req.body; 

    if (!email) {
        return res.status(400).json({ mensagem: "O campo 'Email' é obrigatorio" })
    }
    
    try {
        const existingEmail = await pool.query('select email, id from usuarios where email = $1', [email]);

        if (existingEmail.rowCount > 0) {
            if(loggedUserId != existingEmail.rows[0].id){
                return res.status(400).json({mensagem:'O e-mail informado já está sendo utilizado por outro usuário.'})  
            }
        }

    }catch(error){
        return res.status(500).json({mensagem: 'Erro interno do servidor'});
    }

    next();

}

const checkDescription = (req, res, next) => {
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).json({ mensagem: "O campo 'Descrição' é obrigatorio" })
    }

    next();

}

const checkValue = (req, res, next) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ mensagem: "O campo 'Valor' é obrigatorio" })
    }

    next();

}

const checkDate = (req, res, next) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ mensagem: "O campo 'Data' é obrigatorio" })
    }

    next();

}

const checkCategory = async (req, res, next) => {
    const { categoria_id } = req.body;

    if (!categoria_id) {
        return res.status(400).json({ mensagem: "O campo 'Categoria_id' é obrigatorio" })
    }

    try {
        const category = await pool.query(`
        select * from categorias where id = $1`, [categoria_id]);
    
        if(category.rowCount < 1) {
            return res.status(400).json({mensagem:'Id da categoria inválido'})
        }

    }catch(error){
        return res.status(500).json({mensagem: 'Erro interno do servidor'});
    }

    next();

}


const checkType = (req, res, next) => {
    const { tipo } = req.body;

    if (!tipo) {
        return res.status(400).json({ mensagem: "O campo 'Tipo' é obrigatorio" })
    }

    if(tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({mensagem: "O campo 'Tipo' deve ser entrada/saída"}) 
    }

    next();

}



module.exports = {
    checkName,
    checkEmail,
    checkPassword,
    checkExistingEmail,
    checkUserEmail,
    checkDescription,
    checkValue,
    checkDate,
    checkCategory,
    checkType
}