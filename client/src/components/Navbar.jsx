import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import axios from 'axios';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {userData} = useSelector((state) => state.user);
    const credits = userData.credits;
    const [showCredits, setShowCredits] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.get(serverURL + "/api/auth/logout", { withCredentials: true });
            dispatch(setUserData(null));
            navigate("/auth");
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    }

  return (
    <motion.div
    initial = {{opacity: 0, y: -15}}
        animate = {{opacity: 1, y: 0}}
        transition={{duration: 1.5}}
        className='relative z-20 mt-6 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0,0,0,0.75] flex items-center justify-between px-8 py-4'>
        
        <div className='flex items-center gap-3'>
            <img src={logo} alt="Logo" className='w-9 h-9' />
            <span className='text-lg hidden md:block font-semibold text-white'>ExamNotes <span className='text-gray-400'>AI</span></span>
        </div>
        <div className='flex items-center gap-6 relative'>
            <div className='relative '>
                <motion.div
                onClick={() => {setShowCredits(!showCredits); setShowProfile(false);}}
                whileHover={{scale: 1.07}}
                whileTap={{scale: 0.97}}
                className='flex items-center gap-1 px-2 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer'>
                <span className='text-xl'>💎</span>
                <span>{credits}</span>
                <motion.span whileHover={{scale: 1.2}}
                whileTap={{scale: 0.97}} className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold'>
                    ➕
                </motion.span>
                </motion.div>
                <AnimatePresence>
                {showCredits && 
                    <motion.div
                        initial={{opacity: 0, y: -10, scale: 0.95}}
                        animate={{opacity: 1, y: 10, scale: 1}}
                        exit={{opacity: 0, y: -10, scale: 0.95}}
                        transition={{duration: 0.6}}
                        className='absolute right-[-50px] mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white'>
                        <h4 className='font-semibold mb-2'>Buy Credits</h4>
                        <p className='text-sm text-gray-300'>Use credits to unlock premium features and enhance your experience.</p>
                        <button onClick={() => {setShowCredits(false); navigate('/pricing');}} className='w-full mt-2 py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold'>Buy More Credits</button>
                    </motion.div>
                }
                </AnimatePresence>
            </div>

            <div className='relative '>
                <motion.div
                    onClick={() => {
                        setShowProfile(!showProfile);
                        setShowCredits(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full 
                                bg-white/10 border border-white/20 
                                text-white text-lg font-semibold 
                                shadow-md cursor-pointer"
                    >
                    {userData.name.slice(0, 1).toUpperCase()}
                    </motion.div>

                <AnimatePresence>
                {showProfile && 
                    <motion.div
                        initial={{opacity: 0, y: -10, scale: 0.95}}
                        animate={{opacity: 1, y: 10, scale: 1}}
                        exit={{opacity: 0, y: -10, scale: 0.95}}
                        transition={{duration: 0.6}}
                        className='absolute right-0 mt-4 w-52 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white'>
                        
                        <MenuItem text="History" onClick={() => {setShowProfile(false); navigate('/history');}} />
                        <div className='h-px bg-white/10 mx-3' />
                        <MenuItem text="Sign Out" red onClick={handleSignOut} />
                    </motion.div>
                }
                 </AnimatePresence>
            </div>
        </div>
    </motion.div>
  )
}

export default Navbar