import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout';
import Home, {loader as ClientsLoader} from '../pages/Home';
import NewClient, {action as NewClientAction} from '../pages/NewClient';
import { EditClient, loader as EditClientLoader, action as EditClientAction} from '../pages/EditClient';
import { action as deleteClientAction} from '../components/Client';
import {ErrorPage} from "../components/ErrorPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>,
                loader: ClientsLoader,
                errorElement: <ErrorPage/>
            },
            {
                path: '/clientes/nuevo',
                element: <NewClient/>,
                action: NewClientAction,
                errorElement: <ErrorPage/>
            },
            {
                path: '/clientes/:id/editar',
                element: <EditClient/>,
                loader: EditClientLoader,
                action: EditClientAction,
                errorElement: <ErrorPage/>
            },
            {
                path: '/clientes/:id/eliminar',
                action: deleteClientAction,
                errorElement: <ErrorPage/>
            }
        ]
    }
]);

export default router;