import React, {useState, useEffect} from 'react'; //disponivel para ambos.
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from 'react-native'; //disponivel somente para a versão mobile


import styles from './styles';

// COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

//NOVA LIBS
import * as Application from 'expo-application';

//API
import api from '../../services/api';



export default function Home({navigation}){

    const [filter, setFilter] = useState('today');
    const [tasks, setTasks] = useState([]);
    const [load, setLoad] = useState(false);
    const [lateCount, setLateCount] = useState(false);
    const [macaddress, setMacAddress] = useState();

    async function getMacAddress(){
        setMacAddress(Application.androidId);
        
        };

    async function loadTasks(){
        setLoad(true);
        await api.get(`/task/filter/${filter}/${macaddress}`)
        .then(response => {
            setTasks(response.data)
        setLoad(false)
        });

    }

    async function lateVerify(){
        await api.get(`/task/filter/late/${macaddress}`)
        .then(response => {
            setLateCount(response.data.length)
        
        });

    }
    async function Notification(){
        setFilter('late');
    
    }

    function New(mac){
        navigation.navigate('Task');

    }

    function Show(id){
        navigation.navigate('Task', {idTask: id});

    }

    useEffect(() => {
        getMacAddress().then(() => {
            loadTasks();
        });
        
        lateVerify();
        //Alert.alert(macaddress);

    }, [filter, macaddress])

    return(
        <View style={styles.container}>
            <Header showNotification={true} showBack={false} pressNotification={Notification} late={lateCount} />
            <View style={styles.filter}>
                <TouchableOpacity onPress={() => setFilter('all')}>
                    <Text style={ filter == 'all' ? styles.filterTextActived : styles.filterTextInative
                }>
                        Todos
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('today')}>
                    <Text style={filter == 'today' ? styles.filterTextActived:styles.filterTextInative}>
                        Hoje
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('week')}>
                    <Text style={filter == 'week' ? styles.filterTextActived: styles.filterTextInative}>
                        Semana
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('month')}>
                    <Text style={filter == 'month' ? styles.filterTextActived: styles.filterTextInative}>
                        Mês
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('year')}>
                    <Text style={filter == 'year' ? styles.filterTextActived: styles.filterTextInative}>
                        Ano
                    </Text>
                </TouchableOpacity>

            </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Tarefas {filter=='late' && 'Atrasadas'}</Text>

                </View>

                
            
            <ScrollView style={styles.content} contentContainerStyle={{alignItems:'center'}}>
            
            {
                load 
                ?
                <ActivityIndicator color='#EE6B26' size={50}/>
                :
                tasks.map(t =>
                    (
                    <TaskCard type={t.type} done={false} title={t.title} when={t.when} onPress={() => Show(t._id)}/>
                ))
                
            }
            
            
            </ScrollView>

            <Footer icon={'add'} onPress={() => New(macaddress)} />
        </View>
        
    )

}