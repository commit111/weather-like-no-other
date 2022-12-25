window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${long}?unitGroup=us&key=4MHU9N92TYVGPA9JNANU6MQYQ&contentType=json`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          const { temp, conditions } = data.currentConditions;
          // Set DOM elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.timezone;
        });
    });
  }
  
  
  function setIcons(icon, iconID){
    
  }
  
});
