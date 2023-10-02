const pool = require('../config/DataBase');
const bcrypt = require('bcrypt')
const { getTransactionById } = require('../utils/functions')

const detailUser = async (req, res) => {

    try {

        const { id, nome: userName, email: userEmail } = req.loggedUserId;
        const userProfile = { id, nome: userName, email: userEmail };

        return res.json(userProfile)
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });

    }

}

const updateUser = async (req, res) => {
    const loggedUserId = req.loggedUserId.id;

    const { nome, email, senha } = req.body;

    try {

        const encryptedPassword = await bcrypt.hash(senha, 10);
        await pool.query(
            'update usuarios set nome = $1, email = $2, senha = $3 where id = $4',
            [nome, email, encryptedPassword, loggedUserId]
        )

        return res.status(204).send()


    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }


}


const listCategories = async (req, res) => {
    const result = await pool.query(
        'select * from categorias'
    )

    return res.status(200).json(result.rows)
}

const listTransactions = async (req, res) => {

    const loggedUserId = req.loggedUserId.id;
    const { filtro: filter } = req.query;


    try {

        if (filter) {
            const transactionsFound = await pool.query(`
            select t.id, t.tipo, t.descricao, 
            t.valor, t.data, t.usuario_id, 
            t.categoria_id, c.descricao as categoria_nome 
            from 
            transacoes t join categorias c on t.categoria_id = c.id
            where t.usuario_id = $1 and c.descricao = ANY($2)`, [loggedUserId, [filter]])


            return res.status(200).json(transactionsFound.rows)

        }


        const result = await pool.query(`
            select t.id, t.tipo, t.descricao, 
            t.valor, t.data, t.usuario_id, 
            t.categoria_id, c.descricao as categoria_nome 
            from 
            transacoes t join categorias c on t.categoria_id = c.id
            where t.usuario_id = $1`, [loggedUserId])


        return res.status(200).json(result.rows);


    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}

const detailTransaction = async (req, res) => {

    const { id } = req.params;
    const loggedUserId = req.loggedUserId.id;

    try {

        const result = await pool.query(`
        select t.id, t.tipo, t.descricao, 
        t.valor, t.data, t.usuario_id, 
        t.categoria_id, c.descricao as categoria_nome 
        from 
        transacoes t join categorias c on t.categoria_id = c.id
        where t.usuario_id = $1 and t.id = $2`, [loggedUserId, id]);

        if (result.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' })

        }

        return res.status(200).json(result.rows[0]);



    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}


const registerTransaction = async (req, res) => {

    const loggedUserId = req.loggedUserId.id;
    const { descricao, valor, data, categoria_id, tipo } = req.body


    try {


        const newTransaction = await pool.query(`
            insert into transacoes
            (tipo, descricao, valor, data, usuario_id, categoria_id)
            values
            ($1,$2,$3,$4,$5,$6) returning *`, [tipo, descricao, valor, data, loggedUserId, categoria_id]
        );

        return res.status(200).json(newTransaction.rows[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}


const updateTransaction = async (req, res) => {

    const loggedUserId = req.loggedUserId.id;
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
        const transaction = await getTransactionById(pool, loggedUserId, id);

        if (transaction.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' });
        }

        await pool.query(`
        update transacoes
        set tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5
        where id = $6 and usuario_id = $7 `, [tipo, descricao, valor, data, categoria_id, id, loggedUserId,]);


        return res.status(204).send()

    } catch (error) {

        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}


const deleteTransaction = async (req, res) => {

    const loggedUserId = req.loggedUserId.id;
    const { id } = req.params;

    try {
        const transaction = await getTransactionById(pool, loggedUserId, id);


        if (transaction.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' });
        }

        await pool.query(`
        delete from transacoes
        where id = $1 and usuario_id = $2 `, [id, loggedUserId,]);

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}


const getExtract = async (req, res) => {

    const loggedUserId = req.loggedUserId.id;

    try {

        const { rows: entryQuery } = await pool.query(
            "select sum(valor) from transacoes where tipo like 'entrada' and usuario_id = $1;", [loggedUserId])

        const { rows: exitQuery } = await pool.query(
            "select sum(valor) from transacoes where tipo like 'saida' and usuario_id = $1;", [loggedUserId])


        const totalEntry = parseInt(entryQuery[0].sum) || 0;
        const totalExit = parseInt(exitQuery[0].sum) || 0;

        return res.json({ entrada: totalEntry, saida: totalExit })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}



module.exports = {
    detailUser,
    updateUser,
    listCategories,
    listTransactions,
    detailTransaction,
    registerTransaction,
    updateTransaction,
    deleteTransaction,
    getExtract
}