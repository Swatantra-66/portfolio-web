import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";
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
  Link as LinkIcon,
  Github,
  Image as ImageIcon,
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
  const [toast, setToast] = useState(null);

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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanPassword = passwordInput.trim();
    if (cleanPassword === "AR1SEE") {
      localStorage.setItem("admin_token", cleanPassword);
      setIsAuthenticated(true);
      fetchProjects();
      window.location.reload();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        showToast("Project updated successfully!");
      } else {
        await createProject(formData);
        showToast("New project created!");
      }
      await fetchProjects();
      handleCloseModal();
    } catch (err) {
      showToast("Failed to save project", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteProject(id);
      showToast("Project deleted successfully");
      await fetchProjects();
    } catch (err) {
      showToast("Delete failed", "error");
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
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 text-center"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoComplete="new-password"
              autoFocus
            />
            <button type="submit" className="btn-primary w-full py-3">
              Unlock Dashboard
            </button>
          </form>
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
              className="inline-flex items-center gap-2 text-primary-400 mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <h1 className="text-4xl font-display font-bold">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="p-3 rounded-lg glass-effect text-red-400"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Project
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass-effect rounded-2xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-3 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.split(",").map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="p-2 rounded-lg glass-effect text-primary-400"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg glass-effect text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
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
                <h2 className="text-2xl font-bold">
                  {editingProject ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tech_stack}
                    onChange={(e) =>
                      setFormData({ ...formData, tech_stack: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10"
                    placeholder="React, Go, PostgreSQL"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                      <ImageIcon className="w-4 h-4" /> Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 text-sm"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-1">
                      <Github className="w-4 h-4" /> GitHub Link
                    </label>
                    <input
                      type="url"
                      value={formData.github_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          github_link: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 text-sm"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <LinkIcon className="w-4 h-4" /> Live Site URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo_link}
                    onChange={(e) =>
                      setFormData({ ...formData, demo_link: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 text-sm"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />{" "}
                        {editingProject ? "Update Project" : "Create Project"}
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

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
