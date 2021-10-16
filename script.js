let URL = "https://api.openweathermap.org/data/2.5/weather?q="
let api = "&appid=d5f8f7a59b864b1dbc1ba51e70dc34b8"

let form = document.forms[0];
form.addEventListener('submit',(event) => {
    event.preventDefault();
    let location = event.target['city'].value
    let unit = "&units="
    unit += form['temp-unit'].value=="celcius"?"metric":"imperial"
    let FinalURL = URL + location +api +unit;
    console.log();
    // form.reset();
    fetch(FinalURL)
    .then(response=>{
        console.log(response)
        if(response.status===200){
            response.json()
         .then((data)=>{

            console.log(data)

    
            document.getElementById('detail-city').childNodes[0].textContent=data.name;
            document.getElementById('detail-country').textContent=data.sys.country;
            document.getElementById('detail-temp-current').textContent=data.sys.country;
            
            let unit_post = form['temp-unit'].value=="celcius"?"\u00B0c":"\u00B0f"
            
            document.getElementById('detail-temp-current').textContent=data.main.temp+unit_post;
            document.getElementById('detail-temp-min').textContent=data.main.temp_min+unit_post;
            document.getElementById('detail-temp-max').textContent=data.main.temp_max+unit_post;

            document.getElementById('msg').textContent=data.weather[0].description;
            document.getElementById('weather-icon-img').src="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
            
            document.getElementById('speed').textContent=data.main.humidity+" mph";
            document.getElementById('humidity').textContent=data.main.humidity+" %";

            const today = new Date()
            let weekday = today
            .toLocaleString('default', { 
                weekday: 'long',
            })
            let date = today
            .toLocaleString('default', { 
                month: 'long' ,
                day:"numeric",
            })
            let time = today.toLocaleString("local", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            document.getElementById('detail-time').textContent= weekday+" | "+date+" | "+time;

            document.getElementsByClassName('container')[0].style.display = 'flex';

            let newSrc = "";
            let banner = document.querySelector('.img img');
            console.log(banner);
            switch(data.weather[0].main){
                case "Clouds":
                    newSrc ="./img/cloud.jpg";
                break;
                case "Rain":
                    newSrc ="./img/rain.jpg";
                break;
                case "Thunderstorm":
                    newSrc ="./img/thunderstorm.jpg";
                break;
                case "Snow":
                    newSrc ="./img/snow.jpg";
                break;
                case "Mist":
                    newSrc ="./img/mist.jpg";
                break;
                default:
                    newSrc ="./img/clear.jpg";
            }
            banner.src = newSrc;
        });
    }else{
        alert("Error "+response.status)
    }
    });

    
    
})

