const Nightmare = require('nightmare');
const fs = require('fs');

const fetchJobData = async () => {
  const nightmare = Nightmare({ show: true });
  try {
    const allLinks = await nightmare
      .goto(
        'https://www.builtincolorado.com/jobs?f[0]=job-category_developer-engineer-javascript&page=2'
      )
      .evaluate(() => {
        const containers = Array.from(
          document.querySelectorAll('.center-main')
        );
        const jobData = containers.map(container => {
          const job_title = container.querySelector('.title').innerText;
          const company = container.querySelector('.company-title').innerText;
          const location = container.querySelector('.job-location').innerText;
          const urlContainer = container.querySelector('.wrap-view-page');
          const url = urlContainer.querySelector('a').href;
          return { job_title, company, location, url };
        });
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
  try {
    const result = await nightmare
      .goto(url)
      .evaluate(() => {
        const wrapper = document.querySelector('.job-description');
        const ptags = wrapper.querySelector('p');
        const description = ptags.innerText;
        return description;
      })
      .end();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getJobDescription = async () => {
  const urls = await fetchJobData();

  try {
    const jobs = urls.reduce(async (acc, url) => {
      let allJobData = await acc;
      let description = await getJobData(url.url);
      allJobData = [...allJobData, { ...url, description }];
      return allJobData;
    }, Promise.resolve([]));
    return jobs;
  } catch (error) {
    console.log(error);
  }
};

const jobs = getJobDescription();

const cleanData = jobData => {
  return jobData.map(job => {
    return {
      company: job.company,
      job_title: job.job_title,
      location: job.location,
      description: job.description,
      status: ''
    };
  });
};

jobs.then(result => {
  const newJobsData = cleanData(result);

  fs.writeFile(
    './utils/finalData.json',
    JSON.stringify(newJobsData, null, 4),
    error => {
      if (error) {
        console.log(error);
      }
    }
  );
  console.log('The file has been saved!');
});
