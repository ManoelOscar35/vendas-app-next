'use client'

import Layout  from '@/app/page';
import { ClienteForm } from './form';
import { useState }  from 'react';
import { Cliente } from '@/models/clientes';

const CadastroCliente: React.FC = () => {

    const [cliente, setCliente] = useState<Cliente>({});

    const handleSubmit = (cliente: Cliente) => {
        console.log(cliente)
    }

    return(
        <Layout titulo="Clientes">
            <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>
        </Layout>
    )
}

export default CadastroCliente;