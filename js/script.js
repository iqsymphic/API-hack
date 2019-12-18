"use strict";

const apiKey =
  "a5c729b3cf224d268a63435072b5f04a0edf7be10062443bb849f39e40824229";
const searchURL = "https://xivapi.com/character/search";
const searchID = "https://xivapi.com/character";

$(document).ready(function() {
  watchForm();
});

function watchForm() {
  $("#search-form").submit(e => {
    event.preventDefault();
    let searchName = $("#name-input").val();
    let searchServer = $("#server-input").val();
    getCharacterInfo(searchName, searchServer);
  });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function getCharacterInfo(query, query2) {
  const params = {
    name: query,
    server: query2,
    private_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url, { mode: "cors" })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Error with search result!");
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.Results.length; i++) {
    $("#results-list").append(
      `<ul style="list-style-type:none;"><li><br><br>

                <img src= "${responseJson.Results[i].Avatar}" >
                <h2>Name: ${responseJson.Results[i].Name}</h2>
                <h3>Server: ${responseJson.Results[i].Server}</h3>
                <h3>Unique ID: ${responseJson.Results[i].ID}</h3>
                
            <br><br>
            </li></ul>`
    );
  }
  $("#results-list").removeClass("hidden");
}

$(document).ready(function() {
  watchForm2();
});

function watchForm2() {
  $("#unique-form").submit(e => {
    event.preventDefault();
    let searchID = $("#id-input").val();
    getCharacterData(searchID);
  });
}

function getCharacterData(unid) {
  const queueString = unid;
  const url = searchID + "/" + queueString;

  fetch(url, { mode: "cors" })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(jsonFile => displayResult(jsonFile))
    .catch(err => {
      console.log(err);
      alert("Error with search result!");
    });
}

function displayResult(jsonFile) {
  console.log(jsonFile);
  $("#unique-list").empty();

  for (let key1 in jsonFile.Character.ClassJobs) {
    console.log(`Key: ${key1}`);

    let jsonObj = jsonFile.Character.ClassJobs[key1];

    console.log(`ClassJobs Value: ${JSON.stringify(jsonObj)}`);

    {
      $("#unique-list").append(
        `<ul style="list-style-type:none;"><li><br>

               
                
                <h3>Job: ${jsonObj.Name}</h3><br>
                <p><b> Current Level:</b> ${jsonObj.Level}</p>
                <p><b>Current Exp:</b> ${jsonObj.ExpLevel}</p>
                <p><b>Remaining Exp:</b> ${jsonObj.ExpLevelTogo}</p>
                <p><b>Class Performance:</b> ${jsonObj.ExpLevelMax}</p>
                <p><b>Top Global Ranking:</b> ${jsonObj.IsSpecialised}</p>

                
            <br>
            </li></ul>`
      );
    }
    $("#unique-list").removeClass("hidden");
  }
}
