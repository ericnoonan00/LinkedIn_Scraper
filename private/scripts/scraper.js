import { chromium } from 'playwright';
import fs, { existsSync } from 'fs';

// I am going to use playwright to scrape linkedin, then post my results to one page where i can sift through and apply

const SEARCHES = [
  "QA Engineer I",
  "Junior developer",
  "Junior Programmer",
  "Data Analyst",
  "Junior Data Analyst",
  "Data Analyst intern",
]

const RESULTS = {}

// functions
async function scrapeLinkedIn() {
  for (let i = 0; i < SEARCHES.length; i++) {

    const searchQuery = SEARCHES[i];
    console.log(`Searching for: ${searchQuery}`);
    // TODO: make it easier to change filters (make a filter obj or something)
    const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchQuery)}&f_TPR=r86400&f_WT=2&location=${encodeURIComponent("United States")}&f_E=1%2C2&origin=JOB_SEARCH_PAGE_JOB_FILTER`;

    /** -- a little funk with going to linked in on incognito mode -- **/
    // IN ORDER TO AVOID REDIRECT(since no solution seems to exist)
    // RE OPEN THE BROWSER EVERY
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(searchUrl)
    /** -- FUNK ADDRESSED -- **/

    // get the list of all the results
    await page.waitForLoadState('load')
    const searchResultsList = await page
      // "#main-content > section.two-pane-serp-page__results-list > ul > li:nth-child(1)"
      .locator('#main-content')
      .locator('.two-pane-serp-page__results-list')
      .locator('ul.jobs-search__results-list')
      .locator('li')
      .all();

    // get info about each listing and store it in results
    RESULTS[searchQuery] = []
    for (let j = 0; j < searchResultsList.length; j++) {

      console.log('searching for ' + (j + 1));

      const link = await searchResultsList[j]
        .locator('a[data-tracking-control-name="public_jobs_jserp-result_search-card"]')
        .getAttribute('href');
      // console.log(link);

      const info = await searchResultsList[j].locator('.base-search-card__info')
      // console.log(info);

      const jobTitle = await info
        .locator('.base-search-card__title')
        .innerText()

      // console.log(jobTitle);

      const company = {
        'companyName': '',
        'companyLink': '',
      };
      // some listings don't have links to the company
      if (await info
        .locator('.base-search-card__subtitle')
        .locator('.hidden-nested-link')
        .count() === 0) {
        company['companyName'] = await info
          .locator('base-search-card__subtitile')
          .allInnerTexts();
      }
      else {
        company['companyName'] = await info
          .locator('.base-search-card__subtitle')
          .locator('.hidden-nested-link')
          .innerText();
        company['companyLink'] = await info
          .locator('.base-search-card__subtitle')
          .locator('.hidden-nested-link')
          .getAttribute('href');
        // console.log(company);
      }

      const postedDate = new Date(
        await info
          .locator('.base-search-card__metadata')
          .locator('time')
          .getAttribute('datetime')
      )
      console.log(postedDate);

      RESULTS[searchQuery].push(
        {
          [j + 1]: {
            "title": jobTitle,
            "company": company,
            "link": link,
            "date": postedDate,
          }
        }
      )
    }
    // close the browser after each search to avoid redirects
    await browser.close();
  }

  console.log(RESULTS);
  // console.log(JSON.stringify(RESULTS));

  return RESULTS;

  // Save results to a JSON file to be read by the webpage
}

export async function writeLinkedInResults() {
  const data = await scrapeLinkedIn()
  const json = JSON.stringify(data, null, 2)

  //path to be called in public/index.js
  const path = '../../private/json/'
  const file = path + 'searchresults.json'
  try {
    if (!fs.existsSync(path))
      fs.mkdirSync(path)
    if (fs.existsSync(file))
      fs.unlinkSync(file)
    fs.writeFileSync(file, json, { flag: 'w+' })
  } catch (err) {
    console.error(err);
    throw new Error(err)
  }
}

/* -- MAIN -- */
(async () => {
  scrapeLinkedIn()
})();
