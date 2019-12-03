// Write your JavaScript code here!
window.addEventListener("load", function() {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         let planet = json[Math.floor(Math.random() * json.length)];
         document.querySelector("#missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">
         `;
      });
   });


   let button = document.querySelector("#formSubmit");
   button.addEventListener("click", function(event) {
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let cargoInput = document.querySelector("input[name=cargoMass]");

      if (pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
         return;
      } else if (! isNaN(pilotInput.value) || ! isNaN(copilotInput.value)){
         alert("Names must not be numbers!");
         event.preventDefault();
         return;
      } else if (isNaN(fuelInput.value) || isNaN(cargoInput.value)){
         alert("Measurements must not contain letters!");
         event.preventDefault();
         return;
      }

      document.querySelector("#pilotStatus").innerHTML = `Pilot ${pilotInput.value} Ready`;
      document.querySelector("#copilotStatus").innerHTML = `Co-pilot ${copilotInput.value} Ready`;
      document.querySelector("#faultyItems").style.visibility = "hidden";
      document.querySelector("#launchStatus").innerHTML = "Shuttle ready for launch";
      document.querySelector("#launchStatus").style.color = "black";

      let gtgfuel = true;
      let gtgcargo = true;

      if (Number(fuelInput.value) < 10000) {
         document.querySelector("#fuelStatus").innerHTML = `Fuel level at ${fuelInput.value} L. Not enough fuel for journey.`;
         gtgfuel = false;
      } else {
         document.querySelector("#fuelStatus").innerHTML = `Fuel level high enough for launch`;
      }
      if (Number(cargoInput.value) > 10000) {
         document.querySelector("#cargoStatus").innerHTML = `Cargo mass at ${cargoInput.value} kg. Too heavy for take off.`;
         gtgcargo = false;
      } else {
         document.querySelector("#cargoStatus").innerHTML = `Cargo mass low enough for launch`;
      }

      if (gtgfuel === false || gtgcargo === false){
         document.querySelector("#faultyItems").style.visibility = "visible";
         document.querySelector("#launchStatus").innerHTML = "Shuttle not ready for launch";
         document.querySelector("#launchStatus").style.color = "red";
      }

   });
});




