// @ts-check
const { test, expect } = require("@playwright/test");
const { faker } = require('@faker-js/faker');
const { LandingPage } = require('../pages/LandingPage');
const { Toast } = require('../pages/Components');


let landingPage
let toast;

test.beforeEach(async ({page}) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
})

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(faker.person.fullName(), faker.internet.email());

  const toastText = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.haveText(toastText);
});

test("Não deve cadastrar um lead com email incorreto", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Test Nome', 'test-email.com');

  await landingPage.alertHaveText('Email incorreto');
});

test("Não deve cadastrar um lead quando nome não é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'test@email.com');

  await landingPage.alertHaveText('Campo obrigatório');
});

test("Não deve cadastrar um lead quando email não é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Test Nome', '');

  await landingPage.alertHaveText('Campo obrigatório');
});

test("Não deve cadastrar um lead quando todos os campos não são preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});