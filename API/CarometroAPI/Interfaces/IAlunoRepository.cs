using CarometroAPI.Domains;
using System.Collections.Generic;

namespace CarometroAPI.Interfaces
{
    public interface IAlunoRepository
    {
        Aluno BuscarPorId(int idAluno);
        void Cadastrar(Aluno novoAluno);
        List<Aluno> Listar();
        List<Aluno> ListarAluno(int id);
        void Atualizar(Aluno AlunoAtualizado);
        void Deletar(int idAluno);
    }
}
