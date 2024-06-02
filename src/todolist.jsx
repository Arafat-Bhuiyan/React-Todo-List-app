import { useState } from "react"

function TodoList() {
    const [tasks, setTasks] = useState(["Anik", "Arafat", "Chisty"]);
    const [newTask, setNewTask] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    // 1. New State for Search Query
    const [searchQuery, setSearchQuery] = useState("");


    // console.log("isEdit -", isEdit)

    const handleUpdateValue = (event, index) => { // pick the index
        let placeholderTasks = [...tasks] // copy all task
        placeholderTasks[index] = event.target.value; // update the placeholder with input value by picking index
        setTasks(placeholderTasks) // update state with placeholder or set the new value
    }

    function addTask() {
        console.log("newTask - ", newTask)
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    const editTask = () => {
        setIsEdit(true)
    }
    const doneTask = () => {
        setIsEdit(false)
    }

    function deleteTask(index) {
        const updateTasks = tasks.filter((_, i) => i !== index);
        // console.log('tasks -', tasks)
        // console.log("updated task -", updateTasks);
        setTasks(updateTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }
    // 3. Filtering Tasks Based on Search Query
    const searchTasksFiltered = tasks.filter(task => task.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            {/* 2. Search Input Field */}
            <div>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="search-input"
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                />
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={function (event) {
                        setNewTask(event.target.value)
                    }}
                />
                {/* Add Button */}
                <button className="add-btn" onClick={function (event) {
                    addTask(event)

                }}>
                    Add
                </button>
                {/* Edit button */}
                {isEdit === false ? (
                    <button className="edit-btn"
                        onClick={() => editTask()}>Edit
                    </button>
                ) : (
                    <button className="edit-btn"
                        onClick={() => doneTask()}>Done
                    </button>
                )}

            </div>

            {/* 4. Rendering Filtered Tasks */}
            <ol>
                {searchTasksFiltered.map((task, index) =>
                    <li key={index}>

                        {isEdit === false ? <span className="text">{task} </span> :
                            (
                                <input
                                    placeholder={task}
                                    onChange={(event) => handleUpdateValue(event, index)}
                                />
                            )
                        }

                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(index)}>Delete
                        </button>
                        <button
                            className="move-btn"
                            onClick={() => moveTaskUp(index)}>👆
                        </button>
                        <button
                            className="move-btn"
                            onClick={() => moveTaskDown(index)}>👇
                        </button>
                    </li>
                )}
            </ol>

        </div>
    )
}

export default TodoList