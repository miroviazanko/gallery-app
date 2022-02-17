//import { useEffect } from 'react';

import BlocksContainer from './components/complex/BlocksContainer/BlocksContainer';
import Container from 'react-bootstrap/Container';

//import { useFetch } from './components/basic/Fetch/FetchHook';

import AddOverlay from './components/complex/AddOverlay/AddOverlay';

import './App.scss';


export default function App() {


	 /* useEffect( () => {
		 fetch("http://api.programator.sk/gallery", {
				"method": "GET",
				"headers": {
					"Content-Type":"application/json"
				},
				"mode": 'cors',
				"cache": 'default'
		}).then(response => response.json())
			.then(results => console.log(results.galleries))
	}) */
	  
	//const { loading, data, error } = useFetch("http://api.programator.sk/gallery", "GET")

	

	return (
		<div className="App">

				<AddOverlay />	

				<Container fluid="md" className='text-start py-5'>				
					<h1 className='pt-5 pb-3'>Fotogaléria</h1>
					<h5>Kategorie</h5>
				</Container>
	
				<BlocksContainer>
					
				</BlocksContainer>
			



		</div>
	);
}
