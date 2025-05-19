import React from 'react';

const problemDescriptions = [
  {
    id: 1,
    title: "Iterative Binary Search",
    difficulty: "Easy",
    description: "Implement iterative binary search to find a key in a sorted array.",
    examples: [
      { input: "arr = [1, 3, 5, 7, 9], key = 5", output: "2" },
      { input: "arr = [2, 4, 6, 8, 10], key = 7", output: "Not Found" }
    ],
    constraints: [
      "1 ≤ array length ≤ 1000",
      "Elements are integers in sorted order"
    ]
  },
  {
    id: 2,
    title: "Recursive Binary Search",
    difficulty: "Easy",
    description: "Implement recursive binary search to find a key in a sorted array.",
    examples: [
      { input: "arr = [1, 3, 5, 7, 9], key = 5", output: "2" },
      { input: "arr = [2, 4, 6, 8, 10], key = 7", output: "Not Found" }
    ],
    constraints: [
      "1 ≤ array length ≤ 1000",
      "Elements are integers in sorted order"
    ]
  },
  {
    id: 3,
    title: "Bubble Sort",
    difficulty: "Easy",
    description: "Sort an array using bubble sort algorithm.",
    examples: [
      { input: "arr = [5, 2, 9, 1, 5, 6]", output: "Sorted: [1, 2, 5, 5, 6, 9]" }
    ],
    constraints: [
      "1 ≤ array length ≤ 100",
      "No duplicate elements"
    ]
  },
  {
    id: 4,
    title: "Insertion Sort",
    difficulty: "Easy",
    description: "Sort an array using insertion sort algorithm.",
    examples: [
      { input: "arr = [5, 2, 9, 1, 5, 6]", output: "Sorted: [1, 2, 5, 5, 6, 9]" }
    ],
    constraints: [
      "1 ≤ array length ≤ 100",
      "No duplicate elements"
    ]
  },
  {
    id: 5,
    title: "Selection Sort",
    difficulty: "Easy",
    description: "Sort an array using selection sort algorithm.",
    examples: [
      { input: "arr = [5, 2, 9, 1, 5, 6]", output: "Sorted: [1, 2, 5, 5, 6, 9]" }
    ],
    constraints: [
      "1 ≤ array length ≤ 100",
      "No duplicate elements"
    ]
  },
  {
    id: 6,
    title: "Find Maximum and Minimum",
    difficulty: "Easy",
    description: "Write a program to find the maximum and minimum values in a list of numbers.",
    examples: [
      { input: "arr = [3, 1, 6, 0, -4, 9]", output: "Min: -4, Max: 9" }
    ],
    constraints: [
      "1 ≤ array length ≤ 1000"
    ]
  },
  {
    id: 7,
    title: "Merge Sort",
    difficulty: "Medium",
    description: "Sort an array using merge sort algorithm and analyze its time complexity.",
    examples: [
      { input: "arr = [4, 2, 7, 1, 3]", output: "Sorted: [1, 2, 3, 4, 7]" }
    ],
    constraints: [
      "1 ≤ array length ≤ 1000"
    ]
  },
  {
    id: 8,
    title: "Quick Sort",
    difficulty: "Medium",
    description: "Sort an array using quick sort algorithm and analyze its performance.",
    examples: [
      { input: "arr = [4, 2, 7, 1, 3]", output: "Sorted: [1, 2, 3, 4, 7]" }
    ],
    constraints: [
      "1 ≤ array length ≤ 1000"
    ]
  },
  {
    id: 9,
    title: "Breadth First Search",
    difficulty: "Medium",
    description: "Perform BFS traversal on a graph represented by adjacency lists.",
    examples: [
      { input: "Graph: 0 → [1, 2], 1 → [2], 2 → [0, 3], 3 → [3]", output: "BFS: 0 1 2 3" }
    ],
    constraints: [
      "Number of vertices ≤ 100"
    ]
  },
  {
    id: 10,
    title: "Depth First Search",
    difficulty: "Medium",
    description: "Perform DFS traversal on a graph represented by adjacency lists.",
    examples: [
      { input: "Graph: 0 → [1, 2], 1 → [2], 2 → [0, 3], 3 → [3]", output: "DFS: 0 1 2 3" }
    ],
    constraints: [
      "Number of vertices ≤ 100"
    ]
  }
];

const difficultyColors = {
  Easy: 'text-green-500',
  Medium: 'text-yellow-500',
  Hard: 'text-red-500',
};

export default function ProblemDescription() {
  function getProblemDescription(id) {
    return problemDescriptions.find(problem => problem.id === id);
  }
  
  return (
    <div className="h-full bg-white dark:bg-[#1e1e1e] overflow-y-auto">
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">
          {problem.title}
        </h1>

        <div className="flex items-center gap-4 mt- 2">
          <span className={`text-sm font-medium ${difficultyColors[problems.difficulty]}`}>{problems.difficulty}</span>
        </div>

        <div className="mt-6 prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">{problems.description}</p>

          {problems.examples?.map((example, idx) => (
            <div key={idx} className="mt-6 dark:text-white">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example {idx + 1}:</h3>
              <pre className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> {example.input}
                {"\n"}
                <strong>Output:</strong> {example.output}
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
