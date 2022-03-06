import React, { Component } from "react";
import { Link } from "react-router-dom";
import { parseJwt } from "../../services/auth";

import Logo_Sesi from '../../assets/img/logo_sesi.png';
import icone_agenda from '../../assets/img/icone_agenda.png';
import icone_perfil from '../../assets/img/icone_perfil.png';

import '../../assets/css/Login.css'

export default class header extends Component {

    mostrarCracha = () => {
        if (parseJwt() != null) {
            switch (parseJwt().role) {
                case '2':
                    window.location.href = "/crachaAluno"
                    break;
                case '3':
                    window.location.href = "/crachaProfessor"
                    break;
                default:
                    window.location.href = "/login"
                    break;
            }

        } else {
            alert("Usuário não está logado.")
        }
    }

    mostrarCarometro = () => {
        if (parseJwt() != null) {
            switch (parseJwt().role) {
                case '1':
                    return (
                        <><img className="icone_carometro" src={icone_agenda} alt="icone carometro" />
                            <button onClick={() => this.listar()}>Carômetro</button>
                        </>
                    )
                case '2':
                    return (
                        <>
                            <span></span>
                            <span></span>
                        </>
                    )
                case '3':
                    return (
                        <><img className="icone_carometro" src={icone_agenda} alt="icone carometro" />
                            <button onClick={() => this.listar()}>Carômetro</button>
                        </>
                    )
                default:
                    break;
            }

        } else {
            alert("Usuário não está logado.")
        }
    }
    mostrarPerfil = () => {
        if (parseJwt() != null) {
            switch (parseJwt().role) {
                case '1':
                    return (
                        <><img className="icone_carometro" src={icone_perfil} alt="icone carometro" />
                            <button onClick={() => this.cadastrar()}>Cadastro</button>
                        </>
                    )
                case '2':
                    return (
                        <>
                            <span></span>
                            <span></span>
                        </>
                    )
                case '3':
                    return (
                        <><img className="icone_carometro" src={icone_perfil} alt="icone carometro" />
                            <button onClick={() => this.listar()}>Carômetro</button>
                        </>
                    )
                default:
                    break;
            }

        } else {
            alert("Usuário não está logado.")
        }
    }

    listar = () => {
        if (parseJwt() != null) {
            switch (parseJwt().role) {
                case '1':
                    window.location.href = "/listar"
                    break;
                case '2':
                    // window.location.href = "/permissao"
                    alert("Somente professores e admnistradores podem acessar o carômetro!")
                    break;
                case '3':
                    window.location.href = "/listar"
                    break;
                default:
                    window.location.href = "/"
                    break;
            }

        } else {
            alert("Usuário não está logado.")
        }
    }

    cadastrar = () => {
        window.location.href = '/cadastro'
    }


    render() {

        return (
            <header>
                <div class="container container_header">
                    <Link to={'/'}><img src={Logo_Sesi} alt="logo" /></Link>
                    <nav className="menu_header">
                        <span></span>
                        <span></span>


                        {
                            this.mostrarCarometro()
                        }
                        {
                            this.mostrarPerfil()
                        }



                    </nav>
                </div>
            </header>

        )
    }
}