import { useState } from "react";
import api from "../api";

const AddTask = ({ onAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/tasks", {
        title,
        description,
        dueDate: dueDate || undefined,
      });
      onAdded(res.data);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add task");
    }

    return (
      <form onSubmit={addTask} className="card card-body mt-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-primary">
              Add task
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-2 mb-0">{error}</div>}
      </form>
    );
  };
};

export default AddTask;
