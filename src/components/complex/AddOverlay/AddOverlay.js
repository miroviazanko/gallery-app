import styles from './AddOverlay.module.scss';

import OverlayHeader from '../../basic/OverlayHeader/OverlayHeader';
import ButtonAdd from '../../basic/ButtonAdd/ButtonAdd';



export default function AddOverlay() {

    return (
        <div className={styles.addOverlay}>
            <div className={styles.overlayBanner}>
                <OverlayHeader label="kategorie"/>
                <ButtonAdd label="Pridať" />
            </div>
        </div>
    ) 

}