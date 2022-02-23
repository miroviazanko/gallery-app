import { useState } from 'react';

import styles from './ModalComp.module.scss';

import Modal from 'react-bootstrap/Modal';
import OverlayMainCategory from '../../basic/OverlayMainCategory/OverlayMainCategory';
import OverlayMainPhoto from '../../basic/OverlayMainPhoto/OverlayMainPhoto';
//import ButtonAdd from '../../basic/ButtonAdd/ButtonAdd';




export default function ModalComp({ show ,toggleModal, type }) {

    const [ modalType ] = useState(type === 'category')

    const inputValue = (value) => {
        console.log(value);
    }

    return (

        <Modal show={show} onHide={ () => toggleModal() } className={styles.bootstrapModal} centered>
            <div className='p-4'>
                    <Modal.Header className='p-0 border-0' closeButton>
                        <Modal.Title>Pridať {type}</Modal.Title>
                    </Modal.Header>
                    { modalType ? <OverlayMainCategory inputValue={inputValue}/> : <OverlayMainPhoto /> }
                    

            </div>
        </Modal>

    )

}