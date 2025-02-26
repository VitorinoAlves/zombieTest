const { test } = require('../support/index');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');


test.beforeAll(async ()=>{
    await executeSQL(`delete from movies`);
})

test('Deve cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;
    //await executeSQL(`delete from movies where title = '${movie.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured);

    await page.toast.haveText('Cadastro realizado com sucesso!');
})

test('Não deve cadastrar quando o título é duplicado', async ({ page }) => {
    const movie = data.duplicate;

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured);
    await page.toast.haveText('Cadastro realizado com sucesso!');

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured);
    await page.toast.haveText('Este conteúdo já encontra-se cadastrado no catálogo');
})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})