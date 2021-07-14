
export default class BitsService {
  


    getResource = async (url) => {
      const res = await fetch(url)
        if(!res.ok){
          throw new Error(`Could not fetch ${url} , received ${res.status } `)
        }
      const body = await res.json()
      return body
    }
  

}