import styles from './OverlayHeader.module.scss';

import { VscClose } from 'react-icons/vsc';

export default function OverlayHeader({label}) {


    return (
        <div className={styles.overlayHeader}>
            <h3>Pridať {label}</h3>
            <VscClose size={24}/>
        </div>
    )

}