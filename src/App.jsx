import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

import Timer from "./plugins/timer.js";

import click from "/click.mp3";
import clave from "/clave.mp3";

function App() {
  const [bpm, setBpm] = useState(60);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [bpmRunning, setBpmRunning] = useState(false);
  const [swingPercentage, setSwingPercentage] = useState(50);
  const [timeIntervals, setTimeIntervals] = useState(60000/bpm);

  const clickRef1 = useRef(new Audio(click));
  const clickRef2 = useRef(new Audio(clave));

  const metronome = useRef(
    new Timer(playClick, timeIntervals, swingPercentage, { immediate: true })
  );

  useEffect(() => {
    setTimeIntervals(60000 / bpm);
    console.log('time intervals',timeIntervals)
  }, [bpm]);

  useEffect(() => {
    // Ensure that the metronome is updated when bpm or swingPercentage changes
    if(bpmRunning){
      metronome.current.stop();
      metronome.current = new Timer(playClick, timeIntervals, swingPercentage, {
        immediate: true,
      });
      metronome.current.start();
    }
  }, [timeIntervals, swingPercentage]);

  // Function to handle BPM slider
  const handleSliderChange = (event) => {
    setBpm(parseInt(event.target.value));
  };

  // Function to handle swing percentage slider
  const handleSwingPercentageSlider = (event) => {
    setSwingPercentage(parseInt(event.target.value));
  };

  const changeBpm = (type) => {
    if (type === "decrease") {
      if (bpm > 30) {
        setBpm((prevBpm) => prevBpm - 1);
      }
    } else {
      if (bpm < 500) {
        setBpm((prevBpm) => prevBpm + 1);
      }
    }
  };

  const changeSwingPercentage = (type) => {
    if (type === "decrease") {
      if (swingPercentage > 0) {
        setSwingPercentage((prevSwingPercentage) => prevSwingPercentage - 1);
      }
    } else {
      if (swingPercentage < 500) {
        setSwingPercentage((prevSwingPercentage) => prevSwingPercentage + 1);
      }
    }
  };

  const toggleBpm = () => {
    console.log(bpmRunning);
    if (!bpmRunning) {
      console.log("bpm started-----------");
      metronome.current.start();
    } else {
      metronome.current.stop();
      clickRef1.current.currentTime = 0;
      clickRef2.current.currentTime = 0;
      console.log("bpm stopped-----------");
    }
    setBpmRunning(!bpmRunning);
  };

  let count = 0;
  function playClick() {
    if (count === beatsPerMeasure) {
      count = 0;
    }
    if (count === 0) {
      clickRef1.current.play();
      clickRef1.current.currentTime = 0;
    } else {
      clickRef2.current.play();
      clickRef2.current.currentTime = 0;
    }
    count++;
  }

  return (
    <>
      <div className="h-full flex flex-col justify-center gap-4 text-center">
        <h3 className="text-3xl text-white">Howard's Metronome App</h3>
        <div className="flex flex-col gap-6 w-[90vw] md:w-2/3 mx-auto border border-gray-400 rounded-lg shadow-md p-4 bg-[#242a31]">
          {/* bpm slider */}
          <div className="text-center">
            <label
              htmlFor="medium-range"
              className="block mb-2 text-3xl font-medium text-white"
            >
              {bpm} BPM
            </label>

            <div className="flex justify-center gap-4">
              <span className="flex flex-col justify-center">
                <CiCircleMinus
                  className="text-white cursor-pointer"
                  size={50}
                  onClick={() => changeBpm("decrease")}
                />
              </span>
              <div className="flex flex-col justify-center">
                <input
                  id="large-range"
                  type="range"
                  value={bpm}
                  min="30"
                  max="500"
                  onChange={handleSliderChange}
                  className="w-full md:w-[500px] h-3 bg-black rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <span className="flex flex-col justify-center">
                <IoIosAddCircleOutline
                  className="text-white cursor-pointer"
                  size={50}
                  onClick={() => changeBpm("increase")}
                />
              </span>
            </div>
          </div>
          {/* Swing Percentage slider */}
          <div className="text-center">
            <label
              htmlFor="medium-range"
              className="block mb-2 text-3xl font-medium text-white"
            >
              {swingPercentage}% Swing
            </label>

            <div className="flex justify-center gap-4">
              <span className="flex flex-col justify-center">
                <CiCircleMinus
                  className="text-white cursor-pointer"
                  size={50}
                  onClick={() => changeSwingPercentage("decrease")}
                />
              </span>
              <div className="flex flex-col justify-center">
                <input
                  id="large-range"
                  type="range"
                  value={swingPercentage}
                  min="0"
                  max="100"
                  onChange={handleSwingPercentageSlider}
                  className="w-full md:w-[500px] h-3 bg-black rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <span className="flex flex-col justify-center">
                <IoIosAddCircleOutline
                  className="text-white cursor-pointer"
                  size={50}
                  onClick={() => changeSwingPercentage("increase")}
                />
              </span>
            </div>
          </div>
          {/* start/stop button */}
          <div className="w-full flex justify-center">
            <button
              className="rounded-full w-[60px] h-[60px] text-white text-xl font-semibold bg-red-500 hover:bg-red-700 transition duration-200"
              onClick={toggleBpm}
            >
              {bpmRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
