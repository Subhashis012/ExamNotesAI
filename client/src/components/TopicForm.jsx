import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";


function TopicForm({setResult, setLoading, loading, setError}) {
    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setRevisionMode] = useState(false);
    const [includeDiagram, setIncludeDiagram] = useState(false);
    const [includeChart, setIncludeChart] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
      if (!topic.trim()) {
        setError("Topic is required");
        return;
      }
      setError("");
      setLoading(true);
      setResult(null);
      try {
        const result = await generateNotes({
          topic,
          classLevel,
          examType,
          revisionMode,
          includeDiagram,
          includeChart
        })
        setResult(result.data);
        setLoading(false);
        setClassLevel("");
        setTopic("");
        setExamType("");
        setRevisionMode(false);
        setIncludeDiagram(false);
        setIncludeChart(false);

        if(typeof result.creditsLeft === "number") {
          dispatch(updateCredits(result.creditsLeft));
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while generating notes. Please try again.");
        setLoading(false);
      }
    }

    useEffect(() => {
      if(!loading) {
        setProgress(0);
        setProgressText("");
        return;
      }
      let value = 0;

      const interval = setInterval(() => {
        value += Math.random() * 8;
        if(value >= 95) {
          value = 95;
          setProgressText("Almost there...");
          clearInterval(interval);
        } else if(value > 70) {
          setProgressText("Finalizing the notes...");
        } else if(value > 40) {
          setProgressText("Processing notes...");
        } else {
          setProgressText("Generating notes...");
        }
        setProgress(Math.floor(value));
      }, 700)

      return () => clearInterval(interval);
    }, [loading])

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.75)] space-y-6 text-white"
    >
        <input type="text" className="w-full p-3 rounded-xl bg-white/10 backdrop:blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Enter Topic: Your Any Subject"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        />
        <input type="text" className="w-full p-3 rounded-xl bg-white/10 backdrop:blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Class / Level (e.g. Class 10, 12, Undergraduate)"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
        />
        <input type="text" className="w-full p-3 rounded-xl bg-white/10 backdrop:blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Exam Type (e.g. Midterm, Final, Quiz)"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
        />
        <div className="flex flex-col md:flex-row gap-6">
            <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
              <Toggle label="Include Diagrams" checked={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />
              <Toggle label="Include Charts" checked={includeChart} onChange={() => setIncludeChart(!includeChart)} />
        </div>

        <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? {scale: 1.02} : {}}
        whileTap={!loading ? {scale: 0.95} : {}}
        className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 ${
          loading ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]'
          }`}>
            {loading ? "Generating Notes..." : "Generate Notes"}
          </motion.button>

          {loading && <div className="mt-4 space-y-2">
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div 
                initial={{width: 0}}
                animate={{width: `${progress}%`}}
                transition={{ease: "easeOut", duration: 0.6}}
                className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">

                </motion.div>
              </div>

              <div className="flex justify-between text-xs text-gray-300">
                <span>{progressText}</span>
                <span>{progress}%</span>
              </div>
              <p className="text-xs text-gray-400 text-center">
                This process may take up to a minute. The more specific your topic, the better the notes. Please avoid navigating away or refreshing the page while notes are being generated.
              </p>
              <div></div>
            </div>}
    </motion.div>
  )
}

export default TopicForm
