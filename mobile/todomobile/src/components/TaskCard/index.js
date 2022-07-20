import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';

import styles from './styles';

import typeIcons from '../../utils/typeIcons';


export default function TaskCard({type, done, title, when, onPress}){
    const date = format(new Date(when), 'dd/MM/yyyy');
    const hour = format(new Date(when), 'HH:mm') ;

    return(
        <TouchableOpacity style={[styles.card, done && styles.done]} onPress={onPress}>
            <View style={styles.cardLeft}>
                <Image source={typeIcons[type]} style={styles.typeActive}/>
                <Text style={styles.cardTitle}> {title} </Text>

            </View>
            <View style={styles.cardRight}>
                <Text style={styles.cardDate}>{date}</Text>
                <Text style={styles.cardTime}>{hour}</Text>
            
            </View>
        </TouchableOpacity>
        
        
    )

}