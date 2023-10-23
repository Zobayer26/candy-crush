
import Button from "./components/Button";
import Score from "./components/Score";
import { useEffect, useState } from "react";
import bluecandy from './images/blue-candy.png'
import greencandy from './images/green-candy.png'
import redcandy from './images/red-candy.png'
import purplecandy from './images/purple-candy.png'
import yellowcandy from './images/yellow-candy.png'
import orangecandy from './images/orange-candy.png'
import blank from './images/blank.png'

const width = 8;
const candyColors = [
  bluecandy,
  greencandy,
  redcandy,
  purplecandy,
  yellowcandy,
  orangecandy
]

function App() {
  const [currentColor, setcurrentColor] = useState([])
  const [dragIsStart, setdragIsStart] = useState(null)
  const [dragIsReplace, setdragIsReplace] = useState(null)
  const [score, setscore] = useState(0)


  // const checkForColumnofthree = () => {
  //   for (let i = 0; i < 47; i++) {
  //     const columnofhree = [i, i + width, i + width * 2];
  //     const decideColor = currentColor[i];
  //     if (columnofhree.every(square => currentColor[square] === decideColor)) {
  //       columnofhree.forEach(square => currentColor[square] = '')
  //     }
  //   }
  // }
  const checkForColumnofFour = () => {
    for (let i = 0; i <= 39; i++) {
      const decideColor = currentColor[i];
      const isBlank = currentColor[i] === blank
      if (currentColor[i] === decideColor && currentColor[i + width] === decideColor && currentColor[i + width * 2] === decideColor && currentColor[i + width * 3] === decideColor && !isBlank) {
        currentColor[i] = blank;
        currentColor[i + width] = blank
        currentColor[i + width * 2] = blank
        currentColor[i + width * 3] = blank
        setscore((score) => score + 4)
        return true

      }
    }
  }

  const checkForRowofFour = () => {
    for (let i = 0; i < 64; i++) {
      const decideColor = currentColor[i];
      const isBlank = currentColor[i] === blank
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
      if (notValid.includes(i)) continue
      if (currentColor[i] === decideColor && currentColor[i + 1] === decideColor && currentColor[i + 2] === decideColor && currentColor[i + 3] === decideColor && !isBlank) {
        currentColor[i] = blank;
        currentColor[i + 1] = blank;
        currentColor[i + 2] = blank;
        currentColor[i + 3] = blank;
        setscore((score) => score + 4)
        return true
      }
    }
  }


  const checkForColumnofthree = () => {
    for (let i = 0; i <= 47; i++) {
      const decideColor = currentColor[i];
      const isBlank = currentColor[i] === blank
      if (currentColor[i] === decideColor && currentColor[i + width] === decideColor && currentColor[i + width * 2] === decideColor && !isBlank) {
        currentColor[i] = blank;
        currentColor[i + width] = blank
        currentColor[i + width * 2] = blank
        setscore((score) => score + 3)
        return true
      }
    }
  }


  const checkForRowofthree = () => {
    for (let i = 0; i < 64; i++) {
      const decideColor = currentColor[i];
      const isBlank = currentColor[i] === blank
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
      if (notValid.includes(i)) continue
      if (currentColor[i] === decideColor && currentColor[i + 1] === decideColor && currentColor[i + 2] === decideColor && !isBlank) {
        currentColor[i] = blank;
        currentColor[i + 1] = blank
        currentColor[i + 2] = blank
        setscore((score) => score + 3)
        return true
      }
    }
  }


  const moveCandy = () => {
    for (let i = 0; i < 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColor[i] === blank) {
        const randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColor[i] = candyColors[randomNumber];
      }
      if (currentColor[i + width] === blank) {
        currentColor[i + width] = currentColor[i];
        currentColor[i] = blank;
      }
    }
  }

  const dragStart = (e) => {
    console.log(e)
    setdragIsStart(e.target);
  }
  const dragDrop = (e) => {
    setdragIsReplace(e.target);
    console.log(e)
  }

  const dragEnd = (e) => {
    const dragId = parseInt(dragIsStart.getAttribute('data-id'));
    const replaceId = parseInt(dragIsReplace.getAttribute('data-id'));
    currentColor[replaceId] = dragIsStart.getAttribute('src')
    currentColor[dragId] = dragIsReplace.getAttribute('src')
    const validMoves = [
      dragId - 1,
      dragId - width,
      dragId + 1,
      dragId + width
    ]
    const validmove = validMoves.includes(replaceId)

    const isAColumnofFour = checkForColumnofFour();
    const isARowofFour = checkForRowofFour();
    const isAColumnofthree = checkForColumnofthree();
    const isARowofThree = checkForRowofthree();

    if (replaceId && validmove && (isAColumnofFour || isARowofFour || isAColumnofthree || isARowofThree)) {
      setdragIsStart(null);
      setdragIsReplace(null);
    }
    else {
      currentColor[replaceId] = dragIsReplace.getAttribute('src')
      currentColor[dragId] = dragIsStart.getAttribute('src')
      setcurrentColor([...currentColor])
    }

    console.log(e)
  }

  const createBoard = () => {
    const randomColorArray = [];
    for (let i = 0; i < 64; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArray.push(randomColor);
    }
    setcurrentColor(randomColorArray);
  }

  useEffect(() => {
    createBoard();
  }, [])

  let x = 10



  useEffect(() => {
    const time = setInterval(() => {
      checkForColumnofFour();
      checkForRowofFour();
      checkForColumnofthree();
      checkForRowofthree();
      moveCandy();
      setcurrentColor([...currentColor])
    }, 100)
    return () => clearInterval(time)
  }, [checkForColumnofFour, checkForRowofFour, checkForColumnofthree, checkForRowofthree, moveCandy, currentColor])


  return (
    <div>
      <Score score={score} />
      <div className="container">
        <div className="game">
          {
            currentColor.map((color, index) => (
              <img
                key={index}
                src={color}
                alt={color}
                data-id={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              />
            ))
          }
        </div>
      </div>
      <Button second={120} />
    </div>

  )
}

export default App
