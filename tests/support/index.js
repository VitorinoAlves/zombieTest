const { test: base } = require('@playwright/test');

const { Leads } = require('./actions/Leads');
const { Login } =  require('./actions/Login');
const { Toast } = require('./actions/Components');
const { Movies } = require('./actions/Movies');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)
        await use(page);
    }
})

export { test }