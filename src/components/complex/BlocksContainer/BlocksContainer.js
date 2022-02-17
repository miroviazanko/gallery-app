//import styles from './BlocksContainer.module.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Item from '../../basic/Item/Item';
import ItemAdd from '../../basic/ItemAdd/ItemAdd';


export default function BlocksContainer() {

   const itemType = "category"

    return (
        <Container fluid="md">

            
            <Row className='g-4 g-lg-5'>
                <Col xs={12} sm={6} md={4} lg={3}>
                    <Item type={itemType}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                    <ItemAdd type={itemType}/>
                </Col>
            </Row>
            

        </Container>
        
    )
}