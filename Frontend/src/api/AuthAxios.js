import Authapi from "./AuthRequest";

const getRequest = async (path)=>{
    try {
        const response = await Authapi.get(path)
        return response; 
    } catch (error) {
        return error;
    }
}

const postRequest = async (path, data)=>{
    try {
        const response = await Authapi.post(path, data)
        return response; 
    } catch (error) {
        return error;
    }
}

const deleteRequest = async (path)=>{
    try {
        const response = await Authapi.delete(path)
        return response; 
    } catch (error) {
        return error;
    }
}

const putRequest = async (path)=>{
    try {
        const response = await Authapi.put(path)
        return response; 
    } catch (error) {
        return error;
    }
}


export {getRequest, postRequest, deleteRequest, putRequest};