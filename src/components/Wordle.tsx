import RowComplited from './RowComplited';
import RowEmpty from './RowEmpty';
import { useEffect, useState } from 'react';
import { GameStatus } from './types';
import { useWindow } from '../hooks/useWindow';
import RowCurrent from './RowCurrent';
import { getWordOdTheDay, isValidWord } from '../services/request';

import '../App.css'
import styles from './wordle.module.scss';
import Keyboard from './Keyboard';
import Modal from './Modal';

const Wordle = () => {
  const [wordOfDay, setWordOfDay] = useState<string>('')
  const [turn, setTurn] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing)

  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  useWindow('keydown', handleKeyDown)

  useEffect(() => {
    setWordOfDay(getWordOdTheDay());
  })

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    onKeyPressed(key)
  }

  function onKeyPressed(key: string) {
    if (gameStatus !== GameStatus.Playing)
      return;

    if (key === 'BACKSPACE' && currentWord.length > 0)
      onDelete()

    if (key === 'ENTER' && currentWord.length === 5 && turn <= 6)
      onEnter()

    if (currentWord.length >= 5)
      return

    //Enter letter in state

    if (keys.includes(key)) {
      onInput(key);
    }
  }

  function onInput(letter: string) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  }

  function onDelete() {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  }

  async function onEnter() {
    if (currentWord === wordOfDay) {
      //User won
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Won);
      return;
    }

    if (turn === 6) {
      //User lost
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Lost);
      return;
    }

    const isValid = await isValidWord(currentWord)

    if (currentWord.length === 5 && !isValid) {
      alert('Not a valid word');
      return
    }

    setCompletedWords([...completedWords, currentWord]);
    setTurn(turn + 1);
    setCurrentWord('');
  }

  return (
    <>
      {
        gameStatus === GameStatus.Won
        ? <Modal type='won' completedWords={completedWords} solution={wordOfDay}/>
        : gameStatus === GameStatus.Lost
          ? <Modal type='lost' completedWords={completedWords} solution={wordOfDay}/>
          :null
      }
      <div className={styles.mainContainer}>
        {
          completedWords.map((word, i) =>
            <RowComplited key={i} word={word} solution={wordOfDay} />
          )
        }
        {
          gameStatus === GameStatus.Playing
            ? <RowCurrent word={currentWord} />
            : null
        }
        {
          Array.from(Array(6 - turn)).map((_, i) =>
            <RowEmpty key={i} />
          )
        }
      </div>
      <Keyboard keys={keys} onKeyPressed={onKeyPressed} />
    </>
  )
}

export default Wordle
