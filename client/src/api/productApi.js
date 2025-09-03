import Axios from 'axios'

export const getProducts = async () => {
const token= localStorage.getItem('token')
if (!token) {
    throw new Error('No token found')
}
const config = {
    headers: {
        Authorization: 'Bearer ' + token
    }
}
    const response = await Axios.get('/api/products', config)
    return response.data
}
export const addItem = async (item) => {
   const token = localStorage.getItem('token')
   if(!token) {
    throw new Error('NO token found')
   }
   const config= {
    headers: {
        Authorization: 'Bearer ' + token
    }
}
    const response = await Axios.post('/api/products', item, config)
   return response.data

}
export const updateProduct = async (productId, productData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await Axios.put(`/api/products/${productId}`, productData, config);
    return response.data;
};

export const deleteItem = async (id) => {
    const token = localStorage.getItem('token')
    if(!token) {
        throw new Error('NO token found')
    }
    const config= {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const response = await Axios.delete(`/api/products/${id}`, config)
    return response.data

}

