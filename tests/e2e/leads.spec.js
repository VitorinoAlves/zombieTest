// @ts-check
const { test, expect } = require("@playwright/test");
const { faker } = require('@faker-js/faker');
const { Toast } = require('../actions/Components');
const { Leads } = require("../actions/Leads");


let landingPage
let toast;

test.beforeEach(async ({page}) => {
  landingPage = new Leads(page);
  toast = new Toast(page);
})

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const toastText = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.haveText(toastText);
});

test("Não deve cadastrar quando o email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const nweLead = await request.post('http://localhost:3333/leads', {
    data:{
      name: leadName,
      email: leadEmail
    }
  })
  expect(nweLead.ok()).toBeTruthy();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const toastText = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
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