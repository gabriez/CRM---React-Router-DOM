import { useLoaderData, Form as FormDom, useNavigate, redirect, useActionData } from "react-router-dom";
import { getClientId, editClient } from '../data/api_helper'
import { Form } from "../components/Form";
import { Error } from "../components/Error";

export async function loader({params}) {
    let client = await getClientId(params.id);
    
    if(Object.values(client).length === 0) {
        throw new Response('', {
            status: 404, 
            statusText: 'No existe tal cliente'
        })
    }

    return client;
}

export async function action({request, params}){
    const formData = await request.formData();
    
    const data = Object.fromEntries(formData);
    const email = formData.get('email');

    const errors = [];
    if(Object.values(data).includes('')){
        errors.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)) errors.push('El email no es válido');

    if(errors.length > 0){
        return errors;
    }

    await editClient(data, params.id)
    return redirect('/');
}

export const EditClient = () => {
    const client = useLoaderData();
    const errors = useActionData();
    const navigate = useNavigate();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
            <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>
            <div className="flex justify-end">
                <button 
                className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                onClick={()=> navigate(-1)}>
                    Volver 
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
                
                <FormDom
                    method="POST"   
                    noValidate 
                >   
                {errors?.length && errors.map( (item, i) => <Error key={i}>{item}</Error> )}
                    <Form 
                    client={client}/>
                    <input type="submit"
                        className="mt-5 w-full hover:bg-blue-900 bg-blue-800 p-3 text-white uppercase font-bold text-lg" 
                        value="Guardar cambios"
                    />
                </FormDom>
            </div>
        </>
    )
}
