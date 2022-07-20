import React, { useState, useEffect } from 'react';
import * as S from './styles';

import { format } from 'date-fns';



import api from '../../services/api';
import isConnected from '../../utils/isConnected';


//COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';

import {Navigate, useParams } from 'react-router-dom';

//import iconCalender from '../../assets/calendar.png';
//import iconClock from '../../assets/clock.png';


function Task({match}) {
    const [redirect, setRedirect] = useState(false);
    
    const [type, setType] = useState();
    const id = useParams();
    const [setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    
    

  
  


  async function LoadTaskDetails(){
      await api.get(`/task/${id.id}`)
      .then(response => {
        
        setType(response.data.type)
        setTitle(response.data.title)
        setDone(response.data.done)
        setDescription(response.data.description)
        setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
        setHour(format(new Date(response.data.when), 'HH:mm'))
        
      })
  }
  

  async function Save(){
    //Validação dados
    if(!title){
        alert('Informe o título da tarefa')
        /*var nome = document.getElementById('txtitle');
        document.getElementById('txtitle').focus();
        document.getElementById("message-title").style.border =  "1px solid red";
        return false*/
    }else if(!description){
        return alert('Informe a descrição da tarefa')
        /*var nome = document.getElementById('txdescription');
        document.getElementById('txdescription').focus();
        document.getElementById("message-description").style.border =  "1px solid red";
        return false*/
    }else if(!type)
        return alert('Informe o tipo da tarefa')
    else if(!date)
        return alert('Informe a data da tarefa')
    else if(!hour)
        return alert('Informe a hora da tarefa')


      if(id.id){
        await api.put(`/task/${id.id}`,{
            macaddress: isConnected,
            done,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`
        }).then(() =>
            setRedirect(true)
        )

      }else{
        await api.post('/task',{
            macaddress: isConnected,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`
        }).then(() =>
            setRedirect(true)
        )
        }
    }

    async function Remove(){
        const res = window.confirm("Deseja realmente remover esta tarefa?")
        if (res==true){
            await api.delete(`/task/${id.id}`)
            .then(()=> setRedirect(true))
            
        }
        
    }
  

  useEffect(() => {

    if(!isConnected)
        setRedirect(true)
    LoadTaskDetails();
    
       
    
  },[id])

  return (
    <S.Container>
        {redirect && <Navigate to="/" />} 
        <Header />

        <S.Form>
            <S.TypeIcons>
                {
                TypeIcons.map((icon, index) => (
                    
                    index > 0 && 
                    <button type="button" onClick={()=> setType(index)}>
                        <img src={icon} alt="Tipo da Tarefa"
                        className={type && type != index && 'inative'}/>
                    </button>
                ))
            }
            </S.TypeIcons>
            <S.Input>
                <span>Título</span>
                <input id="txtitle" type="text" autoFocus placeholder="Título da tarefa" 
                onChange={e => setTitle(e.target.value)} value={title}/>
                <span id="message-title"> </span>
            </S.Input>

            <S.TextArea>
                <span>Descrição</span>
                <textarea id="txdescription" rows={5} placeholder="Detalhes da tarefa"
                onChange={e => setDescription(e.target.value)} value={description}/>
                <span id="message-description"></span>
            </S.TextArea>

            <S.Input>
                <span>Data</span>
                <input type="date" placeholder="Título da tarefa" 
                onChange={e => setDate(e.target.value)} value={date}/>
                 {/*<img src={iconCalender} alt="Calendário" />*/}
            </S.Input>

            <S.Input>
                <span>Hora</span>
                <input type="time" placeholder="Título da tarefa"
                onChange={e => setHour(e.target.value)} value={hour}/>
                
                {/*<img src={iconClock} alt="Relógio" /> */}
            </S.Input>

            <S.Options>
                <div>
                    <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
                    <span>CONCLUÍDO</span>
                </div>
                {id.id && <buttom type="button" onClick={Remove}>EXCLUIR</buttom>}
            </S.Options>

            <S.Save>
                <button type="button" onClick={Save}>SALVAR</button>
            </S.Save>
            

        </S.Form>

        <Footer/>
    </S.Container>
    
  
  )
    
}

export default Task;
