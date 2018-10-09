const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
let urls = [];

// nightmare
//   .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=softw&sc.keyword=Software+Developer&locT=C&locId=1148170&jobType=')
//   .end()
//   .evaluate(() => {
//     const jobDesciptionContainer = document.querySelector('#JobDescriptionContainer')
//     const nextJobContainer = jobDesciptionContainer.querySelector('.jobDesc')
//     const description = nextJobContainer.querySelector('.jobDescriptionContent').innerText
//     const bannerWrap = document.querySelector('#CompanyBannerWrap')
//     const banner = bannerWrap.querySelector('#CompanyBanner')
//     const image = banner.querySelector('.lazy').src
//     const titleWrapper = document.querySelector('.empWrapper')
//     const wrapperDiv = titleWrapper.querySelector('div')
//     const job_title = wrapperDiv.querySelector('.jobTitle').innerText
//     return { job_title, image, description }
//   })
//   .then(result => {
//     console.log(result)
//   })
//   .catch(error => {
//     console.log(error)
//   })



nightmare
  .goto('https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=softw&sc.keyword=Software+Developer&locT=C&locId=1148170&jobType=')
  .evaluate(() => {
    const aTags = Array.from(document.querySelectorAll('.jobLink'));
    const hrefs = aTags.map(tag => tag.href)

    return hrefs;
  })
  .end()
  .then(result => {
    urls = result
    // console.log(urls)

     urls.reduce((acc, url) => {
      return acc.then(results => {
        console.log(url)
        return nightmare.goto(url)
          .wait(10000)
          .evaluate(() => {
            return 'it works'
          })
          .then(result => {
            console.log(result)
            results.push(result)
            return results
          })
      })
    }, Promise.resolve([]))
  })
  .catch(error => {
    console.log(error)
  })

// urls.reduce((acc, url) => {
//   console.log(url)
//   return acc.then(results => {
//     return nightmare.goto(url)
//       .wait(1000)
//       .evaluate(() => {
//         return 'it works'
//       })
//       .then(result => {
//         console.log(result)
//         results.push(result)
//         return results
//       })
//   })
// }, Promise.resolve([]).then(results => {
//   // console.log(results)
// }))
