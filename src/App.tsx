import React, {useState} from 'react';
import './App.css';
import Board from "./Board";

const App: React.FC = () => {
    const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    const [tiles, setTiles] = useState(initialTiles);
    // function shuffle tiles
    const shuffleTiles = () => {
        const shuffledTiles = [...initialTiles]; // copy of an array
        for(let i = shuffledTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random()*(i + 1));
            [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]]; // destructive assignment
        }
        setTiles(shuffledTiles);
    }
    // function click on tile
    const handleTileClick = (index: number) => {
        if(canMoveTile(index)) {
            const newTiles = [...tiles]; // copy of an array
            const emptyIndex = newTiles.indexOf(0);
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
//check if the game is complete, show message
            if(isGameComplete(newTiles)) {
                alert('Congratulations!')
            }
        }
    }
    // function moving tile to empty index
    const canMoveTile = (index: number) => {
        const emptyIndex = tiles.indexOf(0);
        const row = Math.floor(emptyIndex / 4);

        return (
            //up
            (index === emptyIndex - 4 && row > 0) ||
            //down
            (index === emptyIndex - 4 && row < 3) ||
             //right (checking if we can move tile to the left within boundaries on the left)
            (index === emptyIndex - 1 && row % 4 !== 3) ||
            //left
            (index === emptyIndex + 1 && row % 4 !== 0)
        )
    }

    //function to check if the game is complete
    const isGameComplete = (currentTiles: number[]) => {
        for(let i = 0; i < currentTiles.length -1; i++){
            if(currentTiles[i] !== i + 1) {
                return false; // if the tile is not on a right spot
            }
            return true;
        }
    }

  return (
    <div className="App">
        <h1>15 Puzzle</h1>
        < Board
            tiles = {tiles}
            onTileClick = {handleTileClick}
        />
        <button onClick={shuffleTiles}>Shuffle</button>

    </div>
  );
}

export default App;
