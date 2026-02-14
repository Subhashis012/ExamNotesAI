import React from 'react'
import Navbar from '../components/Navbar';
import { motion } from "motion/react"
import img from '../assets/img1.png';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen overflow-hidden bg-white text-black'>
      <Navbar />
      {/* Top */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <motion.div
        initial = {{opacity: 0, x: -60}}
        animate = {{opacity: 1, x: 0}}
        transition={{duration: 0.7}}
        whileHover={{rotateX: 6, rotateY: -6}}
        className='transform-gpu'
        style={{transformStyle: "preserve-3d"}}
        >
          <motion.h1 className='text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent'
          whileHover={{y: -4}}
          style={{
            transform: "translateZ(40px)",
            textShadow: "0 18px 40px rgba(0,0,0,0.25)"
          }}
          >
            Create Smart <br /> AI Notes in Seconds
          </motion.h1>

          <motion.p whileHover={{y: -2}} className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent'
          style={{
            transform: "translateZ(40px)",
            textShadow: "0 18px 40px rgba(0,0,0,0.25)"
          }}
          >
            Experience the future of note-taking with ExamNotes AI. Generate comprehensive, exam-focused notes in seconds and boost your study efficiency.
          </motion.p>
          <motion.button
          onClick={() => navigate('/notes')}
                          whileHover={{
                              y:-10,
                              rotateX:8,
                              rotateY:-8,
                              scale:1.07
                          }}
                          whileTap={{scale:0.97}}
                          
                          className='mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-linear-to-r from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]'>
                              Get Started 
                          </motion.button>
        </motion.div>

        <motion.div 
        initial = {{opacity: 0, x: -60}}
        animate = {{opacity: 1, x: 0}}
        transition={{duration: 0.7}}
        whileHover={{
          y: -12,
          rotateX: 8,
          rotateY: -8,
          scale: 1.05
        }}
        className='transform-gpu'
        style={{transformStyle: "preserve-3d"}}
        >
          <div className='overflow-hidden'>
            <img src={img} alt="AI Notes" style={{transform: "translateZ(35px)"}}/>
          </div>
        </motion.div>
      </section>
      {/* Bottom */}
      <section className='max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10'>
        <Feature icon="📔" title="Comprehensive Notes" des="Generate detailed and organized notes tailored for your exams." />
        <Feature icon="⚡" title="Instant Generation" des="Get your notes in seconds, saving you hours of manual work." />
        <Feature icon="🎨" title="Visual Aids" des="Create charts, graphs, and diagrams to enhance your understanding." />
        <Feature icon="📥" title="Clean PDFs" des="Download your notes as clean, well-formatted PDFs for easy studying." />
      </section>
      <Footer />
    </div>
  )
}

export default Home