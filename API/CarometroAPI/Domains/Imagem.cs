using System;
using System.Collections.Generic;

#nullable disable

namespace CarometroAPI.Domains
{
    public partial class Imagem
    {
        public int IdImagem { get; set; }
        public int? IdUsuario { get; set; }
        public byte[] Binario { get; set; }
        public string MimeType { get; set; }
        public string NomeArquivo { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
