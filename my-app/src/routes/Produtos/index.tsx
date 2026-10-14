import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { TipoProduto } from "../../types/types";

//integracao

const API_URL = import.meta.env.VITE_API_URL;

export default function Produtos() {
  document.title = "Produtos";
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro na listagem: ${response.status}`);
        }
        const resultado = await response.json();
        if (resultado.status === "error") {
          throw new Error(resultado.message);
        }
        // Garante que pega o array de dados retornado pelo Apps Script
        setProdutos(resultado.data || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    carregarProdutos();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmou = window.confirm("Deseja realmente excluir este produto?");
    if (!confirmou) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "DELETE",
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na exclusão: ${response.status}`);
      }

      const resultado = await response.json();
      if (resultado.status === "error") {
        throw new Error(resultado.message);
      }

      alert("Produto excluído com sucesso!");
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h2>Produtos</h2>
      <Link to="/CadastrarProduto">Cadastrar produto</Link>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>PREÇO</th>
            <th>ESTOQUE</th>
            <th>AVATAR</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {Number(produto.preco).toFixed(2)}</td>
              <td>{produto.estoque}</td>
              <td>
                {produto.avatar ? (
                  <img src={produto.avatar} alt={produto.nome} width="50" />
                ) : (
                  "Sem imagem"
                )}
              </td>
              <td>
                <Link to={`/EditarProdutos/${produto.id}`}>Editar</Link>
                <button type="button" onClick={() => handleDelete(produto.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Quantidade de registros : {produtos.length}</td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}