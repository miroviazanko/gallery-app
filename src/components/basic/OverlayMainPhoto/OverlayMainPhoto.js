import styles from './OverlayMainPhoto.module.scss';

import { BsCardImage } from 'react-icons/bs';
import ButtonFile from '../ButtonFile/ButtonFile';


export default function OverlayMainPhoto({uploadedFiles}) {

    const uploadedFilesFormData = (e) => {
        uploadedFiles(e)
    }

    return (
        <div className={`${styles.overlayMainPhoto} my-4 p-4 text-center`}>
            <div className={`${styles.dragDrop} pb-2`}>
                <BsCardImage />
                <h6 className='mt-2 mb-3'>Sem presuňte fotky</h6>
            </div>
            
            <h6 className='text-color-shadow mb-4'>alebo</h6>
            
            <ButtonFile uploadedFilesFormData={uploadedFilesFormData}/>

        </div>
    )

}