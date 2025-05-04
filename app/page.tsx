"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "./provider";
import { ArrowRight, Code, Upload, Brain, Eye, Terminal } from "lucide-react";
import ProfileAvatar from "./_components/ProfileAvatar";

export default function Home() {
  const user = useAuthContext();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <header className="fixed top-0 left-0 p-2 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Wire2React" width={180} height={180} />
            {/* <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Wire2React
            </span> */}
          </div>
          <div className="flex items-center gap-4">
            {!user?.user?.email ? (
              <Authentication>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </Authentication>
            ) : (
              <ProfileAvatar />
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Convert Wireframes to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                React Code
              </span>{" "}
              in Seconds
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Upload your design. Choose your AI. Get deploy-ready code — instantly.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!user?.user?.email ? (
                <Authentication>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                    Try It Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Authentication>
              ) : (
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Upload className="h-6 w-6" />,
                title: "Upload your wireframe/mockup",
                description: "Simply drag and drop your design file"
              },
              {
                icon: <Brain className="h-6 w-6" />,
                title: "Choose your preferred AI model",
                description: "Select from our optimized AI models"
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: "Generate React code",
                description: "Get clean, production-ready code"
              },
              {
                icon: <Eye className="h-6 w-6" />,
                title: "Preview instantly",
                description: "See your code in action"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Live Demo
          </h2>
          <div className="aspect-video bg-gray-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
            {/* Placeholder for CodeSandbox embed */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Live demo coming soon...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                title: "AI Model Selection",
                description: "Choose from multiple AI models optimized for different use cases"
              },
              {
                title: "Clean Code Output",
                description: "Get production-ready React code with best practices"
              },
              {
                title: "Live Preview",
                description: "See your code in action instantly"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Trusted by Developers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Wire2React has revolutionized our development workflow. We're shipping features 10x faster!",
                author: "Sarah Chen",
                role: "Senior Frontend Developer"
              },
              {
                quote: "The code quality is exceptional. It's like having a senior React developer on your team.",
                author: "Michael Rodriguez",
                role: "Tech Lead"
              },
              {
                quote: "Finally, a tool that understands both design and code. It's a game-changer.",
                author: "Emily Park",
                role: "Product Designer"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to turn your designs into code?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {!user?.user?.email ? (
              <Authentication>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Authentication>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Features</Link></li>
                <li><Link href="/" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">About</Link></li>
                <li><Link href="/" className="hover:text-white">Blog</Link></li>
                <li><Link href="/" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/" className="hover:text-white">Support</Link></li>
                <li><Link href="/" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/" className="hover:text-white">Terms</Link></li>
                <li><Link href="/" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className=" flex flex-col gap-4 mt-12 pt-8 border-t border-gray-800 text-center">
            <p>© 2025 Wire2React. All rights reserved.</p>
            <p>Built with ❤️ by Rishabh</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

