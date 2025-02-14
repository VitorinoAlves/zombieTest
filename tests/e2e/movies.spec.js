const { test } = require('@playwright/test');

const data = require('../support/fixtures/movies.json');

const { LoginPage } =  require('../pages/LoginPage');
const { Toast } = require('../pages/Components');
const { MoviesPage } = require('../pages/MoviesPage');

let loginPage;
let toast;
let moviesPage;
test.beforeEach(({page}) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
})

test('Deve cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

    await toast.haveText('Cadastro realizado com sucesso!');
})