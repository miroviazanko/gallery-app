import styles from './OverlayHeader.module.scss';

import { VscClose } from 'react-icons/vsc';

export default function OverlayHeader({label}) {

    const handleClick = () => console.log('close')

    return (
        <div className={`${styles.overlayHeader} mb-5`}>
            <h3>Pridať {label}</h3>
            <VscClose size={24} onClick={ () => handleClick() } 
                      className={ styles.closeIcon }/>
        </div>
    )

}