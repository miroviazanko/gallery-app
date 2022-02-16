import styles from './Item.module.scss';

import img from '../../../assets/img/pexels-erika-ortiz-10895939.jpeg';



export default function Item(props) {
    
    const type = props.type;

    const typeCategory = type === 'category' ? true : false;

    return (
        
        <div className={styles.itemWrapper}>
            <img src={img} alt="pic" />

            { typeCategory &&
                <div className={`${styles.caption} center-inner`}>
                    <h6>kategoria</h6>
                </div>
            }

        </div>
        
    )
}