import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Search } from "lucide-react";

// ====== Mock Data (換成你的作品) ======
const PROJECTS = [
  {
    id: 1,
    title: "E‑commerce Dashboard",
    desc: "後台儀表板，含權限控管與即時圖表。",
    tags: ["React", "TypeScript", "Recharts"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/yourname/project-1",
    demo: "https://demo.example.com/project-1",
  },
  {
    id: 2,
    title: "Landing Page",
    desc: "高轉換率行銷頁，A/B 測試友善。",
    tags: ["Next.js", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/yourname/project-2",
    demo: "https://demo.example.com/project-2",
  },
  {
    id: 3,
    title: "Mobile App UI",
    desc: "跨平台介面設計與互動原型。",
    tags: ["React Native", "Design"],
    image:
      "https://images.unsplash.com/photo-1551727974-8af20a3322f1?q=80&w=1200&auto=format&fit=crop",
    github: "https://github.com/yourname/project-3",
    demo: "https://demo.example.com/project-3",
  },
];

const TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

export default function PortfolioApp() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const hitQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase());
      const hitTag = tag === "All" ? true : p.tags.includes(tag);
      return hitQuery && hitTag;
    });
  }, [query, tag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              你的名字 · Portfolio
            </h1>
            <p className="text-sm text-slate-600">Frontend / UI Engineer</p>
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋作品…"
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            把想法變成好用、好看的產品
          </h2>
          <p className="mt-4 text-slate-700">
            專注 React 生態系、效能優化與可維護的 UI 架構。這裡是我的精選作品。
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href="#projects">看作品</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/yourname" target="_blank">
                GitHub
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop"
          alt="hero"
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Filters */}
      <section id="projects" className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {TAGS.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={t === tag ? "default" : "outline"}
              onClick={() => setTag(t)}
              className="rounded-full"
            >
              {t}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={p.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4 mr-1" /> Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" /> Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t bg-white/70">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} 你的名字
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <a href="mailto:you@example.com">Email</a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="https://www.linkedin.com/in/yourname" target="_blank">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
