using CarometroAPI.Domains;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace CarometroAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);
        Usuario BuscarPorId(int idUsuario);
        Usuario BuscarPorEmail(string email);
        List<Usuario> ListarMeu(int id);
        void Cadastrar(Usuario novoUsuario);
        void SalvarImagem(int idUsuario, IFormFile foto);
        List<Usuario> Listar();
        void Atualizar(Usuario usuarioAtualizado);
        void Deletar(int idUsuario);
        string ConsultarImagem(int idUsuario);

    }
}
