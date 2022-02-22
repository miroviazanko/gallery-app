import { useState } from 'react';

import styles from './ItemImg.module.scss';

import img from '../../../assets/img/placeholder.png';



export default function ItemImg({label, type, imgPath}) {

    const [ imgUrl, setImgUrl ] = useState(imgPath)

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
        
        <div className={`${styles.itemWrapper}`}>
            <img src={imgSrc} alt="pic" />

            { typeCategory &&
                <div className={`${styles.caption} center-inner`}>
                    <h6>{label}</h6>
                </div>
            }

        </div>
        
    )
}