import { useState } from "react"
import Styles from "./todo.module.css"
import type TodoType from "../interface/todo"

export function Todo() {
    const [input, setInput] = useState<string>("")
    const [todos, setTodos] = useState<TodoType[]>([])

    function addTodo() {
        setTodos((prev) => {
            return [
                ...prev,
                { id: Date.now(), name: input.trim(), completed: false },
            ]
        })
        setInput("")
    }

    function todoDelete(todo_id: number) {
        setTodos((prev) => {
            return prev.filter((currElem) => currElem.id !== todo_id)
        })
    }

    function todoCompleted(todo_id: number) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === todo_id
                    ? {
                          ...todo,
                          completed: !todo.completed,
                      }
                    : todo,
            ),
        )
    }

    return (
        <>
            <div className="container">
                <h1>ToDo:</h1>
                <div className="row">
                    <input
                        type="text"
                        name="todo"
                        id="todo"
                        className="form-control"
                        value={input}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") addTodo()
                        }}
                        onChange={(event) => {
                            setInput(event.target.value)
                        }}
                    />
                    <button className="" role="button" onClick={addTodo}>
                        Add task
                    </button>
                </div>
                {todos.length === 0 ? (
                    <p>No todos yet.</p>
                ) : (
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => todoCompleted(todo.id)}
                                />
                                <span
                                    className={`btn ${todo.completed ? Styles.completed : ""}`}
                                >
                                    {todo.name}
                                </span>
                                <button onClick={() => todoDelete(todo.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
