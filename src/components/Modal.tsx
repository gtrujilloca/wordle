import styles from './modal.module.scss';

interface ModalProps {
  type: 'won' | 'lost';
  completedWords: string[];
  solution: string;
}

interface SquareProps {
  word: string;
  solution: string;
}

const Modal = ({
  type,
  completedWords,
  solution,
}: ModalProps) => {

  const Square = ({word, solution}:SquareProps) => {
    const checkLetter = (letter:string, pos:number) => {
      if(solution.includes(letter)) {
        if(solution[pos] === letter)
          return "🟩";
        else
          return "🟨";
      } else {
        return "⬛";
      }
    }
    return (
      <div className={styles.puzzleWord}>
        {
          word.split('').map((letter,i) =>
            <div>{ checkLetter(letter,i) }</div>
          )
        }
      </div>
    )
  }

  return (
    <div className={styles.modalViewContainer}>
      <div className={styles.modalContainer}>
        <h2>You {type === 'won' ? 'wom!' : 'lost!'}</h2>
        <div className={styles.puzzle}>
          {
            completedWords.map((word,i) =>
              <Square key={i} word={word} solution={solution}/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Modal
