import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  ArrowLeft,
  Lock,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../utils/api";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    image_url: "",
    github_link: "",
    demo_link: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchProjects(); // Only fetch if logged in
    } else {
      setLoading(false); // Stop loading if no token
    }
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "AR1SEE") {
      localStorage.setItem("admin_token", "AR1SEE");
      setIsAuthenticated(true);
      fetchProjects();
    } else {
      alert("Incorrect Password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack,
        image_url: project.image_url || "",
        github_link: project.github_link || "",
        demo_link: project.demo_link || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        image_url: "",
        github_link: "",
        demo_link: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      tech_stack: "",
      image_url: "",
      github_link: "",
      demo_link: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const projectData = {
        ...formData,
        tech_stack: formData.tech_stack,
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await createProject(projectData);
      }

      await fetchProjects();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project. check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-8 rounded-2xl w-full max-w-md text-center"
        >
          <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold font-display mb-2">Admin Access</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Enter your security key to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 outline-none transition-colors text-center"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn-primary w-full py-3">
              Unlock Dashboard
            </button>
          </form>

          <Link
            to="/"
            className="inline-block mt-6 text-sm text-[var(--text-secondary)] hover:text-white"
          >
            ← Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Manage your portfolio projects
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="p-3 rounded-lg glass-effect hover:bg-red-500/10 text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <motion.button
              onClick={() => handleOpenModal()}
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              New Project
            </motion.button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="glass-effect rounded-2xl p-8 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchProjects} className="btn-primary">
              Retry
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <p className="text-[var(--text-secondary)] text-lg mb-4">
              No projects yet. Create your first project!
            </p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack?.split(",").map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleOpenModal(project)}
                      className="p-2 rounded-lg glass-effect hover:bg-primary-500/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 className="w-5 h-5 text-primary-400" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg glass-effect hover:bg-red-500/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 transition-colors"
                    placeholder="Project Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Project description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tech Stack * (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tech_stack}
                    onChange={(e) =>
                      setFormData({ ...formData, tech_stack: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 transition-colors"
                    placeholder="Go, React, PostgreSQL, Docker"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={formData.github_link}
                    onChange={(e) =>
                      setFormData({ ...formData, github_link: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={formData.demo_link}
                    onChange={(e) =>
                      setFormData({ ...formData, demo_link: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 focus:border-primary-500 transition-colors"
                    placeholder="https://demo.example.com"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingProject ? "Update" : "Create"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
