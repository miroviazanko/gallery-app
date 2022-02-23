import styles from './ButtonAdd.module.scss';


export default function ButtonAdd({label}) {
    
    return (       
        <button className={`${styles.buttonAdd} py-3`}>
                    {label}
        </button>       
    )
}