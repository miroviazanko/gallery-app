import { useReducer ,useState, useEffect } from 'react';
//import { useFetch } from '../../basic/Fetch/FetchHook';
import { Link } from "react-router-dom";
import { getUrlLastPart } from '../../../Helpers/getUrlLastPart';
import { sortByChars } from '../../../Helpers/sorting';
//import styles from './BlocksContainer.module.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from '../../basic/Item/Item';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';
import ModalComp from '../ModalComp/ModalComp';
import Subtitle from '../../basic/Subtitle/Subtitle';
import SortItems from '../../basic/SortItems/SortItems';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app





export default function BlocksContainer({type, apiPreview, path, object, lightBoxImg, inputValueCategory, data, deleteGallery}) {

    const [ show, toggleModal ] = useReducer( state => !state, false);    
    const [ blockType ] = useState(type === 'category')
    const [ datas, setDatas ] = useState();
    
    // Lightbox 
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    
    useEffect( () => {
		if ( !data ) {
            fetch(path, {
                "method": "GET",
                "headers": {
                    "Content-Type":"application/json"
                }
                }).then(response => response.json())
                .then( data => setDatas(data) )
                /* .then( () => setLoading(false) )
                .catch( setError ); */
                    //setDatas(data)
            
        } else {
            setDatas(data)
        }
	}, [data]);


    const deleteImage = async(path) => await fetch( path, {
        "method": "DELETE"
    }).then( () => {
        const lastPart = getUrlLastPart(path);
        setDatas( datas => {
			return {
                gallery: {...datas.gallery},
				images: datas.images.filter( item => item.path !== lastPart  )
			}
		} )
        }
    )

    const addImage = async(path, formData) => await fetch( path, {
		method: "POST",
		body: formData
	}).then( response => response.json() )
      .then( files => setDatas( datas => {
            let galleryName = getUrlLastPart(path)
            return {
                gallery: { name: galleryName,
                           path: galleryName },
                images: [ ...datas.images, ...files.uploaded ]
            }
        }
    ))

	const handleTrashClick = (e, path) => {
        e.preventDefault();
        e.stopPropagation();    
        blockType ? deleteGallery(path) : deleteImage(path)         		
    }

    const inputValueCat = (value) => { 
        toggleModal();
        inputValueCategory( value, path )
    }

    const uploadedImages = (formData) => {
        toggleModal();
        console.log(formData)
        addImage( path, formData )        
    }

    const sortByValue = (value) => {
        switch (value) {
            case 'Názov:A-Z':                
                setDatas( datas => {
                    let sorted = [...datas.galleries]
                    sortByChars( sorted, 'name' )
                    return {galleries: sorted} 
                })
                break;
            case 'Názov:Z-A':
                setDatas( datas => {
                    let sorted = [...datas.galleries]
                    sortByChars( sorted, 'name', 'desc' )
                    return {galleries: sorted} 
                })
                break;
            case 'Najviac fotiek':
                setDatas( datas => {
                    let sorted = [...datas.galleries]
                    sorted.sort( (a, b) => b.count - a.count )
                    return {galleries: sorted} 
                })
                break;
            case 'Najmenej fotiek':
                setDatas( datas => {
                    let sorted = [...datas.galleries]
                    sorted.sort( (a, b) => a.count - b.count )
                    return {galleries: sorted} 
                })
                break;
            default:
                break;
        }
    }
    

    const galleryCount = (count, gallName) => {
        if ( count ) {
                setDatas( datas => {
                    return {
                        galleries: datas.galleries.map( (gallery, i) => gallery.name === gallName ? { ...gallery, count } : gallery)
                    }
                })
        }
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
                            <Item label={cat.name} type={type} imgPath={previewPath} 
                                  galleryPath={galleryPath} 
                                  handleTrashClick={handleTrashClick}
                                  galleryCount={galleryCount}/>
                        </Link> 
                            :                         
                        <>
                            <Item label={cat.name} type={type} imgPath={previewPath} 
                                  galleryPath={galleryPath} 
                                  handleTrashClick={handleTrashClick}/>
                        </>
                    }
                </Col>                         
        )
    }) : null 


    



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