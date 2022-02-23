import { useState } from 'react';

import styles from './Trash.module.scss';

import { FaRegTrashAlt } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'



export default function Trash({ galleryPath, handleTrashClick }) {
    
    const [toggleOverlay, setToggleOverlay] = useState( false )    

    const toggleOverlayFn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setToggleOverlay( state => !state );
    }

    return (
        <div className={`${styles.trash} ${toggleOverlay && styles.trashOverlay}`}>

            { toggleOverlay &&
                <div className='w-100 h-100 d-flex' onClick={(e) => toggleOverlayFn(e)}>
                    <div className={`${styles.removeNotice} w-100 center-inner flex-column`}>
                        <h2>Zmazať ?</h2>
                        <div className='center-inner mt-4 w-100 justify-content-evenly'>
                            <IoIosCheckmarkCircleOutline className={styles.iconCheck}
                                                        onClick={ (e) => {
                                                                toggleOverlayFn(e);
                                                                handleTrashClick(e, galleryPath);                                                                 
                                                            }}/>
                            <MdOutlineCancel className={styles.iconCancel} onClick={(e) => toggleOverlayFn(e)} />
                        </div>
                    </div>
                </div>
            }

            { !toggleOverlay && <FaRegTrashAlt className={styles.trashIcon} onClick={(e) => toggleOverlayFn(e)} /> }
        </div>
    )
}