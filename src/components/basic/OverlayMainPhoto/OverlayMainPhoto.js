import styles from './OverlayMainPhoto.module.scss';

import { BsCardImage } from 'react-icons/bs';
import ButtonFile from '../ButtonFile/ButtonFile';
import Dropzone from 'react-dropzone';


export default function OverlayMainPhoto({uploadedFiles}) {

    const uploadedFilesFormData = (e, source) => {
        let uploaded = source === 'input' ? Array.from( e.target.files ) : e;
        const formData = new FormData()

        uploaded.forEach((file, i) => {
            formData.append(i, file)
        })

        uploadedFiles(formData)
    }

    return (
        <div className={`${styles.overlayMainPhoto} my-4 p-4 text-center`}>
            <Dropzone onDrop={(e) => uploadedFilesFormData(e, 'drag')} accept='image/*' minSize={0} maxSize={10242880}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div className={`${styles.dragDrop} ${isDragActive ? styles.insertDragDrop : ''} pb-2`} {...getRootProps()}>
                        <BsCardImage />
                        <h6 className={` mt-2 mb-3`}>Sem presuňte fotky</h6>
                    </div>
                )}
            </Dropzone>
            
            <h6 className='text-color-shadow mb-4'>alebo</h6>
            
            <ButtonFile uploadedFilesImg={uploadedFilesFormData}/>

        </div>
    )

}