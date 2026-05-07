import React, { useEffect, useState } from "react";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  // STREAK
  const [streak, setStreak] = useState(
    Number(localStorage.getItem("streak")) || 0
  );

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://protask-ai-backend.onrender.com/api/tasks",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      setTasks(data);

    } catch (err) {
      console.log(err);
    }
  };

  // LOAD TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {

    if (!title) {
      alert("Please enter task");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },

          body: JSON.stringify({
            title,
            priority,
            dueDate
          })
        }
      );

      setTitle("");
      setPriority("Medium");
      setDueDate("");

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: token
          }
        }
      );

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  // TOGGLE TASK
  const toggleTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `https://protask-ai-backend.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: token
          }
        }
      );

      // STREAK UPDATE
      const updatedStreak = streak + 1;

      setStreak(updatedStreak);

      localStorage.setItem("streak", updatedStreak);

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  // STATS
  const completedTasks =
    tasks.filter(task => task.completed).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const productivity =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  return (

    <div
      className={`min-h-screen p-6 transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          ProTask AI Dashboard
        </h1>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 mb-8">

        <div className="bg-blue-500 text-white p-5 rounded-2xl shadow-lg">
          <h2 className="text-lg">Total Tasks</h2>

          <p className="text-3xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-2xl shadow-lg">
          <h2 className="text-lg">Completed</h2>

          <p className="text-3xl font-bold">
            {completedTasks}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-2xl shadow-lg">
          <h2 className="text-lg">Productivity</h2>

          <p className="text-3xl font-bold">
            {productivity}%
          </p>
        </div>

      </div>

      {/* AI TIP */}
      <div className="bg-yellow-100 text-black border-l-4 border-yellow-500 p-4 rounded-lg mb-6">

        <h2 className="font-bold text-lg mb-1">
          AI Productivity Tip
        </h2>

        <p>
          {
            productivity >= 80
              ? "Excellent consistency! Keep maintaining your streak."
              : productivity >= 50
              ? "Good progress. Try completing pending tasks faster."
              : "Focus on smaller achievable tasks to improve productivity."
          }
        </p>

      </div>

      {/* STREAK */}
      <div className="bg-orange-500 text-white p-5 rounded-2xl shadow-lg mb-6">

        <h2 className="text-xl font-bold">
          🔥 Daily Streak
        </h2>

        <p className="text-3xl font-bold mt-2">
          {streak} Days
        </p>

      </div>

      {/* ADD TASK */}
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Add New Task
        </h2>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={addTask}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>

      </div>

      {/* TASK LIST */}
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Your Tasks
        </h2>

        {
          tasks.length === 0 ? (

            <p>No tasks added yet.</p>

          ) : (

            tasks.map((task) => (

              <div
                key={task._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-4 gap-4"
              >

                <div>

                  <h3
                    className={`font-semibold text-lg ${
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Priority: {task.priority}
                  </p>

                  <p className="text-sm text-gray-500">
                    Due: {task.dueDate || "No date"}
                  </p>

                </div>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() => toggleTask(task._id)}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          )
        }

      </div>

    </div>
  );
}

export default Dashboard;