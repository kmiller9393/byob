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
  try {
    const nightmare = Nightmare({ show: true });
    const result = await nightmare
      .goto(url)
      .evaluate(() => {
        return 'it works';
      })
      .end();
    return result;
  } catch (error) {}
};

const cleanData = async () => {
  const urls = await getUrls();

  const jobs = urls.reduce(async (acc, url) => {
    let jobData = await getJobData(url);
    acc.push(jobData);
    return acc;
  }, Promise.resolve([]));
  return jobs;
};

cleanData();
