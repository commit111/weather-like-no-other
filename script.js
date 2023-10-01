window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSpan = document.querySelector(".temperature-section span");
  let modeSection = document.querySelector(".mode")
  
  let imgcloud = document.querySelector("#imgweather");
  let imgcresent = document.querySelector("#cresent");
  
  let clearday = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-day.svg?v=1671944510051";
  let clearnight = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-night.svg?v=1671944522623";
  let partlycloudyday = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/partly-cloudy-day.svg?v=1671944525795";
  let partlycloudynight = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/partly-cloudy-night.svg?v=1671944529178";
  let cloudy = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/cloudy.svg?v=1671944541034";
  let rain = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/rain.svg?v=1671944547114";
  let snow = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/snow.svg?v=1671944555717";
  let wind = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/wind.svg?v=1671944551944";
  let fog = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/fog.svg?v=1671944543895";
  
  let cloudywhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/cloudy_white.svg?v=1696178736145";
  let clearnightwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-night-white.svg?v=1696178727505";
  
  modeSection.addEventListener("click", () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
    imgcloud.classList.toggle("dark-mode-weather");
    imgcresent.classList.toggle("dark-mode-cresent");
    
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", cloudywhite);
    }else{
      imgcloud.setAttribute("src", cloudy);
    }
    
    if (imgcresent.classList.contains("dark-mode-cresent")){
      imgcresent.setAttribute("src", clearnightwhite);
    }else{
      imgcresent.setAttribute("src", clearnight);
    }
  });
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=4MHU9N92TYVGPA9JNANU6MQYQ&contentType=json`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, conditions, icon } = data.currentConditions;
          // Set DOM elements from the API

          let celsius = Number(((temp - 32) * 5) / 9).toFixed(1);

          temperatureDegree.textContent = celsius;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.timezone;

          //Set to switch between C and F on click
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F°") {
              temperatureSpan.textContent = "C°";
              temperatureDegree.textContent = celsius;
            } else {
              temperatureSpan.textContent = "F°";
              temperatureDegree.textContent = temp;
            }
          });

          //Set icon
          imgcloud.classList.add(icon);
          setIconImage();
        
        });
    });
  }
  
function setIconImage() {
  if (imgcloud.classList.contains("clear-day")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", cloudywhite);
    }else{
      imgcloud.setAttribute("src", clearday);
    }
  }
  else if (imgcloud.classList.contains("clear-night")){
    imgcloud.setAttribute("src", "");
  }
  else{
    
  }
    
}
  
  
/*
  function setIconImage(icon) {
    let currentIcon = (icon) => {
      switch (icon) {
          /*
        case "clear-day":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-day.svg?v=1671944510051";
        case "clear-night":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-night.svg?v=1671944522623";
        case "partly-cloudy-day":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/partly-cloudy-day.svg?v=1671944525795";
        case "partly-cloudy-night":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/partly-cloudy-night.svg?v=1671944529178";
        case "cloudy":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/cloudy.svg?v=1671944541034";
        case "rain":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/rain.svg?v=1671944547114";
        case "snow":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/snow.svg?v=1671944555717";
        case "wind":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/wind.svg?v=1671944551944";
        case "fog":
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/fog.svg?v=1671944543895";
        default:
          return "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-day.svg?v=1671944510051";
          
          
        case "clear-day":
          return clearday;
        case "clear-night":
          return clearnight;
        case "partly-cloudy-day":
          return partlycloudyday;
        case "partly-cloudy-night":
          return partlycloudynight;
        case "cloudy":
          return cloudy;
        case "rain":
          return rain;
        case "snow":
          return snow;
        case "wind":
          return wind;
        case "fog":
          return fog;
        default:
          return clearday;
      } 
    };
  } */

});
