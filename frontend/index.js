const path = '../private/json/searchresults.json'

export function getJSONSearchResults() {
  fetch(path)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.error(err))
}