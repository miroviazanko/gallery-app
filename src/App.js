import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";



import BlocksContainer from './components/complex/BlocksContainer/BlocksContainer';
import Container from 'react-bootstrap/Container';
import NoMatch from './components/basic/NoMatch/NoMatch';
import { useFetch } from './components/basic/Fetch/FetchHook';



import './App.scss';
import Loading from './components/basic/Loading/Loading';


export default function App() {

	const [ apiUrl, setApiUrl] = useState('http://api.programator.sk/');
	const [ apiPreview, setApiPreview ] = useState(`${apiUrl}/images/400x0/`)
	const [ datas, setDatas ] = useState();

	const { loading, data, error } = useFetch(`${apiUrl}gallery`, "GET")

	useEffect( () => {
		setDatas(data)
	}, [data]);
	
	console.log(datas);
	
	//const { loading, data, error } = useFetch("http://api.programator.sk/gallery/wefa%20fwf", "DELETE")

	const routes = datas && datas.galleries.map( ( (gallery, i) => {
		
		const path = gallery.path;

		return (
			<Route path={path}
				   key={i} 
				   element={
							<BlocksContainer 
								loading={loading}
								data={data.galleries}
								error={error}
								apiPreview={apiPreview} 
								type="gallery"
								path={path}/>
						} >
								
			</Route>
		)
	} ))



	return (
		<div className="App">

				

				<Container fluid="md" className='text-start py-5'>				
					<h1 className='pt-5 pb-3'>Fotogaléria</h1>
					<h5>Kategorie</h5>


					{ loading ? <Loading /> : null }

					{  datas && 
						
						<Routes>
							<Route path="/" 
									element={
										<BlocksContainer 
											loading={loading}
											data={datas.galleries}
											error={error}
											apiPreview={apiPreview} 
											type="category"/>
									} >
								
							</Route>
							
							{ routes }
							
							<Route path="*" element={<NoMatch />}></Route>
						</Routes> 
						
					}

					
				</Container>
	
				


		</div>
	);
}
