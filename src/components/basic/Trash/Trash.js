import styles from './Trash.module.scss';

import { FaRegTrashAlt } from 'react-icons/fa'



export default function Trash({ galleryPath, forceRender, handleTrashClick }) {
    
    return (
        <div className={styles.trash}>
            <FaRegTrashAlt className={styles.trashIcon} onClick={ (e) => handleTrashClick(e, galleryPath) } />
        </div>
    )
}