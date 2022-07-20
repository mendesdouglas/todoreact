import React, { useState, useEffect } from 'react';
import * as S from './styles';

import {Link, Navigate } from 'react-router-dom';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

//COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

function Home() {
  const [filterActived, setFilterActived] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [lateCount, setLateCount] = useState();
  const [redirect, setRedirect] = useState(false);

  async function loadTasks(){
    await api.get(`/task/filter/${filterActived}/${isConnected}`)
    .then(response => {
      setTasks(response.data)
      

    })
  }

  

  
  function Notification(){
    setFilterActived('late');
  }
//use effect controla o estado, quando o parametro for mudado ele captura e starta o efeito
  useEffect(() => {
    loadTasks();
    if(!isConnected)
      setRedirect(true)
    
  },[filterActived])

  return (
    <S.Container>
        {redirect && <Navigate to ="/qrcode"/>}
        <Header clickNotification={Notification}/>
        <S.FilterArea>
          <button type="button" onClick={() => setFilterActived("all")}>
              <FilterCard title = "Todos"   actived={filterActived === 'all'} />
          </button>

          <button type="button" onClick={() => setFilterActived("today")}>
              <FilterCard title = "Hoje"    actived={filterActived === 'today'}  />
          </button>

          <button type="button" onClick={() => setFilterActived("week")}>
              <FilterCard title = "Semana"  actived={filterActived === 'week'} />
          </button>

          <button type="button" onClick={() => setFilterActived("month")}>
              <FilterCard title = "Mês"     actived={filterActived === 'month'}/> 
          </button>

          <button type="button" onClick={() => setFilterActived("year")}>
              <FilterCard title = "Ano"     actived={filterActived === 'year'} />
          </button>
        </S.FilterArea>

        <S.Title>
          <h3>{filterActived == 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS' }</h3>
        </S.Title>
        
        <S.Content>
          {
            tasks.map(t => (
              <Link to= {`/task/${t._id}`}>
                <TaskCard type={t.type} title={t.title} when={t.when} done={t.done}/>
                </Link>
            ))
            

          }          
        </S.Content>
        
        <Footer/>
    </S.Container>
    
  
  )
    
}

export default Home;
