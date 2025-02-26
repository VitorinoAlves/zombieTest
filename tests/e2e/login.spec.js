const { test, expect } = require('@playwright/test');

const { Login } =  require('../support/actions/Login');
const { Toast } = require('../support/actions/Components');
const { Movies } = require('../support/actions/Movies');

let loginPage;
let toast;
let moviesPage;
test.beforeEach(({page}) => {
    loginPage = new Login(page);
    toast = new Toast(page);
    moviesPage = new Movies(page);
})

test('Deve logar como admin', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await loginPage.isLoggedIn('Admin');
})

test('Não deve logar com senha incorreta', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', '123456');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await toast.haveText(message);
})

test('Não deve logar com e-mail inválido', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('test.test.com', '123456');
    await loginPage.alertHaveText('Email incorreto');
})

test('Não deve logar com campo e-mail vazio', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('', '123456');
    await loginPage.alertHaveText('Campo obrigatório');
})

test('Não deve logar com campo senha vazio', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('test@test.com', '');
    await loginPage.alertHaveText('Campo obrigatório');
})

test('Não deve logar com todos os campos vazios', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('', '');
    await loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório']);
})