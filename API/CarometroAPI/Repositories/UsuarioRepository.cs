using CarometroAPI.Contexts;
using CarometroAPI.Domains;
using CarometroAPI.Interfaces;
using CarometroAPI.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CarometroAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        CarometroContext ctx = new CarometroContext();
        public void Atualizar(Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = BuscarPorId(usuarioAtualizado.IdUsuario);

            if (usuarioAtualizado.IdTipoUsuario != null)
            {
                usuarioBuscado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;
            }

            if (usuarioAtualizado.IdInstituicao != null)
            {
                usuarioBuscado.IdInstituicao = usuarioAtualizado.IdInstituicao;
            }

            if (usuarioAtualizado.NomeUsuario != null)
            {
                usuarioBuscado.NomeUsuario = usuarioAtualizado.NomeUsuario;
            }

            if (usuarioAtualizado.Rg != null)
            {
                usuarioBuscado.Rg = usuarioAtualizado.Rg;
            }

            if (usuarioAtualizado.Email != null)
            {
                usuarioBuscado.Email = usuarioAtualizado.Email;
            }

            if (usuarioAtualizado.Senha != null)
            {
                usuarioBuscado.Senha = usuarioAtualizado.Senha;
            }

            ctx.Usuarios.Update(usuarioBuscado);

            ctx.SaveChanges();
        }

        public Usuario BuscarPorEmail(string email)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email);
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }


        public string ConsultarImagem(int idUsuario)
        {
            Imagem imagemUsuario = new Imagem();

            imagemUsuario = ctx.Imagems.FirstOrDefault(i => i.IdUsuario == idUsuario);

            if (imagemUsuario != null)
            {
                return Convert.ToBase64String(imagemUsuario.Binario);
            }

            return null;
        }

        public void Deletar(int idUsuario)
        {
            Usuario usuarioBuscado = BuscarPorId(idUsuario);

            ctx.Usuarios.Remove(usuarioBuscado);

            ctx.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return ctx.Usuarios.ToList();
        }

        public List<Usuario> ListarMeu(int id)
        {
            return ctx.Usuarios
            .Where(c => c.IdUsuario == id)
            .ToList();
        }

        public Usuario Login(string email, string senha)
        {
            Usuario usuarioEncontrado = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuarioEncontrado != null)
            {

                if (usuarioEncontrado.Senha.Length < 50)
                {
                    usuarioEncontrado.Senha = Criptografia.GerarHash(usuarioEncontrado.Senha);

                    ctx.Usuarios.Update(usuarioEncontrado);

                    ctx.SaveChanges();
                }

                bool comparado = Criptografia.Comparar(senha, usuarioEncontrado.Senha);

                if (comparado)
                    return usuarioEncontrado;
            }

            return null;
        }

        public void SalvarImagem(int idUsuario, IFormFile foto)
        {
            Imagem imagemUsuario = new Imagem();


            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);
                imagemUsuario.Binario = ms.ToArray();
                imagemUsuario.NomeArquivo = foto.FileName;
                imagemUsuario.MimeType = foto.FileName.Split('.').Last();
                imagemUsuario.IdUsuario = idUsuario;
            }

            Imagem fotoexistente = new Imagem();
            fotoexistente = ctx.Imagems.FirstOrDefault(i => i.IdUsuario == idUsuario);

            if (fotoexistente != null)
            {
                fotoexistente.Binario = imagemUsuario.Binario;
                fotoexistente.NomeArquivo = imagemUsuario.NomeArquivo;
                fotoexistente.MimeType = imagemUsuario.MimeType;
                fotoexistente.IdUsuario = idUsuario;

                ctx.Imagems.Update(fotoexistente);
            }
            else
            {
                ctx.Imagems.Add(imagemUsuario);
            }

            ctx.SaveChanges();
        }
    }
}
