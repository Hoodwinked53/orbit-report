var message = 'Hello, World';
console.log(message);

window.addEventListener('load', function (){
    let form = document.querySelector("form");
    let pilotNameInput = document.querySelector('input[name=pilotName]');
    let copilotNameInput = document.querySelector('input[name=copilotName]');
    let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
    let cargoMassInput = document.querySelector('input[name=cargoMass]');
    let faultyItems = document.getElementById('faultyItems')
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
    let planetData = document.getElementById('planetData')
   
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response){
             return (response.json());
          }) .then((data) => {
              let planet = data[Math.floor(Math.random()*data.length)];
              planetData.innerHTML = `<h2>Mission Destination</h2>
              <ol>
                 <li>Name: ${planet.name}</li>
                 <li>Diameter: ${planet.diameter}</li>
                 <li>Star: ${planet.star}</li>
                 <li>Distance from Earth: ${planet.distance}</li>
                 <li>Number of Moons: ${planet.moons}</li>
              </ol>
              <img src="${planet.image}">`
          })
   
    form.addEventListener("submit", (event) => {
       event.preventDefault();
       
       if (pilotNameInput.value === "" || copilotNameInput.value ==="" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
          alert('All fields required!')
       } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)){
          alert('Please enter a numeric value for fuel Level and cargo mass.')
       } else {
          faultyItems.style.visibility = 'visible'
          pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`
          copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`
 
          if (fuelLevelInput.value <= 10000){
             fuelStatus.innerHTML = "Fuel level is too low for launch.";
          } else {
             fuelStatus.innerHTML = "Fuel level is ready for launch";
          }
          if (cargoMassInput.value >= 10000){
             cargoStatus.innerHTML = "Cargo mass is too high for launch";
          } else {
             cargoStatus.innerHTML = "Cargo mass is low enough for launch";
          }
          if (fuelLevelInput.value <= 10000|| cargoMassInput.value >= 10000){
             launchStatus.innerHTML = "Shuttle not ready to launch";
             launchStatus.style.color = "red";
          } else {
             launchStatus.innerHTML = "Shuttle ready for launch";
             launchStatus.style.color = "green";
          }
       }
             
    });
 
 });