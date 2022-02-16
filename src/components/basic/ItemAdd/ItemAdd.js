import styles from './ItemAdd.module.scss';

import { CgAddR } from 'react-icons/cg';

export default function ItemAdd(props) {
    
    const type = props.type;

    const typeLabel = type === 'category' ? 'kategóriu' : 'obrázok'

    return (
        <div className={`${styles.itemAdd} center-inner flex-column`}>
            <CgAddR size={20}/>
            <p className='m-0 mt-3'>{`Pridať ${typeLabel} `}</p>
        </div>
    )
}