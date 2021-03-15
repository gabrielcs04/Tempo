import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Backbutton() {
    const navigation = useNavigation();

    return(
        <TouchableOpacity style={styles.backButton} onPress={ () => navigation.navigate('Home') }>
            <Feather 
                name='chevron-left'
                size={32}
                color='#000'
            />
            <Text style={{ fontSize: 22 }}>Voltar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton:{
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    }
});