import Box from './Box';
import { BoxStatus } from './types';
import styles from './row.module.scss';


interface RowCompletedProps {
  word: string;
  solution: string;
}

const RowComplited = ({word, solution}: RowCompletedProps) => {
  function checkLetter(letter:string, pos:number): BoxStatus{
    if(solution.includes(letter)){
      if(solution[pos] === letter)
        return 'correct';
      else
        return 'present';
    } else
      return 'absent';
  }

  return (
    <div className={styles.row}>
      {
        Array.from(Array(5)).map((_,i) =>
          <Box value={word[i]} key={i} status={checkLetter(word[i], i)}/>
        )
      }
    </div>
  )
}

export default RowComplited
