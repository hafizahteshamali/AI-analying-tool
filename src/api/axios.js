import apiClient from "./Request";

const getRequest = async (path)=>{
    try {
        const response = await apiClient.get(path)
        return response; 
    } catch (error) {
        return error;
    }
}

const postRequest = async (path, data)=>{
    try {
        const response = await apiClient.post(path, data)
        return response; 
    } catch (error) {
        return error;
    }
}

const deleteRequest = async (path)=>{
    try {
        const response = await apiClient.delete(path)
        return response; 
    } catch (error) {
        return error;
    }
}

const putRequest = async (path)=>{
    try {
        const response = await apiClient.put(path)
        return response; 
    } catch (error) {
        return error;
    }
}


export {getRequest, postRequest, deleteRequest, putRequest};