import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import PricingCard from '../components/PricingCard';
import { useState } from 'react';
import axios from 'axios';
import { serverURL } from '../App';


const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setPaying(true);
      const result = await axios.post(serverURL + '/api/credit/order', { amount }, { withCredentials: true });
      if(result.data.url) {
        window.location.href = result.data.url;
      }
      setPaying(false);

    } catch (error) {
      setPaying(false);
      console.error("Payment initiation failed", error);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-10 relative'>
      <button className='flex items-center gap-2 text-gray-600 hover:text-black mb-6' onClick={() => navigate('/')}>
        ⬅️ Back 
      </button>

      <motion.div
      initial={{opacity:0, y:-10}}
      animate={{opacity:1, y:0}}
      className='text-center mb-10'
      >
        <h1 className='text-3xl font-bold'>Buy Credits</h1>
        <p className='text-gray-600 mt-2'>
          Choose a credit pack that suits your needs and unlock the full potential of ExamNotes AI. More credits mean more notes, more revisions, and better exam preparation!
        </p>
      </motion.div>

      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        <PricingCard
        title="Starter"
        price="₹100"
        amount={100}
        credits="50 Credits"
        description="Perfect for trying out the basics and generating a few notes."
        features={[
          "Generate AI notes",
          "Exam-focused answers",
          "Diagram & Charts support",
          "Fast generation"
        ]}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        onBuy={handlePaying}  
        paying={paying}
        payingAmount={payingAmount}
        />

        <PricingCard
        popular
        title="Popular"
        price="₹200"
        amount={200}
        credits="120 Credits"
        description="Ideal for regular users who want to create multiple notes and revisions."
        features={[
          "All Starter features",
          "More credits for more notes",
          "Priority support",
          "Access to new features"
        ]}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        onBuy={handlePaying}  
        paying={paying}
        payingAmount={payingAmount}
        />

        <PricingCard
        title="Pro Learner"
        price="₹500"
        amount={500}
        credits="300 Credits"
        description="Best for power users and students who want to maximize their exam preparation with extensive notes and revisions."
        features={[
          "All Popular features",
          "Even more credits for heavy users",
          "Dedicated support",
          "Exclusive access to beta features"
        ]}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        onBuy={handlePaying}  
        paying={paying}
        payingAmount={payingAmount}
        />
      </div>
    </div>
  )
}

export default Pricing