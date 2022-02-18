import styles from './AddOverlay.module.scss';

import OverlayHeader from '../../basic/OverlayHeader/OverlayHeader';
import OverlayMainCategory from '../../basic/OverlayMainCategory/OverlayMainCategory';
import OverlayMainPhoto from '../../basic/OverlayMainPhoto/OverlayMainPhoto';
import ButtonAdd from '../../basic/ButtonAdd/ButtonAdd';



export default function AddOverlay({label}) {

    return (
        <div className={styles.addOverlay}>
            <div className={styles.overlayBanner}>
                <OverlayHeader label={label}/>
                <OverlayMainCategory />
                <OverlayMainPhoto />
                <ButtonAdd label="Pridať" />
            </div>
        </div>
    ) 

}