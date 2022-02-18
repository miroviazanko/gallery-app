import { Link } from 'react-router-dom';

import styles from './NoMatch.module.scss';

import { CgDanger } from 'react-icons/cg'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Container from 'react-bootstrap/Container';


export default function NoMatch() {
    
    return (
        <Container fluid="md center-inner flex-column">
            <h2 className='d-flex align-items-center text-warning mb-5'><CgDanger className='me-3'/>Vyskytla sa chyba</h2>
            <h4><Link to="/"><IoIosArrowRoundBack />Späť na home page</Link></h4>
        </Container>
    )
}