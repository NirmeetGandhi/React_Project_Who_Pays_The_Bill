import { createContext } from "react";
import { useState } from "react";

import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify"; 

const Mycontext = createContext()

const MyProvider = (props)=> {

    const [stage , setstage] = useState(1);
    const [players , setPlayers] = useState([]);
    const [result , setResult] = useState('');

    const addPlayerHandler = (name) =>{
        setPlayers(prevState => ([
            ...prevState,
            name
        ]))
    }

    const removePlayerHandler = (idx)=>{
        let newArray = [...players];
        newArray.splice(idx,1);

        setPlayers(newArray);
    }

    const nextPageHandler = (e)=>{

        if(players.length < 2){
            // alert("Atlease add two players to proceed further")
            toast.error('You need more than one player', {
                position: "top-left",
                autoClose: 2000
            });
            // toast("Atlease add two players to proceed further") 
        }
        else {
            setstage(2);
            setTimeout(() => {
                generateLooser()
            }, 500);
            
        }
    }

    const generateLooser = ()=>{
        let result = players[Math.floor(Math.random()*players.length)]
        setResult(result);
        // console.log(result);

    }

    const resetGameHandler = ()=>{
        setstage(1)
        setPlayers([])
        setResult('')

    }
    return (
        <>
        <Mycontext.Provider value={{
            stage : stage,
            players : players,
            result : result,
            addPlayer : addPlayerHandler,
            removePlayer : removePlayerHandler,
            nextPage : nextPageHandler,
            resetGame : resetGameHandler
        }}>
            {props.children}
            </Mycontext.Provider>
            <ToastContainer/>/
        </>
    )
}

export {
    Mycontext,
    MyProvider
}