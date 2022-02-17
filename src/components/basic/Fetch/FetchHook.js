import { useEffect, useState } from "react";



export function useFetch(uri, method) {

    const [ data, setData ] = useState();
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState(true);


    useEffect( () => {
        if (!uri) return;
        fetch(uri, {
               "method": method,
               "headers": {
                   "Content-Type":"application/json"
               },
               "mode": 'cors',
               "cache": 'default'
       }).then(response => response.json())
         .then( setData )
         .then( () => setLoading(false) )
         .catch( setError );
   }, [uri, method])

   return {
       loading,
       data, 
       error
   }
};