import styles from './keyboard.module.scss';

interface KeyboardProps {
  keys: string[];
  onKeyPressed: (letter:string) => void;
}


const Keyboard = ({
  keys,
  onKeyPressed
}: KeyboardProps) => {

  function handleInput(e:any){
    // const key = e.target.textContent.trim()
    onKeyPressed(e.target.textContent.trim());
  }

  function handleEnter(e:any){
    onKeyPressed('ENTER');
  }

  function handleDelete(e:any){
    onKeyPressed('BACKSPACE');
  }

  return (
    <div className={styles.keyboardContainer}>
      {
        Array.from(Array(10)).map((_,i) =>
          <button key={i} className={styles.key} onClick={handleInput}> { keys[i] } </button>
        )
      }
      <div className={styles.emptyKey}></div>
      {
        Array.from(Array(9)).map((_,i) =>
          <button key={i + 10} className={styles.key} onClick={handleInput}> { keys[i + 10] } </button>
        )
      }
      <button className={styles.enterKey} onClick={handleEnter}>Enter</button>
      {
        Array.from(Array(7)).map((_,i) =>
        <button key={i + 19} className={styles.key} onClick={handleInput}> { keys[i + 19] } </button>
        )
      }
      <button className={styles.deleteKey} onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Keyboard
