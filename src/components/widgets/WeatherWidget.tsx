import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { namespace, secrets } from '../../config';
import { RegularText } from '../Text';

const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

const fetchWeatherData = async (setTemperature: React.Dispatch<React.SetStateAction<number>>) => {
  const apiKey = secrets[namespace as (keyof typeof secrets)].openWeatherApiKey;

  //bad belzig
  const lon = 12.6;
  const lat = 52.133331;

  const requestPath =
    `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely`;

  const response = await fetch(requestPath).catch((e) => console.log({e}));

  if (response) {
    const json = await response.json();
    const temperature = json?.current?.temp;

    if(isNumber(temperature))
      setTemperature(temperature);
  }
};

export const WeatherWidget = () => {
  const [temperature, setTemperature] = useState(0);
  //lat={lat}&lon={lon}&exclude={part}&appid={API key}

  useEffect(() => {
    fetchWeatherData(setTemperature);
  });

  return (
    <View>
      <RegularText>Weather Widget!</RegularText>
      <RegularText>It is {temperature}°C</RegularText>
    </View>
  );
};
