
 export default class ApiService {

     getFilms = async (page,url=`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`) => {
        const nurl=`${url}&page=${page}`
         console.log('GETPAGE URL',nurl)
         const res = await fetch(nurl);

         if (!res.ok) {
             throw new Error(`Could not fetch ${url}` +
                 `, received ${res.status}`)
         }
         return await res.json();

     };
     getFilm = async (id) => {
         const url=`https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`;
         const res = await fetch(url);

         if (!res.ok) {
             throw new Error(`Could not fetch ${url}` +
                 `, received ${res.status}`)
         }
         return await res.json();


     };

 }

