const timeEl = document.getElementById('time');
const dateEl= document.getElementById('date');
const currentWeatherItemsEl=document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');
const countryEl=document.getElementById('country');
const weatherForecastEl=document.getElementById('weather-forecast');
const currentTempEl=document.getElementById('current-temp');


const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const API_KEY='a6f0e4f630c5ecea41232483c688e6a4';

setInterval(() => {
    const time =new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hoursIn12HrFormat= hour>= 13 ? hour %12: hour
    const minutes=time.getMinutes();
    const ampm= hour>=12 ? 'PM':'AM'

    timeEl.innerHTML=hoursIn12HrFormat + ':' + minutes+ ' '+ `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML= days[day-1]+ ', ' + date + ' ' + months[month]
}, 1000);

getWeatherData()
function getWeatherData()
{
    navigator.geolocation.getCurrentPosition((success) => {
        
        let{latitude, longitude}=success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data){

    let {humidity,pressure}=data.main;
    let {speed}=data.wind;
    let {sunrise,sunset}=data.sys;

    currentWeatherItemsEl.innerHTML=
            `<div class="weather-item">
            <div>Humidity</div>
                <div>${humidity}%</div>
            </div>

            <div class="weather-item">
                <div>Pressure</div>
                <div>${pressure}</div>
            </div>

            <div class="weather-item">
                <div>Wind Speed</div>
                <div>${speed}</div>
            </div>
            <div class="weather-item">
                <div>Sunrise</div>
                <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
            </div>
            <div class="weather-item">
                <div>sunset</div>
                <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
            </div>
            `;

            let otherDayForcast = ''

            data.weather.forEach((day, idx) => {
            if(idx == 0){
            }else{
            otherDayForcast +=
            `<div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt*1000).format('ddd')
            }</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day ${day.temp.day}&#176; C</div>
            </div>`
            }
            })

            weatherForecastEl.innerHTML=otherDayForcast;
}