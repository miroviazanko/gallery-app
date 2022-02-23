import { useState, useEffect } from 'react';

import styles from './Item.module.scss';
//import { checkImage } from '../../../Helpers/checkImg';
import { getUrlLastPart } from '../../../Helpers/getUrlLastPart';

import img from '../../../assets/img/placeholder.png';
import Counter from '../Counter/Counter';
import Trash from '../Trash/Trash';




export default function Item({label, type, imgPath, galleryPath, handleTrashClick}) {

    //const [ imgUrl, setImgUrl ] = useState(imgPath)
    const [ count, setCount ] = useState();
    const [ itemType ] = useState(type === "category");


    useEffect(() => {
     
        if ( itemType ) {
            const gallery = async(path) => await fetch( path )
                    .then( response => response.json() )
                    .then( data => setCount( data.images.length ) )
            
            gallery(galleryPath)
        }

        //checkImage(imgPath, setImgUrl);
    }, [galleryPath])

    const lastPart = getUrlLastPart(imgPath);
    const imgSrc = lastPart !== 'undefined' ? imgPath : img;

    return (
        
        <div className={`${styles.itemWrapper} position-relative`}>
            
            { itemType && <Counter count={count} /> }
            <img src={imgSrc} alt="pic" />
    
            { itemType &&
                <div className={`${styles.caption} center-inner`}>
                    <h6>{label}</h6>
                </div>
            }
            { itemType && <Trash galleryPath={galleryPath} handleTrashClick={handleTrashClick}/>}

        </div>
        
    )
}