import React, { useMemo, useState } from "react";
import "./App.css";
import zooImage from "./assets/zoo.jpg";
import madouImage from "./assets/madou.jpg";

// ====== 作品資料（直接改這裡） ======
const PROJECTS = [
  {
    id: 1,
    title: "木柵動物園 - 霍斯辦案",
    desc: "木柵動物園的互動式展覽，使用 Cocos Creator 開發。",
    tags: ["Cocos", "TypeScript", "UI/UX"],
    image: zooImage,
  },
  {
    id: 2,
    title: "心靈 Madou-In-Mind",
    link: "https://madou-mind.vercel.app/inmind",
    desc: "臺南市政府衛生局的心理健康宣導心靈測驗網站。",
    tags: ["React"],
    image: madouImage,
  },
  {
    id: 3,
    title: "手機 App 介面設計",
    desc: "跨平台 UI 設計與 Prototype 製作。",
    tags: ["Mobile", "Prototype"],
    image: "https://picsum.photos/600/400?3",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>JIANG · Portfolio</h1>
        <p style={styles.subtitle}>Frontend Developer</p>
        <input
          type="text"
          placeholder="搜尋作品..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </header>

      {/* Projects */}
      <section style={styles.grid}>
        {filteredProjects.map((project) => (
          <div key={project.id} style={styles.card}>
            <div
              style={styles.imageWrapper}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  ...styles.image,
                  transform:
                    hoveredId === project.id ? "scale(1.2)" : "scale(1)",
                }}
              />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
              <p style={styles.cardDesc}>{project.desc}</p>
              <div style={styles.tagContainer}>
                {project.tags.map((tag) => (
                  <span key={tag} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>© {new Date().getFullYear()} JIANG</footer>
    </div>
  );
}

// ====== 簡單樣式（不用任何套件） ======
const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    padding: "40px 20px",
    background: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  title: {
    margin: 0,
    fontSize: "32px",
  },
  subtitle: {
    margin: "10px 0 20px",
    color: "#666",
  },
  search: {
    padding: "10px",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    padding: "40px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
  },
  imageWrapper: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  cardBody: {
    padding: "20px",
  },
  cardTitle: {
    margin: "0 0 10px",
  },
  cardDesc: {
    margin: "0 0 15px",
    color: "#555",
    fontSize: "14px",
  },
  tagContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  tag: {
    background: "#eee",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    background: "white",
    marginTop: "40px",
    color: "#888",
  },
};
