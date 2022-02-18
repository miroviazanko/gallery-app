import styles from './Item.module.scss';

import img from '../../../assets/img/placeholder.png';



export default function Item({label, type, imgPath}) {


    const typeCategory = type === 'category' ? true : false;

    const imgSrc = imgPath ? imgPath : img;

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