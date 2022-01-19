import Box from './Box';
import styles from './row.module.scss';

interface RowCurrentProps {
  word: string;
}

const RowCurrent = ({word}:RowCurrentProps) => {
  return (
    <div className={styles.row}>
      {
        word.split('').map((letter,i) =>
          <Box key={i} value={letter} status='edit'/>
        )
      }
      {
        Array.from(Array(5 - word.length)).map((letter,i) =>
          <Box key={i} value={''} status='edit'/>
        )
      }
    </div>
  )
}

export default RowCurrent
