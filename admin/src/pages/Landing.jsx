import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Zap, Shield, Gauge, Image, FileText, Rocket, ArrowDownRight, ArrowDownLeft } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Gradient Wrapper */}
      <div className="gradient-wrapper">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      {/* Navbar - Dark */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 px-6 py-4 bg-gray-900 shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Content Management System
            </span>
          </div>

          {/* Login Button */}
          <motion.button
            onClick={() => navigate('/auth')}
            className="px-6 py-2.5 bg-cyan-500 text-white rounded-xl font-medium hover:bg-cyan-600 transition-all duration-300 flex items-center space-x-2 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Right - Large Purple/Yellow Gradient */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.6) 0%, rgba(236, 72, 153, 0.5) 25%, rgba(251, 191, 36, 0.5) 50%, rgba(163, 230, 53, 0.4) 75%, transparent 100%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Top Right - Purple/Pink */}
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(236, 72, 153, 0.4) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Right Middle - Cyan/Blue */}
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
        
        {/* Bottom Right - Yellow/Green */}
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(163, 230, 53, 0.4) 40%, transparent 70%)',
            filter: 'blur(75px)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        
        {/* Bottom Left - Cyan */}
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Center - Yellow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.3) 50%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Top Left - Green */}
        <motion.div
          className="absolute top-40 left-20 w-[350px] h-[350px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.3) 50%, transparent 70%)',
            filter: 'blur(55px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 bg-clip-text text-transparent">
                Modern CMS Solution
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1a202c' }}>
              Built for <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">developers</span>, 
              trusted by <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">teams</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed font-bold"
            style={{ color: '#1a202c' }}
          >
            Unlock efficient content management with a fast, secure, and customizable platform powered by Laravel and React. 
            Deliver exceptional digital experiences with flexible API-driven architecture, seamless publishing workflows, 
            and beautiful public website templates.
          </motion.p>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-10"
          >
            <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 bg-clip-text text-transparent">
              Designed for simplicity. Empowering creativity.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto"
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
              whileHover={{ y: -5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <Gauge className="w-10 h-10 text-purple-600 mb-3" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a202c' }}>Intuitive admin dashboard</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100"
              whileHover={{ y: -5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
              >
                <Zap className="w-10 h-10 text-cyan-600 mb-3" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a202c' }}>Powerful API for integration</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100"
              whileHover={{ y: -5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
              >
                <Rocket className="w-10 h-10 text-pink-600 mb-3" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a202c' }}>Instant publishing control</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
              whileHover={{ y: -5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
              >
                <Image className="w-10 h-10 text-green-600 mb-3" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a202c' }}>Flexible media management</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
              whileHover={{ y: -5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.7, repeat: Infinity, repeatType: "reverse", delay: 0.8 }}
              >
                <FileText className="w-10 h-10 text-blue-600 mb-3" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a202c' }}>SEO-ready public pages</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
              whileHover={{ y: -5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.1, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              >
                <Shield className="w-10 h-10 text-orange-600 mb-3" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a202c' }}>Secure & scalable</h3>
            </motion.div>
          </motion.div>

          {/* Call to Action Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-lg mb-8"
            style={{ color: '#1a202c' }}
          >
            Start building your project with <span className="font-bold text-purple-600">robust</span>, 
            <span className="font-bold text-cyan-600"> developer-friendly</span> tools and 
            <span className="font-bold text-pink-600"> accelerate</span> your content workflow.
          </motion.p>

          {/* CTA Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 bg-clip-text text-transparent">
              Get started with your Laravel + React CMS today!
            </span>
          </motion.h2>

          {/* Buttons with decorative lines and arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto relative"
          >
            {/* Left Arrow Decoration */}
            <motion.div 
              className="hidden sm:block absolute left-0 top-0"
              animate={{ 
                x: [0, -5, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-cyan-500">
                <path d="M10 10 L40 40 M40 40 L10 40 M40 40 L40 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            {/* First Button with left line */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
              <div className="hidden sm:block h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
              <motion.button
                onClick={() => navigate('/auth?mode=signup')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 shadow-lg flex items-center space-x-2 min-w-[240px] justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <UserPlus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Start Building Now</span>
              </motion.button>
            </div>

            {/* Dot Separator */}
            <div className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>

            {/* Second Button with right line */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
              <motion.button
                onClick={() => navigate('/auth')}
                className="px-10 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg border-2 border-gray-300 hover:bg-gray-50 hover:border-purple-400 transition-all duration-300 flex items-center space-x-2 min-w-[240px] justify-center shadow-md relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LogIn className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View Demo</span>
              </motion.button>
              <div className="hidden sm:block h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
            </div>

            {/* Right Arrow Decoration */}
            <motion.div 
              className="hidden sm:block absolute right-0 top-0"
              animate={{ 
                x: [0, 5, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-purple-500">
                <path d="M70 10 L40 40 M40 40 L70 40 M40 40 L40 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Landing
