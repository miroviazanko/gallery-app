/* import { getUrlLastPart } from '../../../Helpers/getUrlLastPart';
 

export async function deleteGallery(path) => await fetch( path, {
    "method": "DELETE"
}).then( () => {
    const lastPart = getUrlLastPart(path);
    setDatas( datas => {
        return {
            galleries: datas.galleries.filter( item => item.path !== lastPart  )
        }
    } )
    }
) */