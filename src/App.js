import React, {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import iconData from './iconData';
import Card from './Components/Card';


export default function App() {
    const [icons, setIcons] = useState(fetchIcons());
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [wincon, setWincon] = useState(false);

    useEffect(() => {
        if (highScore < currentScore) {
            setHighScore(prev => prev + 1);
        }
    }, [currentScore]);

    function fetchIcons() {
        return iconData.map(icon => (
            {
                url: icon.url,
                clicked: false,
                id: nanoid()
            }
        ));
    }

    const handleClick = id => {
        const thisIcon = icons.find(icon => icon.id === id);
        thisIcon.clicked ? gameOver() : playRound(id);
    }

    const gameOver = () => {
        setIcons(fetchIcons());
        setCurrentScore(0);
    }

    const playRound = (id) => {
        setIcons(prev => {
            return prev.map(icon => {
                return icon.id === id ? {...icon, clicked: !icon.clicked} : {...icon}
            });
        });

        setIcons(prev => {
            return shuffleArr(prev);
        });

        setCurrentScore(prev => (prev + 1));
    }

    const shuffleArr = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const iconList = icons.map(icon => {
        return (
            <Card 
                src={icon.url}
                key={icon.id}
                onClick={() => handleClick(icon.id)}
            />
        )
    });

    return(
        <main>
            <h1>Final Fantasy IV Memory Game</h1>
            <p>Select every icon once without picking the same one twice</p>
            <p>Current Score: {currentScore}</p>
            <p>High Score: {highScore}</p>
            <div className="card-container">
                {iconList}
            </div>
        </main>
    );
}