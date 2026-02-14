import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import Feature from '../components/Feature';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Auth = () => {
    const dispatch = useDispatch();
    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const User = response.user;
            const name = User.displayName;
            const email = User.email;
            const result = await axios.post(serverURL + "/api/auth/google", { name, email }, { withCredentials: true });
            dispatch(setUserData(result.data));
        } catch (error) {
            console.error("Error during Google authentication:", error);
        }
    }
  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
        <motion.header
        initial = {{opacity: 0, y: -15}}
        animate = {{opacity: 1, y: 0}}
        transition={{duration: 1.5}}
        className='max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]'>
            <h1 className='text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>ExamNotes AI - Subhashis</h1>
            <p className='text-sm text-gray-300 mt-1'>AI-powered exam-oriented notes & revision</p>
        </motion.header>

        <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
            {/* Left Content */}
            <motion.div
            initial = {{opacity: 0, x: -60}}
            animate = {{opacity: 1, x: 0}}
            transition={{duration: 0.7}}>
                <h1 className='text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent'>
                    Unlock Smart <br /> AI Notes
                </h1>
                <motion.button
                whileHover={{
                    y:-10,
                    rotateX:8,
                    rotateY:-8,
                    scale:1.07
                }}
                whileTap={{scale:0.97}}
                transition={{type:"spring", stiffness: 200, damping: 18}}
                onClick={handleGoogleAuth}
                className='mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-linear-to-r from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]'>
                    <FcGoogle size={22} />
                    Continue With Google
                </motion.button>
                <p className='mt-6 max-w-xl text-lg bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent'>
                    You get <span className='font-semibold'>50 FREE credits</span> to create exam, notes, project notes, charts, graphs, and download clean PDFs - instantly! No credit card required. Start your AI-powered note-taking journey today!
                </p>
                <p className='mt-4 text-sm text-gray-500'>Start with 50 FREE credits Upgrade anytime to continue your AI-powered note-taking journey!</p>
            </motion.div>
            {/* Right Content */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                <Feature icon="🎁" title="50 Free Credits" des="Start with 50 free credits to create exam notes, project notes, charts, graphs, and download clean PDFs - instantly! No credit card required."/>
                <Feature icon="⚡" title="Instant Generation" des="Generate comprehensive exam notes, project notes, charts, and graphs in seconds with our powerful AI engine."/>
                <Feature icon="📊" title="Visual Aids" des="Create visually appealing charts and graphs to enhance your understanding and retention of complex topics."/>
                <Feature icon="💾" title="Clean PDFs" des="Download your AI-generated notes as clean, well-formatted PDFs for easy offline access and sharing."/>
                <Feature icon="🔒" title="Secure & Private" des="Your data is secure with us. We prioritize your privacy and ensure that your information is protected at all times."/>
                <Feature icon="🚀" title="Upgrade Anytime" des="Enjoy 50 free credits to start. Upgrade anytime to continue your AI-powered note-taking journey with even more features and capabilities."/>
                <Feature icon="🤖" title="AI-Powered" des="Leverage the power of AI to create comprehensive and personalized notes that cater to your specific study needs."/>
                <Feature icon="📚" title="Exam-Oriented" des="Our AI is trained to generate notes that are specifically tailored for exam preparation, helping you focus on what matters most."/>
            </div>
        </main>
    </div>
  )
}

export default Auth