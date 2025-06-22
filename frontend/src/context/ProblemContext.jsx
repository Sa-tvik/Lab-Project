import { createContext, useContext, useState } from "react";

const ProblemContext = createContext();

export const useProblemContext = () => useContext(ProblemContext) 

export const ProblemProvider = ({ children }) => {
    const [problems, setProblems] = useState([]);

    return (
        <ProblemContext.Provider value = {{ problems, setProblems}}>
            {children}
        </ProblemContext.Provider>
    )
}