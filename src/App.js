import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import iconData from './iconData';


export default function App() {
    const [icons, setIcons] = useState(fetchIcons());
    const [score, setScore] = useState(0);
    const [wincon, setWincon] = useState(false);

    function fetchIcons() {
        return iconData.map(icon => (
            {
                url: icon.url,
                clicked: false,
                id: nanoid()
            }
        ));
    }

    function handleClick(id) {
        const thisIcon = icons.find(icon => icon.id === id);
        thisIcon.clicked ? console.log('game over') : playRound(id);
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

        setScore(prev => prev + 1);
    }

    /* const shuffleArr = (arr) => {
        return [...arr].sort(() => Math.random() - 0.5);
    } */

    const shuffleArr = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const iconList = icons.map(icon => {
        return (
            <img 
                className="card" 
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
            <p>Highest Score: {score}</p>
            <div className="card-container">
                {iconList}
            </div>
        </main>
    );
}