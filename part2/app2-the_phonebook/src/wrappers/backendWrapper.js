import axios from 'axios';


const BACKEND_AXIOS = axios.create({
	baseURL: `http://localhost:3001/persons`
})

const getErrorStringFromHttpResponseCode = (code) => {
	let errString = "SERVER ERROR";
	switch(code){
		case 404:
		errString = "RECORD NOT FOUND";
		break;
	}

	return errString;
}


const getPersonsData = () => {
	return new Promise(async(resolve,reject) => {
		const resultObj = {
			success: true,
			result: null,
			error: null
		}

		try{

			const personsAxiosResult = await BACKEND_AXIOS({
				method: "GET",
				url: '/'
			});

			resultObj.success = true;
			resultObj.error = null;
			resultObj.result = personsAxiosResult.data;



		}catch(e){
			console.log(`backendWrapper | getPersonsData | ERROR IN FETCHING PERSONS DATA `,e);
			resultObj.success = false;
			resultObj.result = null;
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
		}

		resolve(resultObj)

	})
}


const addPersonEntry = (__personObj) => {
	return new Promise(async(resolve,reject) => {

		const resultObj = {
			success: false,
			result: null,
			error: null
		}

		try{

			const personAddAxiosResult = await BACKEND_AXIOS({
				method: "POST",
				url: '/',
				data: __personObj
			})

			resultObj.success = true;
			resultObj.result = personAddAxiosResult.data;
			resultObj.error = null;

		}catch(e){
			console.log(`backendWrapper | addPersonEntry | ERROR IN FETCHING PERSONS DATA `,e);
			resultObj.success = false;
			resultObj.result = null;
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
		}

		resolve(resultObj);
	})
}


const deleteById = (__id) => {

	return new Promise(async(resolve,reject) => {
		const resultObj = {
			success: false,
			result: null,
			error: null
		}

		try{

			const deleteAxiosResult = await BACKEND_AXIOS({
				method: "DELETE",
				url: `/${__id}`
			})

			resultObj.success = true;
			resultObj.result = deleteAxiosResult.data;
			resultObj.error = null;
		}catch(e){
			console.log(`backendWrapper | deleteById | ERROR IN FETCHING PERSONS DATA `,e);
			resultObj.success = false;
			resultObj.result = null;
			if(e.isAxiosError){
				if(e.response){
					if(Object.keys(e.response.data).length===0){
						resultObj.error = {
							errCode: e.response.status,
							message: getErrorStringFromHttpResponseCode(e.response.status)
						}

					} else {
						resultObj.error = e.response.data;
					}
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
		}

		resolve(resultObj);
	})
}


const updateById = (__id,__updateObj) => {

	return new Promise(async(resolve,reject) => {

		const resultObj = {
			success: false,
			result: null,
			error: null
		}

		try{

			const updateAxiosResult = await BACKEND_AXIOS({
				method: "PUT",
				url: `${__id}`,
				data: {
					...__updateObj
				}
			});

			resultObj.success = true;
			resultObj.result = updateAxiosResult.data;
			resultObj.error = null;

		}catch(e){
			console.log(`backendWrapper | updateById | ERROR IN FETCHING PERSONS DATA `,e);
			resultObj.success = false;
			resultObj.result = null;
			if(e.isAxiosError){
				if(e.response){
					if(Object.keys(e.response.data).length===0){
						resultObj.error = {
							errCode: e.response.status,
							message: getErrorStringFromHttpResponseCode(e.response.status)
						}

					} else {
						resultObj.error = e.response.data;
					}
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
		}


		resolve(resultObj);
	})
}


export default {
	getPersonsData,
	addPersonEntry,
	deleteById,
	updateById
}