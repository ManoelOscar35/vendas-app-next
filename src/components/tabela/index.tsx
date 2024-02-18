import { Produto } from '@/models/produtos';
import { useState } from 'react';

interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
    onEdit
}) => {
    return(
        <table className="table is-striped is-hoverable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(produto => 
                    <ProdutoRow 
                        onDelete={onDelete} 
                        onEdit={onEdit} 
                        produto={produto} 
                        key={produto.nome}
                    />)

                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onDelete,
    onEdit
}) => {
    const [ deletando, setDeletando] = useState<boolean>(false);

    const onDeleteClick = (produto: Produto) => {
        if(deletando) {
            onDelete(produto)
        } else {
            setDeletando(true)
        } 
    }

    const cancelaDelete = () => setDeletando(false);

    return(
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                {!deletando &&
                    <button onClick={e => onEdit(produto)} 
                        className='button is-success is-rounded is-small mr-1'>
                        Editar
                    </button>
                }
                <button onClick={e => onDeleteClick(produto)} 
                    className='button is-danger is-rounded is-small mr-1'>
                    {deletando ? "Confirma?" : "Deletar"}
                </button>
                {deletando &&
                    <button onClick={e => cancelaDelete()} 
                        className='button is-rounded is-small'>
                        Cancelar
                    </button>
                }
            </td>
        </tr>
    )
}