import Header from '../../components/header/header';
import Perfil from '../../components/perfilFoto/perfilFoto';
import React, { Component } from 'react';
import api from '../../services/api';

import '../../assets/css/MeuCracha.css';

import icone_setas from '../../assets/img/icone_setas.png';
import imagem_base from '../../assets/img/logo_sesi.png';
// import img_padrao_cracha from '../../assets/img/img_padrao_cracha.png';
import { Link } from 'react-router-dom';

export default class MeuCracha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCracha: [],
            listaAlunos: [],
            base64img: '',
            perido: ''
        };
    }

    buscarCrachaAluno() {

        api.get('/alunos/minha', {
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
    buscarPeriodo() {
        api.get('/Alunos/minha', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaAlunos: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    }


    componentDidMount() {
        this.buscarCrachaAluno();
    }


    render() {
        return (
            <div>
                <Header />
                <Link to={'/'}><img className="seta_retorno" src={icone_setas} alt="setas_retorno" /></Link>
                <main className="container_cracha">

                    <div className='a'>

                        {
                            this.state.listaCracha.map((itens) => {
                                console.log(itens)
                                return (
                                    <>
                                        <div className="box-conteudo">
                                            <div className="box-conteudo-espacamento">
                                                <Perfil />
                                                <div className="box-conteudo-card" key={itens.idAluno}>
                                                    <p className="box-conteudo-texto">{itens.idUsuarioNavigation.nomeUsuario}</p>
                                                    <p className="box-conteudo-texto">RG: {itens.idUsuarioNavigation.rg}</p>
                                                    <p className="box-conteudo-texto">Email: {itens.idUsuarioNavigation.email}</p>
                                                    <p className="box-conteudo-texto">Turma: {itens.idTurmaNavigation.nomeTurma}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border">
                                            <div className="fundo" key={itens.idAluno}>
                                                <img className='logo' src={imagem_base} alt="" />
                                                <Perfil />
                                                {/* <img className='aluno' src={`data:image;base64,${this.state.base64img}`} alt="" /> */}
                                                <span>{itens.idUsuarioNavigation.nomeUsuario}</span>
                                                <div className='space'>

                                                    {
                                                        itens.idUsuarioNavigation.idTipoUsuario === 3 &&
                                                        <span>PROFESSOR</span>
                                                    }
                                                    {
                                                        itens.idUsuarioNavigation.idTipoUsuario === 2 &&
                                                        <span>ALUNO</span>
                                                    }

                                                    <span> </span>

                                                    {
                                                        itens.idTurmaNavigation.idPeriodo === 1 &&
                                                        <span>Manhã</span>
                                                    }
                                                    {
                                                        itens.idTurmaNavigation.idPeriodo === 2 &&
                                                        <span>Tarde</span>
                                                    }


                                                    {/* <span>{itens.idAlunoNavigation.idTurmaNavigation.idPeriodoUsuario.nomePeriodo}</span> */}
                                                </div>
                                                <span />
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </main >


            </div >

        );
    }
}