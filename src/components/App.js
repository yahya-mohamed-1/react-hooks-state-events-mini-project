import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import TaskList from "./TaskList";
import { CATEGORIES, TASKS } from "../data";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tasks, setTasks] = useState(TASKS);
  const [newTaskDetails, setNewTaskDetails] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');

  const filteredTasks = tasks.filter((task) =>
    selectedCategory === "All" ? true : task.category === selectedCategory
  );

  function handleDeleteTask(deletedTaskText) {
    setTasks(tasks.filter((task) => task.text !== deletedTaskText));
  }

  function handleAddTask(event) {
    event.preventDefault();
    setTasks([...tasks, { text: newTaskDetails, category: newTaskCategory }]);
    setNewTaskDetails('');
    setNewTaskCategory('');
  }

  return (
    <div className="App">
      <h2>My tasks</h2>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <form onSubmit={handleAddTask}>
        <label>
          Details:
          <input type="text" value={newTaskDetails} onChange={(event) => setNewTaskDetails(event.target.value)} />
        </label>
        <label>
          Category:
          <select value={newTaskCategory} onChange={(event) => setNewTaskCategory(event.target.value)}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add task</button>
      </form>
      <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
      
    </div>
  );
}

export default App;