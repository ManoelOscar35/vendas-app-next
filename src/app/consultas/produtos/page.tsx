'use client'

import Layout from '../../page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TabelaProdutos } from '@/components/tabela';
import { httpClient } from '@/http';
import useSWR from '../../../../node_modules/swr';
import { Loader } from '@/components/common/loader';
import { Produto } from '@/models/produtos';
import { useProdutoService } from '@/services/produto.service';
import { useState, useEffect } from 'react';
import { Alert } from '@/components/common/message';

const ListagemProdutos: React.FC = () => {

    const [ messages, setMessages ] = useState<Array<Alert>>([]);
    const [ lista, setLista ] = useState<Produto[]>([]);
    const service = useProdutoService();
    const {data, error} = useSWR('/api/produtos', url => httpClient.get(url))

    useEffect(() => {
        setLista(data?.data || [])
    }, [data]);

    const router = useRouter();

    const editar = (produto: Produto) => {
        const url = `/cadastro/produtos?id=${produto.id}`;
        router.push(url);
    }

    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(res => {
            setMessages([{
                tipo: "success", texto: "Produto excluído com sucesso!"
            }]);
        })

        const listaAlterada: Produto[] = lista?.filter(p => p.id !== produto.id);
        setLista(listaAlterada);
    }

    return(
        <Layout titulo="Produtos" mensagens={messages}>
            <Link href="/cadastro/produtos">
                <button className='button is-warning'>Novo</button>
            </Link>
            <br/>
            <br/>
            <Loader  show={!data}/>
            <TabelaProdutos produtos={lista || []} onDelete={deletar} onEdit={editar}/>
        </Layout>
    )
}

export default ListagemProdutos;