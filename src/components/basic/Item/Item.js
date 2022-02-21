import { useState, useEffect } from 'react';

import styles from './Item.module.scss';


import Counter from '../Counter/Counter';
import img from '../../../assets/img/placeholder.png';



export default function Item({label, type, imgPath, galleryPath}) {

    const [ imgUrl, setImgUrl ] = useState(imgPath) 
    const [ gallery, setGallery] = useState([]);

    function testImage(URL) {
        var tester=new Image();
        //tester.onload=imageFound;
        tester.onerror=imageNotFound;
        tester.src=URL;
    }
    
    function imageNotFound(imgPath) {
        setImgUrl('');
    }

    testImage(imgPath);

    const typeCategory = type === 'category' ? true : false;

    const imgSrc = imgUrl ? imgUrl : img;


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

            { typeCategory &&
                <div className={`${styles.caption} center-inner`}>
                    <h6>{label}</h6>
                </div>
            }

        </div>
        
    )
}