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
    if (dataString.substr(i, 1) == true) {
      document.querySelector("#" + slotArray[i]).className = "slot table-danger";
    }
  }
}

init();

document.querySelector("#floor-select").onchange = () => {
  for (let i of document.querySelectorAll(".floor")) {
    i.style.display = "none";
  }
  document.querySelector("#floor-" + document.querySelector("#floor-select").value).style.display = "";
}

if (location.protocol !== 'https:') location.replace(`https:${location.href.substring(location.protocol.length)}`);
$(() => {
  function get_sensor() {
    $.ajax({
      url: 'https://iot-parking-lot.herokuapp.com/api',
      success: (res) => {
        colorParkingLots(res);
      }
    });
  }
  setInterval(() => {
    get_sensor();
  }, 2000);
  // init function
  get_sensor();
});