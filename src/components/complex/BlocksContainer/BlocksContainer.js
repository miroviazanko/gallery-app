import { useReducer ,useState, useEffect } from 'react';
import { useFetch } from '../../basic/Fetch/FetchHook';
import { Link } from "react-router-dom";

//import styles from './BlocksContainer.module.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from '../../basic/Item/Item';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';
import ModalComp from '../ModalComp/ModalComp';
import { getUrlLastPart } from '../../../Helpers/getUrlLastPart';
import Subtitle from '../../basic/Subtitle/Subtitle';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app





export default function BlocksContainer({type, apiPreview, path, object, lightBoxImg}) {

    const [ show, toggleModal ] = useReducer( state => !state, false);    
    const [ blockType ] = useState(type === 'category')
    const [ datas, setDatas ] = useState();
    
    // Lightbox 
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
   
    // Get Api gallery data
    const { data } = useFetch(path, "GET")    

    useEffect( () => {
		setDatas(data)
	}, [data]);

    console.log(type, path, object, apiPreview)

    // Fetch 
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

    const addCategory = async(path, value) => await fetch( path, {
        "method": "POST",
        "body": JSON.stringify({name: value}),
        "headers": {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json())
        .then( resp => setDatas( datas => {
            return {
                galleries: [ ...datas.galleries, resp] 
            }
        } ))


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
                <Col xs={12} sm={6} md={4} lg={3} key={i} onClick={ () => { !blockType &&
                                                                        setIsOpen( true ); 
                                                                        setPhotoIndex(i) } }>                    
                    { blockType ? 
                        <Link to={cat.path} className='position-relative'>
                            <Item label={cat.name} type={type} imgPath={previewPath} galleryPath={galleryPath} handleTrashClick={handleTrashClick}/>
                        </Link> 
                            :                         
                        <>
                            <Item label={cat.name} type={type} imgPath={previewPath} galleryPath={galleryPath} handleTrashClick={handleTrashClick}/>
                        </>
                    }
                </Col>                         
        )
    }) : null


    const imagesArr = datas && !blockType ? datas.images.map( img => [lightBoxImg + getUrlLastPart(path) + '/' + img.path] ) : null;

    const inputValueCat = (value) => { 
        addCategory(path, value);
        toggleModal();
    }


    /* const request = new Request(`${api}gallery`, {
        method: 'POST',
        body: JSON.stringify(newCat),
        headers: {
          'Content-Type': 'application/json'
      }
    })

      fetch(request)
        .then( res => res.json())
        .then( resp => this.setState( state => {
                        return{
                            icons: [...state.icons, {...resp, countPhotos:[]}]
                        }
        })) */




    return (
        <>           
            <Subtitle type={blockType} data={data} />    
                        
            <Row className='g-4 g-lg-5'>
                { items }                
                
                <Col xs={12} sm={6} md={4} lg={3} >
                    <ItemAdd type={type}  onClick={ toggleModal }  />
                </Col>                    
            </Row>
            
            <ModalComp toggleModal={toggleModal} show={show} type={type} inputValueCat={inputValueCat}/>

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