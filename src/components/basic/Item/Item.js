import { useState, useEffect } from 'react';

import styles from './Item.module.scss';

import img from '../../../assets/img/placeholder.png';
import Counter from '../Counter/Counter';


export default function Item({label, type, imgPath, galleryPath}) {

    const [ imgUrl, setImgUrl ] = useState(imgPath)
    const [ count, setCount ] = useState();

    useEffect(() => {
      const gallery = async(path) => await fetch( path )
            .then( response => response.json() )
            .then( data => setCount( data.images.length ) )
    
        gallery(galleryPath)

      return () => {
        
      }
    }, [galleryPath])
    

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

    return (
        
        <div className={`${styles.itemWrapper} position-relative`}>
            <Counter count={count} />
            <img src={imgSrc} alt="pic" />

            { typeCategory &&
                <div className={`${styles.caption} center-inner`}>
                    <h6>{label}</h6>
                </div>
            }

        </div>
        
    )
}