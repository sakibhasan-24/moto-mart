import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { CalendarDays, User, Timer } from "lucide-react";
import { blogs } from "./blogData";

export default function Blogs() {
  return (
    <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-3">
          Latest <span className="text-cyan-400">Articles</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore expert insights, updates, and essential riding tips.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.15 }}
        viewport={{ once: true }}
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-xl shadow-md hover:shadow-cyan-600/30 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to={`/blog/${blog.id}`}
              className="block p-6 hover:bg-gray-800 h-full"
            >
              <div className="mb-4">{blog.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <div className="text-sm text-gray-400 flex justify-between items-center mb-2">
                <span className="flex items-center gap-2">
                  <User size={16} /> {blog.author}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />{" "}
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Timer size={16} />
                {blog.readTime}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
