import styles from './ButtonAdd.module.scss';


export default function ButtonAdd({label}) {
    
    const handleClick = () => console.log('click')
    
    return (       
        <button className={`${styles.buttonAdd} py-3`}
                onClick={ () => handleClick() }>
                    {label}
        </button>       
    )
}