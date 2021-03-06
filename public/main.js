function init() {
  for (let i of document.querySelectorAll(".floor")) {
    i.style.display = "none";
  }
  document.querySelector("#floor-1").style.display = "";
  document.querySelector("#floor-select").value = "1";
}

function colorParkingLots(dataString) {
  let slotArray = [];
  for (let i of document.querySelectorAll(".slot")) {
    i.className = "slot table-success";
    slotArray.push(i.id);
  }
  slotArray = slotArray.sort();
  for (let i = 0; i < 20; i++) {
    if (dataString.substr(i, 1) === "0") {
      document.querySelector("#" + slotArray[i]).className = "slot table-danger";
    }
  }
}

function getEmptyParkingLots() {
  let totalParkingLots = document.querySelectorAll(".slot").length;
  let totalEmptyParkingLots = document.querySelectorAll(".table-success").length;
  document.querySelector("#lot-total").innerText = totalEmptyParkingLots + " / " + totalParkingLots;

  let thisFloorParkingLots = document.querySelectorAll("#floor-" + document.querySelector("#floor-select").value + " .slot").length;
  let thisFloorEmptyParkingLots = document.querySelectorAll("#floor-" + document.querySelector("#floor-select").value + " .table-success").length;
  document.querySelector("#lot-this-floor").innerText = thisFloorEmptyParkingLots + " / " + thisFloorParkingLots;
}

init();

document.querySelector("#floor-select").onchange = () => {
  for (let i of document.querySelectorAll(".floor")) {
    i.style.display = "none";
  }
  document.querySelector("#floor-" + document.querySelector("#floor-select").value).style.display = "";
  getEmptyParkingLots();
}

let lastDataString;
let parkingLots = ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210"];

function recentInfo(dataString) {
  if (typeof lastDataString === "undefined") {
    lastDataString = dataString;
  } else if (lastDataString != dataString) {
    let infoString;
    for (let i = 0; i < dataString.length; i++) {
      if (lastDataString.substr(i, 1) != dataString.substr(i, 1)) {
        if (lastDataString.substr(i, 1) === "0") {
          // a parking lot just vacated.
          infoString = parkingLots[i] + "??????????????????????????????"
          break;
        } else {
          // a parking lot has just been parked.
          infoString = parkingLots[i] + "??????????????????????????????"
          break;
        }
      }
    }
    document.querySelector(".toast-body").innerText = infoString;
    redSpotShow();
    lastDataString = dataString;
  }
}

function redSpotShow() {
  document.querySelector("#red-spot").style.display = "unset";
  $("#red-spot").fadeOut(speed = 1500);
}

if (location.protocol !== 'https:') location.replace(`https:${location.href.substring(location.protocol.length)}`);
$(() => {
  function getSensor() {
    $.ajax({
      url: 'https://iot-parking-lot.herokuapp.com/api',
      success: (res) => {
        colorParkingLots(res);
        recentInfo(res);
      }
    });
    getEmptyParkingLots();
  }
  setInterval(() => {
    getSensor();
  }, 2000);
  // init function
  getSensor();
});
