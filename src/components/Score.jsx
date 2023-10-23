import styles from './score.module.css'
const Score = (props) => {
    return (
        <div className={styles.top}>
            <h1 >
                Your score: {props.score}
            </h1>
        </div>
    )
}
export default Score