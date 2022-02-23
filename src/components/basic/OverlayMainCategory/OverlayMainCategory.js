import styles from './OverlayMainCategory.module.scss';

import ButtonAdd from '../ButtonAdd/ButtonAdd';

export default function OverlayMainCategory({ inputValue }) {

    const handleAddCategory = (e) => {
        e.preventDefault();
        const nameCategory = e.target[0].value;
        inputValue(nameCategory);
    }

    return (
        <div className={`${styles.overlayMainCategory} my-4`}>
            <form onSubmit={(e) => handleAddCategory(e)}>
                <label htmlFor="add-category">Názov kategórie</label>
                <input type="text" name="category" className='mb-4'/>
                <ButtonAdd label="Pridať"/>
            </form>
        </div>
    )

}