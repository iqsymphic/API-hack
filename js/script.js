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
                <img src=${responseJson.Results[i].Avatar}>
                <h3>Name: ${responseJson.Results[i].Name}</h3>
                <h4>Server: ${responseJson.Results[i].Server}</h4>
                <h4>Unique ID: ${responseJson.Results[i].ID}</h4>
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

  for (let key in jsonFile.Character.ActiveClassJob) {
    console.log(`Key: ${key}`);
    console.log(`Value: ${jsonFile.Character.ActiveClassJob[key]}`);

    {
      $("#unique-list").append(
        `<ul style="list-style-type:none;"><li><br>
                
                <h3> ${key}: ${jsonFile.Character.ActiveClassJob[key]}</h3>
                
            <br>
            </li></ul>`
      );
    }
    $("#unique-list").removeClass("hidden");
  }
}
