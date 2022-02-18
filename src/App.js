import { useState, useEffect } from 'react';
import { Routes, Route /* , Navigate */ } from "react-router-dom";



import BlocksContainer from './components/complex/BlocksContainer/BlocksContainer';
import Container from 'react-bootstrap/Container';
import NoMatch from './components/basic/NoMatch/NoMatch';
import { useFetch } from './components/basic/Fetch/FetchHook';



import './App.scss';
import Loading from './components/basic/Loading/Loading';


export default function App() {

	const [ apiUrl] = useState('http://api.programator.sk');
	const [ apiGalleryUrl] = useState(`${apiUrl}/gallery`);
	const [ apiPreview ] = useState(`${apiUrl}/images/400x0/`)
	const [ datas, setDatas ] = useState();

	const { loading, data, error } = useFetch(`${apiGalleryUrl}`, "GET")
	
	
	useEffect( () => {
		setDatas(data)
	}, [data]);
	
	//console.log(data)

	//const { loading, data, error } = useFetch("http://api.programator.sk/gallery/sea%20animals", "DELETE")

	const routes = datas && datas.galleries.map( ( (gallery, i) => {
		
		const path = gallery.path;

		return (
			<Route path={path}
				   key={i} 
				   element={
							<BlocksContainer 
								apiPreview={apiPreview} 
								type="gallery"
								path={apiGalleryUrl + '/' + path}
								object="images"
								key={i}/>
						} >
								
			</Route>
		)
	} ))



	return (
		<div className="App">

				<Container fluid="md" className='text-start py-5'>				
					<h1 className='pt-5 pb-3'>Fotogaléria</h1>
					

					{ loading && !error ? <Loading /> : null }

					{  datas && 
						
						<Routes>
							<Route path="/" 
									element={
										<BlocksContainer 
											apiPreview={apiPreview} 
											type="category"
											path={`${apiGalleryUrl}`}
											object="galleries"
											key={.5}/>
									} >
								
							</Route>
							
							{ routes }
							
							<Route path="*" element={<NoMatch />}></Route>
							{/* <Route path="/error" element={<NoMatch />}></Route> */}
						</Routes> 
						
					}

					{ /* error && <Navigate replace to="/error" element={<NoMatch/>} /> */ }
					
					
				</Container>

		</div>
	);
}
