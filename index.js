const { chromium } = require('playwright');

// I am going to use playwright to scrape a few different websites, then post my results to one page where i can sift through and apply

const SEARCHES = [
  "QA Engineer I",
  "Junior developer",
  "Junior Programmer",
  "Database Administrator",
  "Database Administrator Intern",
  "Data Analyst",
  "Junior Data Analyst",
  "Data Analyst intern",
]

const URLS = new Map([
  ['LinkedIn', 'https://www.linkedin.com/jobs/'],
  ['Indeed', 'https://www.indeed.com/'],
])

// functions
async function scrapeLinkedIn() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();


  const LinkedInLINKS = []

  // await page.goto(`${URLS.get('LinkedIn')}search/?keywords=${encodeURIComponent(SEARCHES[0])}`)
  // await page.locator('.modal__dismiss').first().click()

  for (let i = 0; i < 1; i++) {

    // search each query
    // FILTERS:
    // usa (location=United%20States)
    // remote (f_WT=2)
    // intern, entry, and associate levels
    // past 24
    const searchQuery = SEARCHES[i];
    console.log(`Searching for: ${searchQuery}`);
    // TODO: make it easier to change filters (make a filter obj or something)
    const searchUrl = `${URLS.get('LinkedIn')}search/?keywords=${encodeURIComponent(searchQuery)}&f_TPR=r86400&f_WT=2&location=${encodeURIComponent("United States")}&f_E=1%2C2%2C3&origin=JOB_SEARCH_PAGE_JOB_FILTER`;
    await page.goto(searchUrl);

    // get the list of all the results
    const resultsList = await page
      .locator('.jobs-search__results-list')
      .locator('.base-card')
      .all();
    console.log(resultsList);

    // get info about each listing
    for (let j = 0; j < resultsList.length; j++) {
      const link = await resultsList[j]
        .locator('.base-card__full-link')
        .getAttribute('href');
      // console.log(link);

      const info = await resultsList[j].locator('.base-search-card__info')
      // console.log(info);

      const jobTitle = await info
        .locator('.base-search-card__title')
        .innerHTML()

      // console.log(jobTitle);

      const company = await info
        .locator('.base-search-card__subtitle')
        .locator('.hidden-nested-link')
        .innerHTML();
      // console.log(company);

      LinkedInLINKS.push(link)
      console.log(`TITLE: ${jobTitle} COMPANY: ${company} LINK: ${link}`);
    }

  }
  // console.log(LinkedInLINKS);

  // await browser.close();
}

/* -- MAIN -- */
(async () => {
  scrapeLinkedIn()
})();
