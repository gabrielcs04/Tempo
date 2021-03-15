import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import api, { key } from '../../services/api';

export default function Home() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] =  useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: 'cloud', color: '#fff' });
  const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if(status !== 'granted'){
        setErrorMsg('Permissão para acessar a localização negada!');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const response = await api.get(`/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);

      console.log(response.data);

      setWeather(response.data);

      if(response.data.results.currently === 'noite'){
        setBackground(['#0c3741', '#0f2f61']);
      }

      switch(response.data.results.condition_slug){
        case 'clear_day':
          setIcon({ name: 'partly-sunny', color: '#ffb300' });
          break;
        case 'rain':
          setIcon({ name: 'rainy', color: '#fff' });
          break;
        case 'storm':
          setIcon({ name: 'rainy',  color: '#fff' })
          break;
      }

      setLoading(false);
    })();

  }, []);

  if(loading){
    return(
      < LinearGradient 
        style={styles.container} 
        colors={['#1ed6ff', '#97c1ff']} 
      >
        <FontAwesome5 name="cloud-sun" size={100} color="white" />
      </LinearGradient>
    )
  }

  return(
      <SafeAreaView style={styles.container}>
          
          <Menu />

          <Header background={background} weather={weather} icon={icon} />


          <Conditions weather={weather} />

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{ paddingBottom: '5%' }} 
            style={styles.list}
            data={weather.results.forecast}
            keyExtractor={ item => item.date }
            renderItem={ ({ item }) => <Forecast data={item}/> }      
          />

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8f0ff',
        paddingTop: '5%',
    },

    list:{
        marginTop: 10,
        marginRight: 10    
    }
});