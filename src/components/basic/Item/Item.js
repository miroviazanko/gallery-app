import { useState, useEffect } from 'react';

import styles from './Item.module.scss';
//import { checkImage } from '../../../Helpers/checkImg';
import { getUrlLastPart } from '../../../Helpers/getUrlLastPart';


import Counter from '../Counter/Counter';
import img from '../../../assets/img/placeholder.png';
import Trash from '../Trash/Trash';
import Loading from '../Loading/Loading';



export default function Item({label, type, imgPath, galleryPath}) {

    const [ imgUrl, setImgUrl ] = useState(imgPath) 
    const [ gallery, setGallery] = useState([]);

    useEffect(() => {
     
        if ( itemType ) {
            const gallery = async(path) => await fetch( path )
                    .then( response => response.json() )
                    .then( data => setCount( data.images.length ) )
                    .then( () => setLoading(false) )
            
            gallery(galleryPath)
            
        }
        //checkImage(imgPath, setImgUrl);

    }, [galleryPath])

    useEffect( () => {
        if ( itemType ) {
            galleryCount(count, label)
        }
    }, [count])

    //const imgSrc = imgUrl ? imgUrl :img; 

    const lastPart = getUrlLastPart(imgPath);
    const imgSrc = lastPart !== 'undefined' ? imgPath : img;




    useEffect( () => {

        const gallery = async() => {
            await fetch(galleryPath)
            .then( resp => resp.json() )
            .then( data => setGallery(data) )
        }
        gallery();
      

	}, [ galleryPath ] );



    return (
        
        <div className={`${styles.itemWrapper} position-relative`}>
            <Counter count={gallery.images && gallery.images.length}/>
            <img src={imgSrc} alt="pic" />

            <img src={imgSrc} alt="pic" />
    
            { itemType &&
                <div className={`${styles.caption} center-inner`}>
                    <h6>{label}</h6>
                </div>
            }
            <Trash galleryPath={galleryPath} handleTrashClick={handleTrashClick}/>

        </div>
        
    )
}