import {useState, useEffect} from 'react';
import axios from 'axios';
// import {RAPID_API_KEY} from '@env';

// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query ) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          // 'X-RapidAPI-Key': '72914a00bcmsh491f91a1b55824fp1f5ef4jsn37ff67b31fc3',
          // 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          'X-RapidAPI-Key': 'd92635677cmsh86cc2bbe7f47a11p1aa225jsnfed0ecb8278b',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query},
      };
      
      const fetchData = async () =>{
        setIsLoading(true);
        
        try{
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        }catch(err){
            setError(err);
            alert('Error fetching data');
        }finally{
            setIsLoading(false);
        }
      }

      useEffect(()=>{
        fetchData();
      },[])

      const refetch = ()=>{
        setIsLoading(false);
        fetchData();
      }

      return{ data, isLoading, refetch, error};
}

export default useFetch;