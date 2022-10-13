import { useEffect, useState } from 'react';
import hotBg from './assets/sumer.jpg'
import coldBg from './assets/winter.jpg'
import Description from './components/Description';
import { getFormattedWeatherData } from './weatherService';

function App() {

  const [city, setCity] = useState("delhi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg)
  const [weatherImg, setWeatherImg] = useState(' ')

  useEffect (() => {
    const fethWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      console.log(data);
      setWeather(data);
      checkWeatherImg(data.description);

      //dynamic bg

      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fethWeatherData();
  }, [units, city]);


  const checkWeatherImg = (weatherType) => {

    switch(weatherType) {
      case 'clear sky':
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/sunny.png')///
      break;

      case 'overcast clouds':
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png')///
      break;

      case 'haze':
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/sunny.png')
      break;

      case 'broken clouds':
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/cloudy.png')
      break;

      case 'light intensity shower rain':
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/rain_light.png') ///
      break;

      case 'light rain':
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png')///
      break;

      default:
        setWeatherImg('https://ssl.gstatic.com/onebox/weather/64/sunny.png')
        break;
    }  
  }



  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    // const currentUnit = button.innerText.slice(1);

    const iscelsius = units == "imperial";
    button.innerText = iscelsius ? "°F" : "°C";
    setUnits(iscelsius ? "metric" : "imperial");
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className='overlay'>
        {weather && (   
        <div className='container'>
        <div className='section section__inputs'>
          <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enetr City...'/>
          <button onClick={(e) => handleUnitsClick(e)}>&#8457;</button>
        </div>
        <div className='section section__temperature'>
          <div className='icon'>
            <h3>{`${weather.name}, ${weather.country}`}</h3>
            <img src={weatherImg}></img>
            <h3>{weather.description}</h3>
            </div>
            <div className='temperature'>
            <h1>{`${weather.temp.toFixed()}`}  {(units==='metric')
        ? <> &#8451;</>
        :<>&#8457;</>
      }</h1>
            </div>
        </div>
        <Description weather={weather} units={units}/>
      </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
