const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.builtincolorado.com/jobs')
  .end()
  .type('#edit-search-api-fulltext', 'front end developer')
  .click('#edit-submit-jobs')
  .wait(5000)
  .evaluate(() => {
    const jobLinks = [...document.querySelectorAll('.wrap-view-page a')];

    return jobLinks.map(link => {
      return link.href;
    });
  })
  .then(result => {
    console.log('Everything works', result);
  })
  .catch(error => console.log('something went wrong', error));
