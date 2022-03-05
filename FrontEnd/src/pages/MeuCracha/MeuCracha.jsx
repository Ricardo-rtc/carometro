import Header from '../../components/header/header';
import React, { Component } from 'react';
import api from '../../services/api';

import '../../assets/css/MeuCracha.css';

import icone_setas from '../../assets/img/icone_setas.png';
import imagem_base from '../../assets/img/logo_sesi.png';
import imagem_yuri from '../../assets/img/img_perfil_yuri.png';
// import img_padrao_cracha from '../../assets/img/img_padrao_cracha.png';
import { Link } from 'react-router-dom';
import { parseJwt } from '../../services/auth';

export default class MeuCracha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCracha:[],
            base64img: '',
            tipo: ''
        };
    }



    buscarCrachaAluno() {

        api.get('/usuarios/uses', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaCracha: resposta.data });
                }
            })

            // caso ocorra algum erro, exibe no console do navegador este erro
            .catch(erro => console.log(erro));
    };

    buscaImg() {
        api.get('/Usuarios/imagem', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ base64img: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    };


    componentDidMount() {
        this.buscarCrachaAluno();
        this.buscaImg();
        this.mostrarCracha();
      }


    render() {
        return (
            <div>
                <Header />
                <Link to={'/'}><img class="seta_retorno" src={icone_setas} alt="setas_retorno" /></Link>
                <main class="container_cracha">

                    <div className='a'>
                        <div className="border">
                            {
                                this.state.listaCracha.map((itens) => {
                                    switch (itens.idTipoUsuario) {
                                        case 2:
                                            this.setState.tipo = 'ALUNO'
                                            break;
                                            case 3:
                                                this.setState.tipo = 'PROFESSOR'
                                            break;
                                    }
                                    return (
                                        <div className="fundo" key={itens.idUsuario}>
                                            <img className='logo' src={imagem_base} alt="" />
                                            <img className='aluno' src={`data:image;base64,${this.state.base64img}`} alt="" />
                                            <span>{itens.nomeUsuario}</span>
                                            <div className='space'>
                    
                                                <span>{this.state.tipo}</span>
                                                <span> </span>
                                                <span>Manhã</span>
                                            </div>
                                            <span></span>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </main>


            </div>

        );
    }
}
