'use client'
import Layout from '../../page';
import React, { useState, useEffect } from 'react';
import { Input } from '../../../components/common';
import { Alert } from '@/components/common/message';
import { useProdutoService } from '../../../services';
import { Produto } from '../../../models/produtos';
import { converterEmBigDecimal} from '../../../util/money';
import Link from 'next/link';
import { useSearchParams  } from 'next/navigation';
import * as yup from 'yup';

const msgCampoObrigatorio = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00 (Zero)")
})

interface FormErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();
    const [ sku, setSku ] = useState<string|undefined>('');
    const [ preco, setPreco ] = useState<any>('');
    const [ nome, setNome ] = useState<string|undefined>('');
    const [ descricao, setDescricao ] = useState<string|undefined>('');
    const [ id, setId ] = useState<string>('');
    const [ cadastro, setCadastro] = useState<string>('');
    const [ messages, setMessages ] = useState<Array<Alert>>([]);
    const [ errors, setErrors] = useState<FormErros>({});

    const searchParams = useSearchParams();
    const res: any  = searchParams.get("id");
    const queryId = parseInt(res);

    useEffect(() => {
        if(queryId) {
            service.carregarProduto(queryId).then(produtoRes => {
                setId(produtoRes.id)
                setSku(produtoRes.sku)
                setNome(produtoRes.nome)
                setDescricao(produtoRes.descricao)
                setPreco(produtoRes.preco)
                setCadastro(produtoRes.cadastro)
            })
        }
    }, [])

    const submit = (event: any) => {
        event.preventDefault();
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco), 
            nome, 
            descricao
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({});
            if(id) {
                service.atualizar(produto).then(resAtualizado => setMessages([{
                    tipo: "success", texto: "Produto atualizado com sucesso!"
                }]));
            }else {
                service.salvar(produto).then(resProduto => {
                    setId(resProduto.id)
                    setCadastro(resProduto.cadastro)
                    setMessages([{
                        tipo: "success", texto: "Produto salvo com sucesso!"
                    }])
                })
            }
        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErrors({
                [field]: message
            })
        });
    }

    return(
        <Layout titulo={'Produtos'} mensagens={messages}>
            <form onSubmit={submit}>
                {id &&
                    <div className='columns'>
                        <Input label="Código:" columnClasses="is-half" value={id} id='inputId' disabled={true}/>
                        <Input label="Data de Cadastro" columnClasses="is-half" value={cadastro} id='inputDataCadastro' disabled={true}/>
                    </div>
                }
                <div className='columns'>
                    <Input label="SKU: *" columnClasses="is-half" onChange={setSku} value={sku} id='inputSku' error={errors.sku} placeholder='Digite o SKU do produto'/>
                    <Input label="Preço: *" columnClasses="is-half" onChange={setPreco} value={preco} id='inputPreco' error={errors.preco}  currency={true} maxLength={16} placeholder='Digite o preço do produto'/>
                </div>
                <div className="columns">
                    <Input label="Nome: *" columnClasses="is-full" onChange={setNome} value={nome} id='inputNome' error={errors.nome} placeholder='Digite o nome do produto'/>
                </div>
                <div className='columns'>
                    <div className="field column is-full">
                        <label className='label' htmlFor='inputDesc'>Descrição: *</label>
                        <div className="control">
                            <textarea className='textarea' id='inputDesc' value={descricao} onChange={event => setDescricao(event.target.value)} placeholder='Digite a descrição detalhada do produto'/>
                            {errors.descricao &&
                                <p className='help is-danger'>{errors.descricao}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className='field is-grouped'>
                    <div className='control'>
                        <button type='submit' className='button'>
                            {
                                id ? "Atualizar" : "Salvar"                                
                            }    
                        </button>
                    </div>
                    <div className='control'>
                        <Link href="/consultas/produtos">
                            <button className='button'>Voltar</button>
                        </Link>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default CadastroProdutos;