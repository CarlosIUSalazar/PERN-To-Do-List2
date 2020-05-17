import React, {Fragment, useState} from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("")
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch   Speaks about CORS too
    const onSubmitForm = async(e) => {  //e is for event
        e.preventDefault(); //We dont want this to refresh (?)  46:38
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";  //Once request is sent it refreshes and shows the changes 
            
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />  
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
};

export default InputTodo;