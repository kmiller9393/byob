const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

// nightmare
//   .goto('https://www.builtincolorado.com/jobs')
//   .end()
//   .type('#edit-search-api-fulltext', 'front end developer')
//   .click('#edit-submit-jobs')
//   .wait(5000)
//   .evaluate(() => {
//     const jobLinks = [...document.querySelectorAll('.wrap-view-page a')];

//     return jobLinks.map(link => {
//       return link.href;
//     });
//   })
//   .then(result => {
//     console.log('Everything works', result);
//   })
//   .catch(error => console.log('something went wrong', error));

nightmare
  .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=softw&sc.keyword=Software+Developer&locT=C&locId=1148170&jobType=')
  .end()
  .evaluate(() => {
    const jobDesciptionContainer = document.querySelector('#JobDescriptionContainer')
    const nextJobContainer = jobDesciptionContainer.querySelector('.jobDesc')
    const description = nextJobContainer.querySelector('.jobDescriptionContent').innerText
    const bannerWrap = document.querySelector('#CompanyBannerWrap')
    const banner = bannerWrap.querySelector('#CompanyBanner')
    const image = banner.querySelector('.lazy').src
    const titleWrapper = document.querySelector('.empWrapper')
    const wrapperDiv = titleWrapper.querySelector('div')
    const job_title = wrapperDiv.querySelector('.jobTitle').innerText
    return { job_title, image, description }
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
