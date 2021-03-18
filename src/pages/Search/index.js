import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import api, { key } from '../../services/api';
import Conditions from '../../components/Conditions';
import BackButton from '../../components/BackButton';
import SearchBox from '../../components/SearchBox';

export default function Search() {

    const [input, setInput] = useState('');
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);

    const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

    function handleText(valor) {
        setInput(valor)
    }

    function resetPage() {
        setInput('');
        setCity(null);
        setError(null);
        Keyboard.dismiss();
    }

    async function handleSearch() {
        const response = await api.get(`/weather?key=${key}&city_name=${input}`)
        Keyboard.dismiss();

        
        if (response.data.by === 'default') {
            setError('Humm, cidade não encontrada!');
            setCity(null);
            return;
        }

        setCity(response.data);
        setInput('');

        if (response.data.results.currently === 'noite') {
            setBackground(['#0c3741', '#0f2f61']);
        }
    }

    if (city) {
        return (
            <SafeAreaView style={styles.container}>
                <BackButton label={'Voltar'} handlePress={resetPage} pageNavigate={'Home'} />

                <SearchBox value={input} placeholder={'Ex: São Paulo, SP'} handleText={handleText} handleSearch={handleSearch} />

                <LinearGradient
                    style={styles.header}
                    colors={background}
                >
                    <Text style={styles.date}>{city.results.date}</Text>
                    <Text style={styles.city}>{city.results.city}</Text>

                    <View>
                        <Text style={styles.temp}>{city.results.temp}°</Text>
                        <Text style={styles.description}>{city.results.description}</Text>
                    </View>

                    <Conditions weather={city} />
                </LinearGradient>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton handlePress={resetPage} pageNavigate={'Home'} />

            <SearchBox value={input} placeholder={'Ex: São Paulo, SP'} handleText={handleText} handleSearch={handleSearch} />

            {error && <Text style={{ marginTop: 25, fontSize: 18 }}>{error}</Text>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '5%',
        backgroundColor: '#e8f0ff',
    },

    searchBox: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ddd',
        width: '90%',
        height: 50,
        borderRadius: 8
    },

    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#fff',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7
    },

    icon: {
        width: '15%',
        backgroundColor: '#1ed6ff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },

    header: {
        marginTop: '5%',
        width: '90%',
        paddingTop: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8
    },

    date: {
        color: '#fff',
        fontSize: 16
    },

    city: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },

    temp: {
        color: '#fff',
        fontSize: 90,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    description: {
        fontSize: 20,
        color: '#fff'
    }
});