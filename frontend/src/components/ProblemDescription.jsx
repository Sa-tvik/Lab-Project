import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProblemContext } from '../context/ProblemContext';
import { ParseProblem } from '../utils/ParseProblem';

export default function ProblemDescription() {
  const { id } = useParams();
  const { problems, setProblems } = useProblemContext();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem(`problem-${id}`);
    const parsedLocal = local ? JSON.parse(local) : null;

    if (!parsedLocal) {
      const rawProblem = problems.find((p) => p.order_id === Number(id));
      if (rawProblem) {
        setProblem(ParseProblem(rawProblem));
        localStorage.setItem(`problem-${id}`, JSON.stringify(rawProblem));
        setLoading(false);
      } else {
        const fetchProblem = async () => {
          try {
            const res = await fetch(`http://localhost:5000/problem`);
            const data = await res.json();
            console.log("fetching without context");
            if (!Array.isArray(data)) throw new Error("Invalid data");
            setProblems(data);
            const fetchedProblem = data.find((p) => p.order_id === Number(id));
            if (!fetchedProblem || fetchedProblem.error) throw new Error("Invalid data");
            setProblem(ParseProblem(fetchedProblem));
            localStorage.setItem(`problem-${id}`, JSON.stringify(fetchedProblem));
          } catch (err) {
            console.error("Error fetching problem:", err);
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchProblem();
      }
    } else {
      try {
        setProblem(ParseProblem(parsedLocal));
      } catch (err) {
        console.error("Error parsing local problem:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [id, problems, setProblems]);

  if (loading) return <div className="p-4 text-white">Loading...</div>;
  if (error || !problem) return <div className="p-4 text-red-500">Problem not found.</div>;

  const renderInputInline = (input) => {
    if (typeof input === 'object' && input !== null) {
      const parts = Object.entries(input).map(([key, value]) => {
        const formatValue = (val) => Array.isArray(val) ? `[${val.map(formatValue).join(',')}]` : String(val);
        return `${key} = ${formatValue(value)}`;
      });
      return parts.join(" ");
    }
    return String(input);
  };

  return (
    <div className="h-full bg-white dark:bg-[#1e1e1e] overflow-y-auto">
      <div className="p-4 md:p-6">
        <h1 className="text-lg md:text-2xl font-medium text-gray-900 dark:text-white">
          {problem.order_id}. {problem.title}
        </h1>
        <div className="mt-1 flex gap-2">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-2 text-sm rounded-2xl dark:bg-gray-800 dark:text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">{problem.description}</p>

          {problem.examples?.map((example, idx) => (
            <div key={idx} className="mt-6 dark:text-white">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example {idx + 1} :</h3>
              <pre className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
                <div><strong>Input: </strong>{renderInputInline(example.input)}</div>
                <div><strong>Output:</strong> {
                  Array.isArray(example.output)
                    ? `[${example.output.join(", ")}]`
                    : String(example.output)}
                </div>
              </pre>
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Constraints:</h3>
            <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 list-disc list-inside">
              {problem.constraints?.map((c, i) => (
                <li key={i} className="font-mono text-sm">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
