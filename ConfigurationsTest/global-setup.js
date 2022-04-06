// global-setup.js
const { chromium } = require('@playwright/test');
const env = process.env.APP_ENV
const qaCookies = "./authqa.json"
const prodCookies = "./authprod.json"
let auth;



module.exports = async config => {
  const browser = await chromium.launch();
    if(env === "qa"){
        auth = qaCookies
      }
      else if(env === "prod"){
        auth = prodCookies
      } 
  const context = await browser.newContext({
    storageState : auth
  })
  const page = await context.newPage()
};