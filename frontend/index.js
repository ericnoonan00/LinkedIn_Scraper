import fs from 'fs'

function getJSONSearchResults() {
  const path = '../private/json/searchresults.json'
  try {
    if (!fs.existsSync(path))
      throw new Error("JSON Doesn't exist")
    const data = fs.readFileSync(path)
    const stng = data.toString()
    const json = JSON.parse(stng)
    // console.log(json);
    return json
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  getJSONSearchResults()
})()