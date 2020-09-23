const http = async function (url, data, type = 'post') {
  const preUrl = 'http://localhost:5001'
  const _url = preUrl + url
  let requestConfig = {
    credentials: 'include',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'force-cache',
    withCredentials: false,
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(_url, requestConfig)
    return response
  } catch (error) {
    throw new Error(error)
  }
}
export const h5log = (obj) => http('/h5logs', obj)
