import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { condition } from '../../utils/condition';

export default function Forecast({ data }) {

    let icon = condition(data.condition)

    return(
        <View style={styles.container}>
            <Text style={styles.date}>{data.date}</Text>
            <Text style={styles.weekday}>{data.weekday}</Text> 
            <Ionicons name={icon.name} color={icon.color} size={25}/>

            <View style={styles.temp}>
                <Text>{data.min}°</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.max}°</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        marginLeft: 10,
        borderRadius: 8,
        paddingTop: 10,
        marginBottom: 10,
        paddingLeft: 14,
        paddingRight: 14,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    date:{
        fontSize: 14
    },

    weekday:{
        fontSize: 15,
        fontWeight: 'bold'
    },

    temp:{
        alignItems: 'center'
    }
});