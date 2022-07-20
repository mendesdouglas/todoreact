import React, {useState, useEffect} from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
    Alert,
    Platform,
    ActivityIndicator
}

from 'react-native';

import {format} from 'date-fns';




//COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './styles';
import typeIcons from '../../utils/typeIcons';
import DateTimeInput from '../../components/DateTimeInput/index.android';
import api from '../../services/api';

import * as Application from 'expo-application';


export default function Task({navigation}){
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacAddress] = useState();
    const [load, setLoad] = useState(true);
    const [auxData, setAuxData] = useState();

    async function Save(){
                
        if(!type)
            return Alert.alert('Defina o tipo da tarefa');

        if(!title)
            return Alert.alert('Defina o nome da tarefa');
        if(!description)
        return Alert.alert('Defina a descrição da tarefa');

        
        if(!date)
        return Alert.alert('Defina a data da tarefa');

        if(!hour)
        return Alert.alert('Defina a hora da tarefa');

        await api.post('/task', {
            macaddress,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`,
            
        }).then(() => {
            navigation.navigate('Home')
        })

    }

    async function LoadTask(){
        
        await api.get(`/task/${id}`).then(response => {
            setLoad(true);
            setDone(response.data.done);
            setTitle(response.data.title);
            setDescription(response.data.description);
            //setDate(format(new Date(response.data.when),'dd/MM/yyyy'));
            setDate(response.data.when);
            
            console.log('dentro do loadtask', typeof(date));
            
            //format(new Date(currentDate), 'dd/MM/yyyy')
            //setHour(format(new Date(response.data.when),'HH:mm'));
            setHour(response.data.when);
            console.log('dentro do loadtask hora', hour);


            
        });
    }

    

    async function getMacAddress(){
        
        setMacAddress(Application.androidId);  
        //Alert.alert(macaddress);
        setLoad(false);
    };
    

    useEffect(() =>{
        if(navigation.state.params){
            setId(navigation.state.params.idTask);
            //Alert.alert(id);
        }
        
        getMacAddress();
        LoadTask().then(() => setLoad(false));
        
        
        
    },[macaddress]);

    

    
    return(
        <KeyboardAvoidingView  style={styles.container}>
        <Header showBack={true} navigation={navigation}/>
        <ScrollView style={{width: '100%'}}>
            
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
            {
                load 
                ?
                <ActivityIndicator color='#EE6B26' size={50}/>
                :
                typeIcons.map((icon, index) => (
                    icon != null &&
                <TouchableOpacity onPress={()=> setType(index)}>
                    <Image source={icon} style={[styles.imageIcon, type && type != index && styles.typeIconInative]}></Image>
                </TouchableOpacity>
                ))
            }
            
        </ScrollView>
        

        <Text style={styles.label}>date {date} {hour}</Text>
        <TextInput style={styles.input} maxLength={30} 
        placeholder="fazer algo..." 
        onChangeText={(text) => setTitle(text)}
        value={title}
        />

        <Text style={styles.label}>Detalhes </Text>
        <TextInput style={styles.inputArea}
        maxLength={200} 
        multiline={true}
        onChangeText={(text)=> setDescription(text)}
        value={description}
        placeholder="descreva a atividade..."/>

        
        <DateTimeInput type={'date'} save={setDate} date={date} />
        <DateTimeInput type={'time'} save={setHour} hour={hour} />
        
        {
            id &&
            <View style={styles.inLine}>
            <View style={styles.inputInLine}>
                <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? '#EE6B26': '#707070'} />
                <Text style={styles.switchLabel}>Concluído</Text>
                </View>

                <TouchableOpacity>
                    <Text style={styles.removeLabel}>Excluir</Text>
                </TouchableOpacity>
        
            
        </View>
        }
        </ScrollView>
        <Footer icon={'save'} onPress={Save}/>

        
        </KeyboardAvoidingView>

    )
}