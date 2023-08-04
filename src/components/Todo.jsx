import { useState } from "react";

import { toggleTodo, updateTodo } from "../redux/actions";
import { deleteTodo } from "../redux/actions";

import { useDispatch } from "react-redux";

const Todo = ({ todo }) => {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo?.data);

    const dispatch = useDispatch();

    const onFormSubmit = (e) => {
        e.preventDefault();

        setEditing(prevState => !prevState);

        dispatch(updateTodo(todo._id, text))
    }

    return (
        <div className="d-flex justify-content-center mt-3 align-items-center">
        <span className="cursor-point" onClick={() => dispatch(toggleTodo(todo._id))}data-testid="todo-test">{
            todo?.done ?
            <i class="fa fa-check-square-o fa-2x" aria-hidden="true"></i>
            :
            <i class="fa fa-square-o fa-2x" aria-hidden="true"></i>

}</span>
        <li
            className="task p-3 mt-2 ms-2"
            // onClick={() => dispatch(toggleTodo(todo._id))}
            style={{
                textDecoration: todo?.done ? 'line-through' : '',
                color: todo?.done ? '#bdc3c7' : '#34495e'
            }}
            // data-testid="todo-test"
        >
           
            <span style={{ display: editing ? 'none' : '' }}>{todo?.data}</span>

            <form
                style={{ display: editing ? 'inline' : 'none' }}
                onSubmit={onFormSubmit}
            >
                <input
                    type="text"
                    value={text}
                    className="edit-todo"
                    onChange={(e) => setText(e.target.value)}
                />
            </form>

            <span className="icon " onClick={() => dispatch(deleteTodo(todo._id))}>
            <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
            <span className="icon" onClick={() => setEditing(prevState => !prevState)}>
            <i class="fa fa-pencil" aria-hidden="true"></i>
            </span>
        </li>
        </div>
    )
}

export default Todo;