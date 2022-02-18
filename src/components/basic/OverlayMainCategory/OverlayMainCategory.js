import styles from './OverlayMainCategory.module.scss';


export default function OverlayMainCategory() {


    return (
        <div className={`${styles.overlayMainCategory} my-4`}>
            <label htmlFor="add-category">Názov kategórie</label>
            <input type="text" name='add-category' />
        </div>
    )

}