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

export default class Cracha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaProfs: [],
            base64img: '',
            perido: ''
        };
    }

    buscarCrachaProfessor() {

        api.get('/professores/minha', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta.data)
                    this.setState({ listaProfs: resposta.data });
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

    buscarPeriodo() {
        api.get('/Alunos/minha', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaProfs: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    }


    componentDidMount() {
        this.buscarCrachaProfessor();
        this.buscaImg();
    }


    render() {
        return (
            <div>
                <Header />
                <Link to={'/'}><img className="seta_retorno" src={icone_setas} alt="setas_retorno" /></Link>
                <main className="container_cracha">

                    <div className='a'>
                        <div className="border">
                            {
                                    this.state.listaProfs.map((itens) => {
                                        return (
                                            <div className="fundo" key={itens.idProfessor}>
                                                <img className='logo' src={imagem_base} alt="" />
                                                <img className='aluno' src={`data:image;base64,${this.state.base64img}`} alt="" />
                                                <span>{itens.idUsuarioNavigation.nomeUsuario}</span>
                                                <div className='space'>
                                                    <span>PROFESSOR</span>
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