using CarometroAPI.Domains;
using System.Collections.Generic;

namespace CarometroAPI.Interfaces
{
    public interface IProfessorRepository
    {
        Professor BuscarPorId(int idProfessor);
        void Cadastrar(Professor novoProfessor);
        List<Professor> Listar();
        List<Professor> ListarProf(int id);
        void Atualizar(Professor professorAtualizado);
        void Deletar(int idProfessor);
    }
}
