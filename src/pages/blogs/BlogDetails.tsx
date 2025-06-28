import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { CalendarDays, User, Timer } from "lucide-react";
import { blogs } from "./blogData";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="text-center text-red-400 py-20">
        Blog not found.
        <button
          onClick={() => navigate("/")}
          className="block text-cyan-400 mt-4 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {blog.icon}
            <h1 className="text-3xl sm:text-4xl font-bold">{blog.title}</h1>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <User size={16} />
              {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {new Date(blog.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Timer size={16} />
              {blog.readTime}
            </div>
          </div>
        </div>

        <article className="space-y-10 text-gray-300 leading-relaxed">
          {blog.content.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-semibold text-white mb-2">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base whitespace-pre-line">
                {section.paragraph}
              </p>
            </div>
          ))}
        </article>
      </motion.div>
    </section>
  );
}
