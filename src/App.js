import { useState, useEffect/* , useReducer */ } from 'react';
import { Routes, Route /* , Navigate */ } from "react-router-dom";



import BlocksContainer from './components/complex/BlocksContainer/BlocksContainer';
import GalleryContainer from './components/complex/GalleryContainer/GalleryContainer';
import Container from 'react-bootstrap/Container';
import NoMatch from './components/basic/NoMatch/NoMatch';



import './App.scss';
//import Loading from './components/basic/Loading/Loading';


export default function App() {

	const [ apiUrl] = useState('http://api.programator.sk');
	const [ apiGalleryUrl] = useState(`${apiUrl}/gallery`);
	const [ apiImage ] = useState(`${apiUrl}/images/400x0`)

	const [ categories, setCategories ] = useState([])

	
	useEffect( () => {

		const reqAccountAndTransactions = async (uri, method) => {
		
			const fetchCategories = await fetch(uri, {
					"method": method,
					"headers": {
						"Content-Type":"application/json"
					},
					"mode": 'cors',
					"cache": 'default'
			}).then(response => response.json())
			.then( (data) => setCategories( data ) )
			//.catch( setError );


		}
		reqAccountAndTransactions(apiGalleryUrl, "GET");

	}, [ apiGalleryUrl ] );
	



	//const { loading, data, error } = useFetch("http://api.programator.sk/gallery/sea%20animals", "DELETE")

	const routes = categories.length && categories.galleries.map( ( (gallery, i) => {
		
		const path = gallery.path;
		const name = gallery.name;

		console.log(path)

		return (
			<Route path={path}
				   key={i} 
				   element={
							<GalleryContainer 
								type="gallery"
								apiUrl={apiUrl}
								preview={apiImage}
								path={path}
								name={name}
								key={i}/>
						} >								
			</Route>
		)
	} ))



	return (
		<div className="App">

				<Container fluid="md" className='text-start py-5'>				
					<h1 className='pt-5 pb-3'>Fotogaléria</h1>
					

					{ /* loading && !error ? <Loading /> : null */ }
						
						<Routes>
							<Route path="/" 
									element={
										<BlocksContainer 
											type="category"
											object="galleries"
											data={categories}
											apiUrl={apiGalleryUrl}
											preview={apiImage}
											key={.5}/>
									} >
								
							</Route>
							
							{ routes }
							
							<Route path="*" element={<NoMatch />}></Route>
							{ /*<Route path="/error" element={<NoMatch />}></Route> */}
						</Routes>
						
					

					{ /* error && <Navigate replace to="/error" element={<NoMatch/>} /> */ }
					
					
				</Container>

		</div>
	);
}
