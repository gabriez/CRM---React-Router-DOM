import { useNavigate, Form as FormDom, useActionData, redirect } from "react-router-dom"
import { Form } from "../components/Form";
import { Error } from "../components/Error";
import { createClient } from "../data/api_helper";

export async function action ({request}) {
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

    await createClient(data);

    return redirect('/');
}

const NewClient = () => {
    const navigate = useNavigate();
    const errors = useActionData();
    
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
            <div className="flex justify-end">
                <button 
                className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                onClick={()=> navigate('/')}>
                    Volver 
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
                
                <FormDom
                    method="POST"   
                    noValidate 
                >   
                {errors?.length && errors.map( (item, i) => <Error key={i}>{item}</Error> )}
                    <Form/>
                    <input type="submit"
                        className="mt-5 w-full hover:bg-blue-900 bg-blue-800 p-3 text-white uppercase font-bold text-lg" 
                        value="Registrar cliente"
                    />
                </FormDom>
            </div>
        </>
    )
}

export default NewClient
