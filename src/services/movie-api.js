
 export default class ApiService {



     getFilms = async (url='https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=ebea8cfca72fdff8d2624ad7bbf78e4c') => {
         const res = await fetch(url);

         if (!res.ok) {
             throw new Error(`Could not fetch ${url}` +
                 `, received ${res.status}`)
         }
         return await res.json();

     };

 }

