import axios from 'axios';

const restCountriesAxios = axios.create({
	baseURL: `https://restcountries.eu/rest/v2`,
	timeout: 10000
})


const getCountriesResultBySearchString = (_searchString = '') => {

	return new Promise(async(resolve,reject) => {
		const resultObj = {
			isWrapperResult: true,
			success: false,
			result: [],
			error: null
		}

		try {
			if(_searchString===''){
				throw new Error("EMPTY SEARCHSTRING");
			}

			const requestAxiosResult = await restCountriesAxios({
				method: "GET",
				url: `/name/${_searchString}`
			})

			resultObj.success = true;
			resultObj.result = requestAxiosResult.data;
			resultObj.error = null;

			resolve(resultObj);

		}catch(e){
			console.log(`restCountriesWrapper | ERROR IN getCountriesResultBySearchString | ${e.message}`);

			if(e.isAxiosError){
				if(e.response){
					resultObj.error = e.response.data
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
	getCountriesResultBySearchString
}
