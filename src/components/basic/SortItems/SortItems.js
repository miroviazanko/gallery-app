import styles from './SortItems.module.scss';
import { FaLongArrowAltDown } from 'react-icons/fa'
import { FaLongArrowAltUp } from 'react-icons/fa'

import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';


export default function SortItems({sortByValue}) {

    const radios = [`Názov:A-Z`, 'Názov:Z-A', 'Najviac fotiek', 'Najmenej fotiek']

    const radiosElement = radios.map( (radio, i) => {
        return (
           <div key={i}>
                <label>
                    <input type="radio" value={radio} name="sorting"/> 
                    {radio}
                    { (i+1) % 2 === 0 ? <FaLongArrowAltUp /> : <FaLongArrowAltDown /> }          
                </label><br/>
           </div>
        )
    })

    const handleSubmitSort = (e) => {
        e.preventDefault();
        let radioValue = e.target.value;
        //console.log(radioValue)
        sortByValue(radioValue)
    }

    return (
        <Accordion className={`${styles.sortItems} my-4`} onChange={(e) => handleSubmitSort(e)}
                   bsPrefix='sorting'>
            <AccordionHeader className='bg-primary'>Usporiadať:</AccordionHeader>
            <AccordionBody>{radiosElement}</AccordionBody>
        </Accordion>
    )

}