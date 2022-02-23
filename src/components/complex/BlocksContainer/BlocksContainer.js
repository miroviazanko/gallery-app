import { useReducer , useState, useEffect} from 'react';
import { useFetch } from '../../basic/Fetch/FetchHook';
import {  Link } from "react-router-dom";

import styles from './BlocksContainer.module.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from '../../basic/Item/Item';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';
import ModalComp from '../ModalComp/ModalComp';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { getUrlLastPart } from '../../../Helpers/getUrlLastPart';





export default function BlocksContainer({type, apiPreview, path, object}) {

    const [show, toggleModal] = useReducer( state => !state, false);    
    const [blockType] = useState(type === 'category')
    const [ datas, setDatas ] = useState();
    
    const { data } = useFetch(path, "GET")    

    useEffect( () => {
		setDatas(data)
	}, [data]);

    const deleteGallery = async(path) => await fetch( path, {
        "method": "DELETE"
    }).then( () => {
        const lastPart = getUrlLastPart(path);
        setDatas( datas => {
			return {
				galleries: datas.galleries.filter( item => item.path !== lastPart  )
			}
		} )
        }
    )

	const handleTrashClick = (e, path) => {
        e.preventDefault();
        e.stopPropagation();    
        deleteGallery(path); 		
    }


    const items = datas ? datas[object].map( ( cat,i ) => {

        let existsPreview = "image" in cat;
        let previewPath = existsPreview ? apiPreview + cat.image.fullpath : apiPreview + cat.fullpath;
        let galleryPath = path + "/" + cat.path;

        return (                     
                <Col xs={12} sm={6} md={4} lg={3} key={i} >                    
                    { blockType ? 
                        <Link to={cat.path} className='position-relative'>
                            <Item label={cat.name} type={type} imgPath={previewPath} galleryPath={galleryPath} handleTrashClick={handleTrashClick}/>
                        </Link> 
                            :                         
                        <Item label={cat.name} type={type} imgPath={previewPath} galleryPath={galleryPath} handleTrashClick={handleTrashClick}/>
                    }
                </Col>                         
        )
    }) : null


    const subtitle = () => {
        if ( !blockType && data ) {
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
            
            <ModalComp toggleModal={toggleModal} show={show} type={type}/>
            
        </>
        
    )
}