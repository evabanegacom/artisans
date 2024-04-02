import { submitFormData, api } from '../utils/api';

const getTips = async (userId:number) => {
    const response = await api.get(`/recommendations?user_id=${userId}`)
    return response.data;
}

const RecommendationService = {
    getTips
}

export default RecommendationService;