using System;
using System.Collections.Generic;

#nullable disable

namespace CarometroAPI.Domains
{
    public partial class Professor
    {
        public int IdProfessor { get; set; }
        public int? IdUsuario { get; set; }
        public string Matricula { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
