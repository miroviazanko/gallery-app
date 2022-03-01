import { useState } from 'react';

import styles from './OverlayMainCategory.module.scss';

import ButtonAdd from '../ButtonAdd/ButtonAdd';

export default function OverlayMainCategory({ inputValue }) {

    const [ checkChar, setCheckChar ] = useState( false )    

    const handleAddCategory = (e) => {
        e.preventDefault();
        const nameCategory = e.target[0].value;
        if (nameCategory.includes('/') || !nameCategory.length) {
             setCheckChar( true ); 
         } else {
             setCheckChar( false );
             inputValue(nameCategory);
        };      
    }


    return (
        <div className={`${styles.overlayMainCategory} my-4`}>
            <form onSubmit={(e) => handleAddCategory(e)}>
                <label htmlFor="add-category">Názov kategórie</label>
                <input type="text" name="category" className={`${checkChar ? styles.warningInput : ''} mb-4`}/>
                <ButtonAdd label="Pridať"/>
            </form>
        </div>
    )

}