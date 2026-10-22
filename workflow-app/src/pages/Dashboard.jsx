import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AddTask from "../components/AddTask";

// Bootstrap colour class for each status
const statusColours = {
  "To do": "bg-secondary",
  "In progress": "bg-warning",
  Done: "bg-success",
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  // Check who's logged in, then load their tasks
  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        setUser(res.data);
        return api.get("/tasks");
      })
      .then((res) => setTasks(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const logout = async () => {
    await api.post("/logout");
    navigate("/login");
  };

  // Change a task's status, then swap the updated task into the list
  const changeStatus = async (id, status) => {
    const res = await api.patch(`/tasks/${id}`, { status });
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  // Delete a task, then remove it from the list
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  

  // Tasks to display, based on the selected filter
  const visibleTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  if (!user) return <p className="text-center mt-4">Loading…</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Welcome, {user.username}</h2>
        <button className="btn btn-outline-secondary" onClick={logout}>
          Log out
        </button>
      </div>

      <AddTask onAdded={(task) => setTasks([task, ...tasks])} />

      <div className="btn-group mt-3">
        {["All", ...Object.keys(statusColours)].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="mt-3">
          {filter === "All"
            ? "No tasks yet."
            : `No tasks with status "${filter}".`}
        </p>
      ) : (
        <ul className="list-group mt-3">
          {visibleTasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.title}</strong>
                {task.description && (
                  <div className="small text-muted">{task.description}</div>
                )}
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${statusColours[task.status]}`}>
                  {task.status}
                </span>
                <select
                  className="form-select form-select-sm w-auto"
                  value={task.status}
                  onChange={(e) => changeStatus(task._id, e.target.value)}
                >
                  {Object.keys(statusColours).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
