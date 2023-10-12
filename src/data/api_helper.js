export async function getClients () {
    const url = import.meta.env.VITE_API_URL;

    const response = await fetch(url);
    const resultado = await response.json();

    return resultado;
}

export async function getClientId (id) {
    const url = import.meta.env.VITE_API_URL;

    const response = await fetch(`${url}/${id}`);
    const resultado = await response.json();

    return resultado;
}

export async function createClient (client) {
    const url = import.meta.env.VITE_API_URL;

    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let resultado = await response.json();
    } catch (error) {
        alert("Ha ocurrido un error con el registro");
    }
}

export async function editClient (client, id) {
    const url = import.meta.env.VITE_API_URL;

    try {
        let response;
        response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        alert("Ha ocurrido un error con el registro");
    }
}

export async function deleteClient (id) {
    const url = import.meta.env.VITE_API_URL;

    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
    const resultado = await response.json();

    return resultado;
}
