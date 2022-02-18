import styles from './ItemAdd.module.scss';

import { CgAddR } from 'react-icons/cg';

export default function ItemAdd({type, ...rest}) {
    
    const typeLabel = type === 'category' ? 'kategóriu' : 'fotky'

    return (
        <div className={`${styles.itemAdd}`} {...rest}>
            <div className='center-inner flex-column'>
                <CgAddR size={20}/>
                <p className='m-0 mt-3'>{`Pridať ${typeLabel} `}</p>
            </div>
        </div>
    )
}