import React, { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await fetch("https://protask-ai-backend.onrender.com/api/tasks", {
       headers: {
       "Authorization": `Bearer ${token}`
       }
      });

      const data = await res.json();
      setTasks(data);

    } catch (err) {
      console.log("Error fetching tasks", err);
    }
  };

  // ================= ADD TASK =================
  const addTask = async () => {
    if (!title) return;

    try {
      await fetch("https://protask-ai-backend.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ title })
      });

      setTitle("");
      fetchTasks();

    } catch (err) {
      console.log("Error adding task", err);
    }
  };

  // ================= TOGGLE COMPLETE =================
  const toggleTask = async (id) => {
    try {
      await fetch(`https://protask-ai-backend.onrender.com/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": token
        }
      });

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      await fetch(`https://protask-ai-backend.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      });

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= STATS =================
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* ADD TASK */}
      <div className="flex gap-2 mb-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Enter task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4">
          Add
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-5">

        <div className="bg-blue-500 text-white p-4 rounded">
          Total: {tasks.length}
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          Completed: {completedTasks}
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded">
          Pending: {pendingTasks}
        </div>

      </div>

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task._id} className="flex justify-between border p-2 mb-2">

          <span
            onClick={() => toggleTask(task._id)}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </span>

          <button onClick={() => deleteTask(task._id)}>
            ❌
          </button>

        </div>
      ))}

    </div>
  );
}

export default Dashboard;