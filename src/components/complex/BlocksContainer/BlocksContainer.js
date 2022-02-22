import { useReducer/* , useState, useEffect */ } from 'react';
import { useFetch } from '../../basic/Fetch/FetchHook';
import {  Link } from "react-router-dom";

import styles from './BlocksContainer.module.scss';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Item from '../../basic/Item/Item';
import ItemImg from '../../basic/ItemImg/ItemImg';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';

import Modal from 'react-bootstrap/Modal';
import OverlayMainCategory from '../../basic/OverlayMainCategory/OverlayMainCategory';
import OverlayMainPhoto from '../../basic/OverlayMainPhoto/OverlayMainPhoto';
import ButtonAdd from '../../basic/ButtonAdd/ButtonAdd';
//import Counter from '../../basic/Counter/Counter';
import { IoIosArrowRoundBack } from 'react-icons/io'







export default function BlocksContainer({type, apiPreview, path, object}) {

    const [show, toggleModal] = useReducer( state => !state, false);    

    const { data /* loading, error */ } = useFetch(path, "GET")    


    const items = data ? data[object].map( ( cat,i ) => {

        let existsPreview = "image" in cat;
        let previewPath = existsPreview ? apiPreview + cat.image.fullpath : apiPreview + cat.fullpath;
        let galleryPath = path + "/" + cat.path;

        console.log(galleryPath)

        return (
                     
                <Col xs={12} sm={6} md={4} lg={3} key={i} >                    
                    <Link to={cat.path} className='position-relative'>
                        { /* type === "category" && <Counter className={styles.blockCounter}/> */ }
                        { type === "category" ?
                            <Item label={cat.name} type={type} imgPath={previewPath} galleryPath={galleryPath}/>
                            : <ItemImg label={cat.name} type={type} imgPath={previewPath}/>
                        }
                    </Link>
                </Col>
                         
        )
    }) : null

    const subtitle = () => {
        if ( type === 'gallery' && data ) {
            return (
                <Link to="/">
                        <h5 className={`d-flex align-items-center ${styles.categoryName}`}>
                            <IoIosArrowRoundBack className='me-3'/>{data.gallery.name}
                        </h5>
                </Link>
            )
        } else {
            return (
                <h5>Kategórie</h5>
            )
        }
    }


    return (
        <>
            <div className='my-4'>{subtitle()}</div>            

            <Row className='g-4 g-lg-5'>

                { items }                
                
                <Col xs={12} sm={6} md={4} lg={3} >
                    <ItemAdd type={type}  onClick={ toggleModal }  />
                </Col>
                    
            </Row>
            

            <Modal show={show} onHide={ () => toggleModal() } className={styles.bootstrapModal} centered>
                <div className='p-4'>
                        <Modal.Header className='p-0 border-0' closeButton>
                            <Modal.Title>Pridať {type}</Modal.Title>
                        </Modal.Header>
                        <OverlayMainCategory />
                        <OverlayMainPhoto />
                        <ButtonAdd label="Pridať"/>

                </div>
            </Modal>
               
        </>
        
    )
}