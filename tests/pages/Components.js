const { expect } = require("@playwright/test");

export class Toast {
    constructor(page){
        this.page = page;
    }

    async haveText(toastText){
        const toast = this.page.locator('.toast');

        await expect(toast).toHaveText(toastText);
        await expect(toast).not.toBeVisible({timeout: 5000});
    }
}