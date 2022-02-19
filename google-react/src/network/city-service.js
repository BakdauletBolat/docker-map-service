import axios from 'axios';

class CityService {
    url = `http://${window.location.hostname}:8000`;

    async getRurals() {
        return await axios.get(`${this.url}/api/cities/rural-list/`)
                     .then(response=>response.data)
    }

    async getRuralsRaw() {
        return await axios.get(`${this.url}/api/cities/rural-list-raw/`)
                     .then(response=>response.data)
    }

    async getFieldsLocaltiesWater() {
        return await axios.get(`${this.url}/api/cities/localties-water/`)
                     .then(response=>response.data.filter(item=>item.required))
        
    }

    async getFieldsLocaltiesGas() {
        return await axios.get(`${this.url}/api/cities/localties-gas/`)
                     .then(response=>response.data.filter(item=>item.required))
        
    }

    async getFieldsLocaltiesElectr() {
        return await axios.get(`${this.url}/api/cities/localties-electr/`)
                     .then(response=>response.data.filter(item=>item.required))    
    }

    async getLocaltiesByRuralId(id) {
        return await axios.get(`${this.url}/api/cities/rural/${id}`)
                     .then(response=>response.data)
    }

    async getLocaltiesByRuralRawId(id) {
        return await axios.get(`${this.url}/api/cities/rural-raw/${id}/`)
                     .then(response=>response.data)
    }

    async getLocaltyById(id) {
        return await axios.get(`${this.url}/api/cities/localties/${id}`)
                    .then(response=>response.data)
    }

    async getPolyLinesByTypeAndLocalty(typeId,localtyId) {
        return await axios.get(`${this.url}/api/new-polylines?typeMarkerId=${typeId}&localtiesId=${localtyId}`)
                    .then(response=>response.data)
    }

    async getRelevantsByTypeAndLocalty(typeId,localtyId) {
        return await axios.get(`${this.url}/api/relevants?typeId=${typeId}&localtiesId=${localtyId}`)
                     .then(response=>response.data)
    }


    async createLocaltiesWater(body) {
        return await axios.post(`${this.url}/api/cities/localties-water/`,body)
        .then(res=>res.data)
    }

    async createLocaltiesGas(body) {
        return await axios.post(`${this.url}/api/cities/localties-gas/`,body)
        .then(res=>res.data)
    }

    async createLocaltiesElectr(body) {
        return await axios.post(`${this.url}/api/cities/localties-electr/`,body)
        .then(res=>res.data)
    }

    async createPolyLines(body) {
        return await axios.post(`${this.url}/api/polyline/`,body)
        .then(res=>res.data)
    }
}


export default CityService;