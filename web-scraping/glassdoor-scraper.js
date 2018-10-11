const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto(
    'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=&sc.keyword=&locT=C&locId=1148170&jobType='
  )
  .end()
  .type('.keyword', 'front end developer')
  .click('#HeroSearchButton')
  .wait(3000)
  .click('')
  .evaluate(() => {
    const jobDivs = [...document.querySelectorAll('li.jl .jobTitle')];

    const jobData = jobDivs.map(div => {
      let location = div.querySelector('li.jl .loc').innerText;

      return { location };
    });

    return jobData;
  })
  .then(result => {
    fs.writeFile('glassDoor.json', JSON.stringify(result, null, 4), error => {
      if (error) throw error;
      console.log('Saved file!', result);
    });
  })
  .catch(error => console.log('something went wrong', error));
