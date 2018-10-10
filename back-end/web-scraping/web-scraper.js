const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
let urls = [];

const getUrls = async () => {
  try {
    const allLinks = await nightmare
      .goto(
        'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=softw&sc.keyword=Software+Developer&locT=C&locId=1148170&jobType='
      )
      .evaluate(() => {
        const aTags = Array.from(document.querySelectorAll('.jobLink'));
        const hrefs = aTags.map(tag => tag.href);

        return hrefs;
      })
      .end();
    return allLinks;
  } catch (error) {
    console.log(error);
  }
};

const getJobData = async url => {
  const nightmare = Nightmare({ show: true });
  const result = await nightmare
    .goto(url)
    .evaluate(() => {
      const jobWrap = document.querySelector('.jobViewJobTitleWrap');
      const job_title = jobWrap.querySelector('h2').innerText;
      const headerWrap = document.querySelector('.logoHeader');
      const companyWrapper = headerWrap.querySelector('.empHeader');
      const companyAndLocation = Array.from(companyWrapper.querySelectorAll('span'));
      const company = companyAndLocation[0].innerText;
      const location = companyAndLocation[1].innerText;
      const description = document.querySelector('.jobDescriptionContent').innerText
      return {job_title, company, location, description};
    })
    .end()
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error)
    }) 
    return result;
};

const cleanData = async () => {
  const urls = await getUrls();
  try {
    const jobs = urls.reduce(async (acc, url) => {
      let allJobData = await acc;
      let jobData = await getJobData(url);
        allJobData = [...allJobData, jobData]
        return allJobData;
    }, Promise.resolve([]));
    return jobs;

  } catch (error) {
    console.log(error)
  }
};

const jobs = cleanData();

// console.log(jobs)

jobs.then(data => {
  console.log(data)
})
// const getJob = async () => {
//   const job = await getJobData('https://www.glassdoor.com/job-listing/software-developer-bctech-JV_IC1148170_KO0,18_KE19,25.htm?jl=2925659032&ctt=1539134670798')
//   return job
// }
// const job =  getJob();
// job.then(data => console.log(data))
