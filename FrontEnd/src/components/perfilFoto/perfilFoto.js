import { React, Component } from 'react';
import api from '../../services/api';
import '../../assets/css/MeuCracha.css';


export default class Perfilfoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64img: '',
    };
  }
  buscaImg = () => {
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
    this.buscaImg();
  }

  render() {
    return (<>

    <img
      className="aluno"
      alt=""
      src={`data:image;base64,${this.state.base64img}`}
    />
    </>
    );
  }
}