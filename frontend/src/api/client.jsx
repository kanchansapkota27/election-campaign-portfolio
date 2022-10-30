import PocketBase from 'pocketbase/cjs';
import { apiurl } from './data';
 
const client= new PocketBase(apiurl,{
    headers:{
        'Access-Control-Allow-Origin':'*',
    }
});

export default client;