using System;
using System.Collections.Generic;

#nullable disable

namespace CarometroAPI.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Alunos = new HashSet<Aluno>();
            Crachas = new HashSet<Cracha>();
            Imagems = new HashSet<Imagem>();
            Professors = new HashSet<Professor>();
        }

        public int IdUsuario { get; set; }
        public byte? IdTipoUsuario { get; set; }
        public short? IdInstituicao { get; set; }
        public string NomeUsuario { get; set; }
        public string Rg { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public virtual Instituicao IdInstituicaoNavigation { get; set; }
        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<Aluno> Alunos { get; set; }
        public virtual ICollection<Cracha> Crachas { get; set; }
        public virtual ICollection<Imagem> Imagems { get; set; }
        public virtual ICollection<Professor> Professors { get; set; }
    }
}
