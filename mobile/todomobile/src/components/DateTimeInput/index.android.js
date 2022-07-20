import React, {useState,useEffect} from 'react';
import {TouchableOpacity, Image, TextInput, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import  TimePickerAndroid  from '@react-native-community/datetimepicker';
import {format, parseISO } from 'date-fns';

import styles from './styles';
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInput({type, save, date, hour}){
    const [dateTime, setDateTime] = useState();
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [hora, setHora] = useState();
    
    
    
    


   

    

    const newTime = (event, value) => {
        const currentDate = value || dateTime;
        if(type == 'date') {
            
            setShow(false);
            setDateTime(format(new Date(currentDate), 'dd/MM/yyyy'));
            save(format(new Date(currentDate), 'yyyy-MM-dd'));
            console.log('data componente');
            
        } else {
            setShow(false);
            setDateTime(format(new Date(currentDate), 'HH:mm'));
            save(format(new Date(currentDate), 'HH:mm'));
            //save('oi brasil');
            console.log('hora componente');
        }
        console.log('datetime',dateTime);
    };

    
    
    async function selectDataOrHour(){
        if(type === 'date'){
            setShow(true);
            setMode('date');
           
        }else{
            setShow(true);
            setMode('time');
            
        }
        
    }
    function showMessage(){
        if(type != 'date'){
            console.log(type);
        
        
    }
    }

    useEffect(() => {
        if(type === 'date' && date){
            setShow(false);
            console.log('data android', new Date(date));
            setDateTime(format(new Date(date), 'dd/MM/yyyy'));
            save(format(new Date(date), 'yyyy-MM-dd'));
            //console.log('teste ', save);

        }
        else{
            setShow(false);
            console.log('data hora', new Date(hour).toString());
            setHora(new Date(hour).toString());
            console.log('teste', hora);
            //setDateTime(format(new Date(hora), 'HH:mm'));
            //save(format(new Date(hora), 'HH:mm'));
            

          
            
            
        }
    },[]);

    
    return (
        <TouchableOpacity onPress={selectDataOrHour}>
      <TextInput 
      style={styles.input} 
      placeholder={type == 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...' }
      editable={false}
      value={dateTime}
      />
        {
            show &&
      <DateTimePicker value={new Date} mode={mode} is24Hour={true} display='default' onChange={newTime} />
      
        }
      <Image 
      style={styles.iconTextInput} 
      source={type == 'date' ? iconCalendar : iconClock} />
    </TouchableOpacity>
    

        )
}


