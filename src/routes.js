const express = require('express');
const { userRegister, userLogin } = require('./controllers/users');
const { detailUser, updateUser, listCategories, listTransactions, detailTransaction, registerTransaction, updateTransaction, deleteTransaction, getExtract } = require('./controllers/transactions');
const {checkLoggedUser} = require('./middlewares/authentication');
const { checkName, checkEmail, checkPassword, checkExistingEmail, checkUserEmail, checkDescription, checkValue, checkDate, checkCategory, checkType } = require('./middlewares/validation');


const routes = express();

routes.post('/usuario', checkName, checkEmail, checkPassword, userRegister);
routes.post('/login', checkExistingEmail, checkPassword, userLogin);

routes.use(checkLoggedUser);

routes.get('/usuario', detailUser);
routes.put('/usuario', checkName, checkUserEmail, checkPassword, updateUser);
routes.get('/categoria', listCategories);
routes.get('/transacao', listTransactions);
routes.get('/transacao/extrato', getExtract);
routes.get('/transacao/:id', detailTransaction);
routes.post('/transacao', checkDescription, checkValue, checkDate, checkCategory, checkType, registerTransaction);
routes.put('/transacao/:id', checkDescription, checkValue, checkDate, checkCategory, checkType, updateTransaction);
routes.delete('/transacao/:id', deleteTransaction);



module.exports = routes;

