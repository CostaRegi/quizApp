import React, {createContext, useContext, useEffect, useState} from 'react';

export type QuizItem = {
  category?: string;
  type?: string;
  difficulty?: string;
  question?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
};

type QuizResponse = {
  results: QuizItem[];
};

function useFetch() {
  const [result, setResult] = useState<QuizResponse>({results: []});
  useEffect(() => {
    const loadData = async () => {
      const resp = await fetch('https://opentdb.com/api.php?amount=10');
      const respJson = await resp.json();
      setResult(respJson);
    };
    loadData();
  }, []);

  return result;
}

const QuizContext = createContext<QuizResponse>({results: []});

type QuizProviderProps = {
  children: JSX.Element;
};

function QuizProvider({children}: QuizProviderProps) {
  const data = useFetch();
  return <QuizContext.Provider value={data}>{children}</QuizContext.Provider>;
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('Quiz context must be used within a a QuizProvider');
  }

  return context;
}

export {QuizProvider, useQuizContext};
