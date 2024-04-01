import { Button, Form , Alert } from "react-bootstrap"
import { useContext, useRef, useState } from 'react';
import { Mycontext } from "../context";

const Stage1 = () => {

    const [error,setError] = useState([false,'']);
    const context = useContext(Mycontext);

    console.log(context);

    const textInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const input = textInput.current.value;

        const validate = validateInput(input);

        if(validate){
            setError([false,''])
            context.addPlayer(input);
            textInput.current.value = ""
        }

    }

    const validateInput= (value) => {
        if(value=== ""){
            setError([true, 'Enter a name Please'])
            return false
        }
        if(value.length <= 2){
            setError([true, 'Name must be of atlease 2 characters'])
            return false
        }
        return true
    }

    return (
        <>
        <Form onSubmit={handleSubmit} className='mt-4'>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder='Add player name'
                    name='player'
                    ref={textInput}
                />
            </Form.Group>

            {/* show errors */}
            {error[0] ? 
                <Alert>
                    {error[1]}
                </Alert>

            :null }

            <Button className='miami' variant='primary' type='submit' >
                Add player
            </Button>

            {
                context.players && context.players.length > 0 ? 
                <>

                    <hr />
                    <div>
                        <ul className="list-group">
                            { context.players.map((player,idx)=>(
                                <li key={idx} className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'>
                                    {player}
                                    <span
                                        className='badge badge-danger'
                                        onClick={()=> context.removePlayer(idx)}
                                    >
                                        X
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div 
                            className='action_button'
                            onClick={()=>context.nextPage()}
                        >
                            NEXT
                        </div>
                    </div>
                </>
                :null
            }
        </Form>

        
    </>
    )
}

export default Stage1