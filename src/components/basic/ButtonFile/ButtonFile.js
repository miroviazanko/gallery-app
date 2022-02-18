import { useRef } from 'react';
import styles from './ButtonFile.module.scss';



export default function ButtonFile() {

    const hiddenFileInput = useRef();

    const handleBtnClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    }

    return (
        <div className={styles.buttonFile}>
            <form encType="multipart/form-data"
                    /*</div>onSubmit={}*/>
                <input id="upload"
                    ref={hiddenFileInput}
                    type="file"
                    multiple
                    name="file"
                    accept="image/*"
                    /* onChange={} */
                />
                <button className={styles.coverBtn}
                        onClick={ (e) => handleBtnClick(e) }>
                    Vyberte súbory
                </button>
            </form>
        </div>
    )

}