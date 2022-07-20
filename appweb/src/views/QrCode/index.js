import React, { useState } from 'react';
import * as S from './styles';
import Qr from 'qrcode.react';

import {Navigate} from 'react-router-dom';





//COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';


function QrCode() {
    const [mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false);

    async function SaveMac(){
        if(!mac)
            alert('Você precisa informar o número que apareceu no celular');
        else{

            localStorage.setItem('@todo/macaddress', mac);
            //alert('Informe o tipo da tarefa')
            setRedirect(true)
            window.location.reload();
        }
        

    }
  

  return (
    <S.Container>
        {redirect && <Navigate to="?"/>}
        <Header />
        <S.Content>
            <h1> CAPTURE O QRCODE PELO CELULAR </h1>
            <p>Suas atividades serão sincronizadas com o celular.</p>
            <S.QrCodeArea>
                <Qr value='getmacaddress' size={350}/>
            </S.QrCodeArea>
            <S.ValidationCode>
                <span> Digite a numeração que apareceu no celular</span>
                <input type="text" onChange={e => setMac(e.target.value)} value={mac}/>
                <button type="button" onClick={SaveMac}>SINCRONIZAR</button>

            </S.ValidationCode>
            
        </S.Content>

        <Footer/>
    </S.Container>
    
  
  )
    
}

export default QrCode;