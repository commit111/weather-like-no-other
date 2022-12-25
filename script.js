window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature-section")
  let temperatureSpan = document.querySelector(".temperature-section span")
  
  
 
  /*
  tempSection.addEventListener('click', () => {
            if (tempSpan.textContent === 'F°') {
              tempSpan.textContent = 'C°';
              tempeDegree.textContent = Number((celsius).toFixed(2));
            } else {
              tempSpan.textContent = 'F°';
              tempeDegree.textContent = temperature;
            }*/

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
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.timezone;
          let celsius = (temp - 32) * 5 / 9;
          
          //Set icon
          /*setIcons(icon,document.querySelector(".icon"))*/
        
        
           temperatureSection.addEventListener("click", () => {
    if(temperatureSpan.textContent === "F°"){
      temperatureSpan.textContent = "C°";
      temperatureDegree.textContent = Number((celsius).toFixed(2));
    }else{
      temperatureSpan.textContent = "F°";
      temperatureDegree.textContent = temp;
    }
  }); 
        
        });
    });
  }
  
  /*
  function setIcons(icon, iconID){
   
  }*/
  
});
