import fs from 'fs'

function getJSONSearchResults() {
  const path = '../private/json/searchresults.json'
  try {
    if (!fs.existsSync(path))
      throw new Error("JSON Doesn't exist")
    const data = fs.readFileSync(path)
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  getJSONSearchResults()
})()