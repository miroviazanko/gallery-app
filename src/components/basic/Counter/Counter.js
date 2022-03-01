import styles from './Counter.module.scss';



export default function Counter({count}) {

    let text;

    switch (true) {
        case  1 :
            text = 'fotka'
            break;
        case ( count > 1 && count < 5 ):
            text = 'fotky'
            break;
        default:
            text = 'fotiek'
            break;
    }

    return (
        <div className={styles.counter}>
            <p>{count + ' ' + text}</p>
        </div>
    )

}