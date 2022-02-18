import { useReducer, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import styles from './BlocksContainer.module.scss';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Item from '../../basic/Item/Item';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';

import Modal from 'react-bootstrap/Modal';
import OverlayMainCategory from '../../basic/OverlayMainCategory/OverlayMainCategory';
import OverlayMainPhoto from '../../basic/OverlayMainPhoto/OverlayMainPhoto';
import ButtonAdd from '../../basic/ButtonAdd/ButtonAdd';

import { useFetch } from '../../basic/Fetch/FetchHook';





export default function BlocksContainer({type, apiPreview, loading, data, path, error}) {

    const [show, toggleModal] = useReducer( state => !state, false);

    

    


    const items = data ? data.map( ( cat,i ) => {

        let existsPreview = "image" in cat;
        let path = existsPreview ? apiPreview + cat.image.fullpath : null;

        return (
                     
                <Col xs={12} sm={6} md={4} lg={3} key={i}>
                    <Link to={cat.path}>
                        <Item label={cat.name} type={type} imgPath={path}/>
                    </Link>
                </Col>
                         
        )
    }) : null




    return (
        <>

            <Row className='g-4 g-lg-5'>

                { items }                
                
                <Col xs={12} sm={6} md={4} lg={3} >
                    <ItemAdd type={type}  onClick={ toggleModal }  />
                </Col>
                    
            </Row>
            

            <Modal show={show} onHide={ () => toggleModal() } className={styles.bootstrapModal}
                centered>
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