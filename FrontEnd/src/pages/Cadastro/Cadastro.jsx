import React, { Component } from 'react';
import Header from '../../components/header/header';
import api from '../../services/api';

// import '../../assets/css/.css'

export default class Cadastro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            IdTipoUsuario: 0,
            IdInstituicao: 0,
            NomeUsuario: '',
            Rg: '',
            Email: '',
            Senha: '',
            Imagem: '',
            arquivo: '',
            base64img: '',
        };
    };

    cadastrarUsuario = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true })

        let usuario = {
            IdTipoUsuario: this.state.IdTipoUsuario,
            IdInstituicao: this.state.IdInstituicao,
            NomeUsuario: this.state.NomeUsuario,
            Rg: this.state.Rg,
            Email: this.state.Email,
            Senha: this.state.Senha
        };

        if (this.state.arquivo !== '') {
            const formData = new FormData();

            formData.append(
                'arquivo',
                this.state.arquivo,
            );

            api.post('/usuarios', usuario, formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
                .then((resposta) => {
                    if (resposta.status === 201) {
                        this.buscarConsultas()
                        this.setState({ isLoading: false })
                    }
                })
                .catch((resposta) => console.log(resposta),
                    this.setState({ isLoading: false })
                )
                .then(() => {
                    this.limparCampos()
                })
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="container_titulo">
                        <div className="color">
                            <h1>Cadastro</h1>
                        </div>
                    </div>
                    <div className="fundo">
                        <form onSubmit={this.cadastrarConsulta}>
                            <div className="divisao">
                                    <input type="file" id="myFile" name="filename" />

                                <div className="campos">
                                    <span>Nome</span>
                                    <label hmlFor=""></label><input type="text" name="nameJ" placeholder="Nome" />
                                </div>
                                <div className="campos">
                                    <span>RG</span>
                                    <label hmlFor=""></label><input type="text" name="RGJ" placeholder="RG" />
                                </div>
                                <div className="campos">
                                    <span>Data de Nascimento</span>
                                    <label hmlFor=""></label><input type="date" name="DataJ" placeholder="DD/MM/YYYY" />
                                </div>
                                <div className="campos">
                                    <span>E-mail</span>
                                    <label hmlFor=""></label><input type="email" name="EmailJ" placeholder="E-mail" />
                                </div>
                                <div className="campos">
                                    <span>Senha</span>
                                    <label hmlFor=""></label><input type="password" name="SenhaJ" placeholder="Senha" />
                                </div>
                            </div>
                            <div className="campos">
                                <span>Tipo</span>
                                <div className="equipe">
                                    <select name="format" id="format">
                                        <option selected disabled>Escolha o tipo de usuário</option>
                                        <option value="1">Aluno</option>
                                        <option value="2">Professor</option>
                                        <option value="3">Administrador</option>
                                    </select>
                                </div>
                            </div>
                            <label className="enviar" hmlFor="botao">Cadastrar</label>
                            <input type="submit" name="botao" />
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}