const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
let urls = [];

const getUrls = async () => {
  try {
    const allLinks = await nightmare
      .goto(
        'https://www.builtincolorado.com/jobs?f[0]=job-category_developer-engineer-javascript'
      )
      .evaluate(() => {
        const containers = Array.from(document.querySelectorAll('.center-main'));
        const jobData = containers.map(container => {
        const job_title = container.querySelector('.title').innerText;
        const company = container.querySelector('.company-title').innerText;
        const location = container.querySelector('.job-location').innerText;
        const urlContainer = container.querySelector('.wrap-view-page');
        const url = urlContainer.querySelector('a').href 
        return {job_title, company, location, url}
        })
        return jobData;
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

      const wrapper = document.querySelector('.job-description')
      const ptags = Array.from(wrapper.querySelectorAll('p'))
      const description = ptags.map(ptag => ptag.innerText).join()
      return description
    })
    .end()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

const cleanData = async () => {
  const urls = await getUrls();
  console.log(urls)
  try {
    const jobs = urls.reduce(async (acc, url) => {
      let allJobData = await acc;
      let description = await getJobData(url.url);
      allJobData = [...allJobData, {...url, description}];
      return allJobData;
    }, Promise.resolve([]));
    return jobs;
  } catch (error) {
    console.log(error);
  }
};

// const retrievedUrls = getUrls();

// retrievedUrls.then(data => {
//   console.log(data)
// })

const jobs = cleanData();


jobs.then(data => {
  console.log(data);
});
// const getJob = async () => {
//   const job = await getJobData('https://www.glassdoor.com/job-listing/software-developer-bctech-JV_IC1148170_KO0,18_KE19,25.htm?jl=2925659032&ctt=1539134670798')
//   return job
// }
// const job =  getJob();
// job.then(data => console.log(data))
