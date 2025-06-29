import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import { Brain, Github, Linkedin, Mail } from "lucide-react";
import { FaIdeal } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setError("");

    emailjs
      .sendForm(
        import.meta.env.VITE_TID,
        import.meta.env.VITE_SID,
        formRef.current!,
        import.meta.env.VITE_EM
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
        },
        () => {
          setError(" Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section className="bg-gray-950 text-white py-20 px-4 sm:px-8 lg:px-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-3">
          Let's <span className="text-cyan-400">Connect</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Whether you're interested in working together or just want to say hi —
          feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800/90 backdrop-blur-lg rounded-xl p-8 shadow-2xl space-y-6 border border-gray-700"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />
          <input
            type="email"
            name="user_email"
            placeholder="you@example.com"
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message... i am waiting.."
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 transition text-white font-bold py-3 px-6 rounded-md w-full shadow-lg hover:shadow-cyan-500/30"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {sent && (
            <p className="text-green-400 text-sm text-center mt-2">
              Your message has been sent successfully!
            </p>
          )}
          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center gap-10"
        >
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Connect With Me</h3>
            <p className="text-gray-400">
              I’m available on these platforms. Let’s build something amazing!
            </p>
          </div>

          <div className="flex gap-6 text-cyan-400 text-3xl">
            <a
              href="https://github.com/sakibhasan-24"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://leetcode.com/u/sakibHasan28/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="Leetcode"
            >
              <Brain />
            </a>
            <a
              href="https://www.linkedin.com/in/sakib-hasan-0b7a821a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href="mailto:your@email.com"
              className="hover:text-white transition"
              title="Send Email"
            >
              <Mail />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
