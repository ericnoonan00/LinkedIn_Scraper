# URL BREAKDOWN
1. currentJobId=4184090151
> specifies the current job being viewed

2. distance=25
> Controls the job search radius in miles.
  > Example: If you want to search within 50 miles, change it to distance=50.

3. f_TPR=r3600
> Filters job postings by recency.
  > Example: r3600 means jobs posted within the last hour.
>Common values:
  - r86400 (Last 24 hours)
  - r604800 (Last week)
  - r2592000 (Last month)

4. geoId=103644278
> Specifies the geographic location.
  > Example: If searching for jobs in Florida, you need the geoId for Florida.

5. location=United%20States
> Defines the search location.
  > Example: Searching in Florida? Change it to location=Florida.

6. keywords=senior%20operations%20manager
> Determines the job title or keywords being searched.
  > %20 represents spaces, so this query searches for “Senior Operations Manager.”
> To search for “Director of Operations,” change it to keywords=Director%20of%20Operations.

7. origin=JOB_SEARCH_PAGE_JOB_FILTER
> Indicates that the search is being filtered from the job search page. You can ignore this **BUT ITS STILL IMPORTANT TO ADD**

8. sortBy=R
> Sorts results by relevance (R).
> Options:
  - DD (Date posted)
  - R (Relevance)

9. f_WT=2
> Sorts results by remote work

10. f_E=2
> filters by Entry level
  > f_E=1:      **internship**
> for multiple experience levels, put %2C in between the numbers
  > f_E=1%2C2:  **internship and entry level**
  > f_E=1%2C2%2C5:  **internship and entry level and direcetor**


## Separate each filter with &
## The base url is *https://www.linkedin.com/jobs/search/*
## Put 7 at the end of each URL (*origin*)

**EXAMPLE**
https://www.linkedin.com/jobs/search/?keywords=QA%20Engineer&f_TPR=r3600&location=United%20States&origin=JOB_SEARCH_PAGE_JOB_FILTER
> searches for "QA Engineer"
> filters by past 24
> filters by Location = USA
> filters by Experience Level = entry and internship

