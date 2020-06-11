import axios from 'axios';

const weatherStackAxios = axios.create({
	baseURL: `http://api.weatherstack.com/`,
	timeout: 10000
})


const getWhetherResponseForQuery = (query="") => {
	return new Promise(async(resolve,reject) => {
		const resultObj = {
			isWrapperResult: true,
			success: false,
			result: null,
			error: null
		}
		try{
			if(query===""){
				throw new Error("EMPTY QUERY");
			}

			const weatherStackAxiosResponse = await weatherStackAxios({
				method: "GET",
				url: `/current`,
				params: {
					access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
					query: query
				}
			});

			resultObj.result = weatherStackAxiosResponse.data;
			resultObj.success = true;

			resolve(resultObj);


		}catch(e){
			if(e.isAxiosError){
				if(e.response){
					resultObj.error = e.response.data;
				} else if(e.request){
					resultObj.error = {
						message: "NO RESPONSE FROM SERVER"
					}
				} else {
					resultObj.error = {
						message: "ERROR IN MAKING REQUEST"
					}
				}
			} else {
				resultObj.error = {
					message: e.message || "UNKNOWN REQUEST ERROR"
				}
			}

			resultObj.success=false;
			resultObj.result = null;

			reject(resultObj);

		}
	})
}


export default {
	getWhetherResponseForQuery
}