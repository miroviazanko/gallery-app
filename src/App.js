import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import './App.scss';

import BlocksContainer from './components/complex/BlocksContainer/BlocksContainer';
import Container from 'react-bootstrap/Container';
import NoMatch from './components/basic/NoMatch/NoMatch';
import { getUrlLastPart } from './Helpers/getUrlLastPart';



export default function App() {

	const [ apiUrl] = useState('http://api.programator.sk');
	const [ apiGalleryUrl] = useState(`${apiUrl}/gallery`);
	const [ apiPreview ] = useState(`${apiUrl}/images/200x0/`)
	const [ lightBoxImg ] = useState(`${apiUrl}/images/1200x0/`)
	const [ datas, setDatas ] = useState();
	
	useEffect( () => {
		if ( !datas ) {
		fetch(apiGalleryUrl, {
			"method": "GET",
			"headers": {
				"Content-Type":"application/json"
			}
			}).then(response => response.json())
			.then( data => setDatas(data) )
			//.catch( setError );
		}
	}, [apiGalleryUrl]);
	

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


	// Use fetch() to delete Category (Gallery) 
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

	const deleteGalleryCat = (path) => {
		deleteGallery(path);
	}

	const inputValueCategory = ( value, path ) => {
		addCategory(path, value);
	}

	const routes = datas && datas.galleries.map( ( (gallery, i) => {		
		const path = gallery.path;
		return (
			<Route path={path}
				   key={i} 
				   element={ <BlocksContainer 
								apiPreview={apiPreview} 
								type="gallery"
								path={apiGalleryUrl + '/' + path}
								object="images"
								key={i}
								lightBoxImg={lightBoxImg}/> }>								
			</Route>
		)
	} ))



	return (
		<div className="App">
				<Container fluid="md" className='text-start py-5'>				
					<h1 className='pt-5 pb-3'>Fotogaléria</h1>

					{  datas && 
						
						<Routes>
							<Route path="/" 
									element={ <BlocksContainer 
												apiPreview={apiPreview} 
												type="category"
												path={`${apiGalleryUrl}`}
												object="galleries"
												key={.5} 
												inputValueCategory={inputValueCategory}
												deleteGallery={deleteGalleryCat}
												data={datas}/> } >
								
							</Route>
							
							{ routes }
							
							<Route path="*" element={<NoMatch />}></Route>
							
						</Routes> 
						
					}										
				</Container>
		</div>
	);
}

