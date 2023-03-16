import {useState} from "react"
const CreateComment = ({onCreate}) => {
    const [text,setText] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        onCreate({text})
        setText('')
        
    }
    return (
        <div>
        <form className = "add-form" id="form1" onSubmit={onSubmit}>
            <div className = "form-control">
                <label>Comments</label>
                <input type = "text" placeholder = "Add your comment here!" value = {text} onChange={(e) => setText(e.target.value)}/>

            </div>
            <input type= "submit" name = "name" value = "Add your comment here!" className="btn btn-block"/>
            
            
        </form>
        </div>

        
        
        
        
    )
    }
    

export default CreateComment