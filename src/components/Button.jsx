import styles from './Button.module.css'

const Button = (props) => {

    const show = (time) => {

        if (time > 0) {
            setTimeout(() => {
                show(time - 1)
            }, 1000);
            document.getElementById('x').innerHTML = time;
        }
        else {
            document.getElementById('x').innerHTML = "Time over";
        }
        
    }

    return (
        <div className={styles.bottom}>
            <button className={styles.btn} onClick={() => { show(props.second) }}>Start Game</button>
            <div className={styles.box}>
                <p id="x"></p>
            </div>
        </div>
    )
}
export default Button