import { useState } from "react";
import { useNavigate } from "react-router";
import type { TipoProduto } from "../../types/types";

const API_URL = import.meta.env.VITE_API_URL;

//cadastro de produto baseado no AppScript
export default function CadastrarProduto() {
    document.title = "Cadastrar Produto";
    const navigate = useNavigate();

    const [produto, setProduto] = useState<TipoProduto>({
        id: "",
        nome: "",
        preco: 0,
        estoque: 0,
        avatar: "",
    });

    const handleCadastro = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
                action: "POST",
                ...produto,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro no cadastro: ${response.status}`);
        }

        const resultado = await response.json();

        if (resultado.status === "error") {
            throw new Error(resultado.message);
        }

        alert("Produto cadastrado com sucesso!");
        navigate("/Produtos");
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <main>
        <h2>Cadastrar Produto</h2>
        <form>
        <fieldset>
            <legend>Dados do Produto</legend>
            <div>
                <label htmlFor="nome">Nome do Produto:</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={produto.nome}
                    onChange={(event) =>
                        setProduto({
                        ...produto,
                        nome: event.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label htmlFor="preco">Preço do Produto:</label>
                <input
                    type="number"
                    step={0.1}
                    name="preco"
                    id="preco"
                    value={produto.preco}
                    onChange={(event) =>
                        setProduto({
                        ...produto,
                        preco: parseFloat(event.target.value) || 0,
                        })
                    }
                />
            </div>
            <div>
                <label htmlFor="estoque">Estoque:</label>
                <input
                    type="number"
                    step={1}
                    name="estoque"
                    id="estoque"
                    value={produto.estoque}
                    onChange={(event) =>
                        setProduto({
                        ...produto,
                        estoque: parseInt(event.target.value) || 0,
                        })
                    }
                />
            </div>
            <div>
                <label htmlFor="avatar">URL da Imagem:</label>
                <input
                    type="url"
                    name="avatar"
                    id="avatar"
                    value={produto.avatar}
                    onChange={(event) =>
                        setProduto({
                        ...produto,
                        avatar: event.target.value,
                        })
                    }
                />
            </div>
            <div>
                <button type="button" onClick={() => handleCadastro()}>CADASTRAR</button>
            </div>
            </fieldset>
        </form>
        </main>
    );
}