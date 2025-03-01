const { expect } = require("@playwright/test");

export class Movies {
    constructor(page){
        this.page = page;
    }

    /*async isLoggedIn(){
            await this.page.waitForLoadState('networkidle');
            await expect(this.page).toHaveURL(/.*admin/);
            
            /*const logoutLink = this.page.locator('a[href="/logout"]');
            await expect(logoutLink).toBeVisible();*/
    //}

    async goForm(){
        await this.page.locator('a[href$="register"]').click();
    }

    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }

    async create(title, overview, company, releas_year, cover, featured){
        await this.goForm();
        await this.page.getByLabel('Titulo do filme').fill(title);
        await this.page.getByLabel('Sinopse').fill(overview);

        await this.page.locator('#select_company_id .react-select__indicator')
            .click();

        await this.page.locator('.react-select__option')
            .filter({hasText: company})
            .click();

        await this.page.locator('#select_year .react-select__indicator')
            .click();

        await this.page.locator('.react-select__option')
            .filter({hasText: releas_year})
            .click();

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + cover);

        if(featured){
            await this.page.locator('.featured .react-switch').click();
        }        

        await this.submit();
    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}