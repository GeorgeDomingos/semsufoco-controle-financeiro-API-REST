async function getTransactionById(pool, loggedUserId, id) {
    const result = await pool.query(`
select *
from 
transacoes
where usuario_id = $1 and id = $2`, [loggedUserId, id]);

return result
}


module.exports = {
    getTransactionById
}