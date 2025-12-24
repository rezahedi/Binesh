import {
  LESSON_COMPLETED_POINTS,
  MISTAKE_POINTS,
  STEP_PASSED_POINTS,
  SUCCESS_POINTS,
} from "@/constants/trophy";
import { useReducer } from "react";

export type StatsType = {
  passedParts: number;
  failedQuizzes: number;
  passedQuizzes: number;
  startTime: number;
  endTime: number;
};

type ActionType = {
  type:
    | "PASSED_PART"
    | "FAILED_QUIZ"
    | "PASSED_QUIZ"
    | "SET_START_TIME"
    | "SET_END_TIME";
};

function statsReducer(state: StatsType, action: ActionType): StatsType {
  switch (action.type) {
    case "PASSED_PART":
      return { ...state, passedParts: state.passedParts + 1 };
    case "FAILED_QUIZ":
      return { ...state, failedQuizzes: state.failedQuizzes + 1 };
    case "PASSED_QUIZ":
      return { ...state, passedQuizzes: state.passedQuizzes + 1 };
    case "SET_START_TIME":
      return { ...state, startTime: new Date().getTime() };
    case "SET_END_TIME":
      return { ...state, endTime: new Date().getTime() };
    default:
      return state;
  }
}

export interface IUseStats extends StatsType {
  handlePassedPart: () => void;
  handleFailedQuiz: () => void;
  handlePassedQuiz: () => void;
  setStartTime: () => void;
  setEndTime: () => void;
  getPoints: () => number;
  getTime: () => number;
}

const useStats = (): IUseStats => {
  const [state, dispatch] = useReducer(statsReducer, {
    passedParts: 0,
    failedQuizzes: 0,
    passedQuizzes: 0,
    startTime: 0,
    endTime: 0,
  });

  const handlePassedPart = () => {
    dispatch({ type: "PASSED_PART" });
  };

  const handleFailedQuiz = () => {
    dispatch({ type: "FAILED_QUIZ" });
  };

  const handlePassedQuiz = () => {
    dispatch({ type: "PASSED_QUIZ" });
  };

  const setStartTime = () => {
    dispatch({ type: "SET_START_TIME" });
  };

  const setEndTime = () => {
    dispatch({ type: "SET_END_TIME" });
  };

  const getPoints = () => {
    return (
      state.passedParts * STEP_PASSED_POINTS +
      state.passedQuizzes * SUCCESS_POINTS -
      state.failedQuizzes * MISTAKE_POINTS +
      LESSON_COMPLETED_POINTS
    );
  };

  const getTime = () => {
    if (state.startTime === 0) return 0;

    const now = new Date().getTime();

    return Math.round(((state.endTime || now) - state.startTime) / 1000 / 60);
  };

  return {
    ...state,
    handlePassedPart,
    handleFailedQuiz,
    handlePassedQuiz,
    setStartTime,
    setEndTime,
    getPoints,
    getTime,
  };
};

export default useStats;
