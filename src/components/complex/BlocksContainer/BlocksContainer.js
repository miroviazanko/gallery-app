import { useReducer/* , useEffect,  useState */} from 'react';
//import { useFetch } from '../../basic/Fetch/FetchHook';
import {  Link } from "react-router-dom";

import styles from './BlocksContainer.module.scss';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from '../../basic/Item/Item';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';
import ModalComp from '../ModalComp/ModalComp';
import Subtitle from '../../basic/Subtitle/Subtitle';
import SortItems from '../../basic/SortItems/SortItems';

import Modal from 'react-bootstrap/Modal';
import OverlayMainCategory from '../../basic/OverlayMainCategory/OverlayMainCategory';
import OverlayMainPhoto from '../../basic/OverlayMainPhoto/OverlayMainPhoto';
import ButtonAdd from '../../basic/ButtonAdd/ButtonAdd';
import { IoIosArrowRoundBack } from 'react-icons/io'





export default function BlocksContainer({type, apiPreview, path, object, lightBoxImg, inputValueCategory, data, deleteGallery}) {

    const [ show, toggleModal ] = useReducer( state => !state, false);    
    const [ blockType ] = useState(type === 'category')
    const [ datas, setDatas ] = useState();
    
    // Lightbox 
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

export default function BlocksContainer({type, object, data, preview, apiUrl}) {

    const [show, toggleModal] = useReducer( state => !state, false);
    

    const items = data.galleries ? data.galleries.map( ( cat,i ) => {
        
        let existsPreview = "image" in cat;
        let imgPath = existsPreview ? preview + '/' + cat.image.fullpath : preview + '/' + cat.fullpath;

        let galleryPath = apiUrl + '/' + cat.path;


        return (                     
                <Col xs={12} sm={6} md={4} lg={3} key={i} >                    
                    <Link to={cat.path} className='position-relative'>
                        <Item label={cat.name} galleryPath={galleryPath} imgPath={imgPath} type={type}/>
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



    const imagesArr = datas && !blockType ? datas.images.map( img => [lightBoxImg + getUrlLastPart(path) + '/' + img.path] ) : null;

    return (
        <>           
            <Row>
                <Col xs={12} sm={8}>
                    <Subtitle type={blockType} data={datas} />    
                </Col>
                <Col xs={12} sm={4} className="text-center">
                    { blockType && <SortItems sortByValue={sortByValue}/> }
                </Col>
            </Row>           
            
            <Row className='g-4 g-lg-5'>
                { items }                
                
                <Col xs={12} sm={6} md={4} lg={3} >
                    <ItemAdd type={type}  onClick={ toggleModal }  />
                </Col>                    
            </Row>
            
            <ModalComp toggleModal={toggleModal} 
                       show={show} type={type} 
                       inputValueCat={inputValueCat}
                       uploadedImages={uploadedImages}/>

            {isOpen && (
                <Lightbox
                    mainSrc={imagesArr[photoIndex]}
                    nextSrc={imagesArr[(photoIndex + 1) % imagesArr.length]}
                    prevSrc={imagesArr[(photoIndex + imagesArr.length - 1) % imagesArr.length]}
                    onCloseRequest={() => setIsOpen( false )}
                    onMovePrevRequest={() => setPhotoIndex (
                        (photoIndex + imagesArr.length - 1) % imagesArr.length
                        )
                    }
                    onMoveNextRequest={() => setPhotoIndex (
                        (photoIndex + 1) % imagesArr.length,
                        )
                    }
                />
            )}

        </>
        
    )
}