import ShowStep from "./ShowStep";
import useSteps from "../useSteps";
import {useProgress} from "../ProgressContext";
import {useEffect} from "react";

const Content = () => {
  const {steps, loading, error} = useSteps();
  const {currentStep, setStepCount, nextStep} = useProgress();

  useEffect(() => {
    setStepCount(steps.length);
  }, [steps, setStepCount]);

  return (
    <main className="max-w-2xl mx-auto px-4 h-full">
      {loading && (
        <div className="text-orange-500 font-semibold text-xl">Loading...</div>
      )}
      {error && <div className="font-semibold text-xl">{error}</div>}

      {steps.length > 0 && (
        <>
          {steps.slice(0, currentStep).map((step, index) => (
            <ShowStep key={index} step={step} />
          ))}
          <button onClick={nextStep}>Next</button>
        </>
      )}
    </main>
  );
};

export default Content;
