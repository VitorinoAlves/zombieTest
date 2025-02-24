const { test } = require('../support/index');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');


test('Deve cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;
    await executeSQL(`delete from movies where title = '${movie.title}'`)

    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);

    await page.toast.haveText('Cadastro realizado com sucesso!');
})