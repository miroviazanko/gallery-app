import { useRef } from 'react';
import styles from './ButtonFile.module.scss';



export default function ButtonFile({ uploadedFilesImg }) {

    const hiddenFileInput = useRef();   

    const handleFileInput = (e) => {        
        uploadedFilesImg(e, 'input')
    }

    const handleFileBtn = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    }

    return (
        <div className={styles.buttonFile}>
            <form encType="multipart/form-data"
                  /*</div>onSubmit={ (e) => handleSubmitFileForm(e)}*/ >
                <input id="upload"
                    ref={hiddenFileInput}
                    type="file"
                    multiple
                    name="file"
                    accept="image/*"
                    onChange={ (e) => handleFileInput(e) } 
                />
                <button className={styles.coverBtn}
                        onClick={ (e) => handleFileBtn(e) }>
                        Vyberte súbory
                </button>
            </form>
        </div>
    )

}