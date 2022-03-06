import React, { Component } from 'react';
import Header from '../../components/header/header';
import api from '../../services/api';
import '../../assets/css/Listar.css'

import editar from '../../assets/img/botao-editar 1.png';
import excluir from '../../assets/img/excluir 5.png';
import listar from '../../assets/img/lista-de-controle 1.png';

export default class Listar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaAlunos: [],
            base64img: '',
            perido: ''
        };
    }

    buscarDados() {

        api.get('/alunos/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaAlunos: resposta.data });
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
        this.buscarDados();
        this.buscaImg();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h1>Carômetro</h1>

                </div>
                {
                    
                    this.state.listaAlunos.map((itens) => {
                    return (
                            <div key={itens.idAluno}>
                                <section className="card-aluno" >
                                    <img className="card-aluno-imagem" src={`data:image;base64,${this.state.base64img}`} alt="" />
                                    <div className="card-aluno-box-texto">
                                        <h2>{itens.idUsuarioNavigation.nomeUsuario}</h2>
                                        <p className="card-aluno-texto">Aluno</p>
                                        <div className="card-aluno-menu">
                                            <img className="card-menu-imagem" src={editar} alt="" />
                                            <img className="card-menu-imagem" src={listar} alt="" />
                                            <img className="card-menu-imagem" src={excluir} alt="" />
                                        </div>
                                    </div>
                                </section>
                                {/* <section class="card-alterar">
                                    <h2>Alterar dados</h2>
                                    <div class="card-alterar-input-img">
                                        <div class="card-alterar-inputs">
                                            <input className='input' placeholder={itens.idUsuarioNavigation.nomeUsuario}  type="text" />
                                            <input className='input' type="text" />
                                            <input className='input' type="text" />
                                        </div>
                                        <div>
                                            <img class="card-alterar-imagem" src={`data:image;base64,${this.state.base64img}`} alt="" />
                                        </div>
                                    </div>
                                    <button className='button'>Alterar</button>
                                </section> */}
                            </div>
                        )
                    })
                }



            </div >

        );
    }
}
