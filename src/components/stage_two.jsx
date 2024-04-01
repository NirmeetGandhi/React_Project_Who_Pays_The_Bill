import { useContext } from "react"
import { Mycontext } from "../context"

const Stage2 = () => {

    const context = useContext(Mycontext)
    return (
        <>
           <div className="result_wrapper">
                <h3>The looser is:</h3>
                {context.result}
           </div>
           <div className="action_button"
           onClick={()=> context.resetGame()}
           >
            RESET

           </div>
        </>
    )
}

export default Stage2