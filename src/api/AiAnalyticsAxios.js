import AiAnalyticsApi from "./AiAnalyticsRequest";

const AigetReq = async (path)=>{
    try {
        const response = await AiAnalyticsApi.get(path)
        return response; 
    } catch (error) {
        return error;
    }
}

const AipostReq = async (path, data)=>{
    try {
        const response = await AiAnalyticsApi.post(path, data)
        return response; 
    } catch (error) {
        return error;
    }
}

const AideleteReq = async (path)=>{
    try {
        const response = await AiAnalyticsApi.delete(path)
        return response; 
    } catch (error) {
        return error;
    }
}

const AiputReq = async (path)=>{
    try {
        const response = await AiAnalyticsApi.put(path)
        return response; 
    } catch (error) {
        return error;
    }
}


export {AigetReq, AipostReq, AideleteReq, AiputReq};