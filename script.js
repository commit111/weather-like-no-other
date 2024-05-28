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
  
  let cleardaywhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-day-white.svg?v=1696181634989";
  let clearnightwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/clear-night-white.svg?v=1696178727505";
  let partlycloudydaywhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/partly-cloudy-day-white.svg?v=1696181642303";
  let partlycloudynightwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/partly-cloudy-night-white.svg?v=1696181644883";
  let cloudywhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/cloudy_white.svg?v=1696178736145";
  let rainwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/rain-white.svg?v=1696181647456";
  let snowwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/snow-white.svg?v=1696181650702";
  let windwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/wind-white.svg?v=1696181653822";
  let fogwhite = "https://cdn.glitch.global/ddf86376-5356-40d5-aea5-6ee7a7dd04dd/fog-white.svg?v=1696181639447";
  
  let oldIcon = "cloudy";
  
  modeSection.addEventListener("click", () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
    imgcloud.classList.toggle("dark-mode-weather");
    imgcresent.classList.toggle("dark-mode-cresent");
    
    setIconImage();
    
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

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=${process.env.API_KEY}&contentType=json`;

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
          if (icon !== oldIcon){
            if (imgcloud.classList.contains(oldIcon)){
              imgcloud.classList.remove(oldIcon);
            }
            imgcloud.classList.add(icon);
            oldIcon = icon;
          }
          setIconImage();
          oldIcon = icon;
        
        });
    });
  }
    
  
function setIconImage() {
  
  if (imgcloud.classList.contains("clear-day")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", cleardaywhite);
    }else{
      imgcloud.setAttribute("src", clearday);
    }
  }
  else if (imgcloud.classList.contains("clear-night")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", clearnightwhite);
    }else{
      imgcloud.setAttribute("src", clearnight);
    }
  }
  else if (imgcloud.classList.contains("partly-cloudy-day")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", partlycloudydaywhite);
    }else{
      imgcloud.setAttribute("src", partlycloudyday);
    }
  }
  else if (imgcloud.classList.contains("partly-cloudy-night")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", partlycloudynightwhite);
    }else{
      imgcloud.setAttribute("src", partlycloudynight);
    }
  }
  else if (imgcloud.classList.contains("cloudy")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", cloudywhite);
    }else{
      imgcloud.setAttribute("src", cloudy);
    }
  }
  else if (imgcloud.classList.contains("rain")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", rainwhite);
    }else{
      imgcloud.setAttribute("src", rain);
    }
  }
  else if (imgcloud.classList.contains("snow")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", snowwhite);
    }else{
      imgcloud.setAttribute("src", snow);
    }
  }
  else if (imgcloud.classList.contains("wind")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", windwhite);
    }else{
      imgcloud.setAttribute("src", wind);
    }
  }
  else if (imgcloud.classList.contains("fog")){
    if (imgcloud.classList.contains("dark-mode-weather")){
      imgcloud.setAttribute("src", fogwhite);
    }else{
      imgcloud.setAttribute("src", fog);
    }
  }
  else{
    imgcloud.setAttribute("src", cloudy);
  }
}
  
});
