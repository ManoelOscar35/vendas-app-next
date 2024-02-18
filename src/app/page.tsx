import { Alert } from '@/components/common/message';
import { Message } from '@/components/common';
import Link from 'next/link';

interface LayoutProps {
  titulo?: string;
  children?: React.ReactNode
  mensagens?: Array<Alert>
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="app">
      <section className="main-content columns is-fullheight">
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
          <p className="menu-label is-hidden-touch">
            Minhas Vendas
          </p>
          <ul className="menu-list">
            <MenuItem href='/' label='Home'/> 
            <MenuItem href='/consultas/produtos' label='Produtos'/>
            <MenuItem href='/cadastro/clientes' label='Clientes'/>
            <MenuItem href='/' label='Config'/>
            <MenuItem href='/' label='Sair'/> 
          </ul>
        </aside>
        <div className="container column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  {props.titulo}
                </p>
              </div>
              <div className="card-content">
                <div className="content">
                  {props.mensagens &&
                    props.mensagens.map(msg => <Message {...msg} key={msg.tipo}/>)

                  }
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Layout;

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return( 
    <li>
      <Link href={props.href}>
        <span className="icon"></span>{props.label}
      </Link>
    </li>
  )
}
