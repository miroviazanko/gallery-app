import styles from './Counter.module.scss';



export default function Counter({count}) {

    return (
        <div className={styles.counter}>
            <p>{count} counter</p>
        </div>
    )

}