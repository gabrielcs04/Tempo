import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { Feather } from '@expo/vector-icons'

export default function SearchBox({ value, placeholder, handleText, handleSearch }) {
    
    return(
        <View style={styles.searchBox}>
            <TextInput 
                value={value}
                onChangeText={ (valor) => handleText(valor) }
                placeholder={placeholder}
                style={styles.input}
            />

            <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                <Feather 
                    name='search'
                    size={22}
                    color='#fff'
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox:{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ddd',
        width: '90%',
        height: 50,
        borderRadius: 8
    },

    input:{
        width: '85%',
        height: 50,
        backgroundColor: '#fff',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7
    },

    icon:{
        width: '15%',
        backgroundColor: '#1ed6ff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }
});