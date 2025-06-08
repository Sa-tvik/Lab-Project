const problems = [
  {
    id: 1,
    title: "Iterative Binary Search",
    difficulty: "Easy",
    tags: ["Binary Search", "Iterative"],
    description: "Implement iterative binary search on a sorted array to find the target element.",
    examples: [
      {
        input: { arr: [1, 2, 3, 4, 5], target: 3 },
        output: 2,
      },
    ],
    constraints: ["1 <= arr.length <= 1000", "arr is sorted in ascending order"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [1, 2, 3, 4, 5], target: 3},
        output: 2,
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30, 40, 50], target: 10},
        output: 0,
      },
      {
        case: "Case 3",
        input: { arr: [-30, -20, -10, 0, 10], target: -20},
        output: 1,
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static int binarySearch(int[] arr, int target) {\n        // Your code here\n        \n    }\n}",
      python: "def binary_search(arr, target):\n    # Your code here\n    ",
      cpp: "int binarySearch(vector<int>& arr, int target) {\n    // Your code here\n    \n}",
      c: "int binarySearch(int arr[], int n, int target) {\n    // Your code here\n    \n}"
    },
  },
  {
    id: 2,
    title: "Recursive Binary Search",
    difficulty: "Easy",
    tags: ["Binary Search", "Recursive"],
    description: "Implement recursive binary search on a sorted array to find the target element.",
    examples: [
      {
        input: { arr: [1, 2, 3, 4, 5], target: 4 },
        output: 3,
      },
    ],
    constraints: ["1 <= arr.length <= 1000", "arr is sorted in ascending order"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [1, 3, 5, 7, 9], target: 5,},
        output: 2,
      },
      {
        case: "Case 2",
        input: { arr: [2, 4, 6, 8, 10], target: 2,},
        output: 0,
      },
      {
        case: "Case 3",
        input: { arr: [-10, -5, 0, 5, 10], target: -5},
        output: 1,
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static int recursiveBinarySearch(int[] arr, int left, int right, int target) {\n        // Your code here\n        return -1;\n    }\n}",
      python: "def recursive_binary_search(arr, left, right, target):\n    # Your code here\n    return -1",
      cpp: "int recursiveBinarySearch(vector<int>& arr, int left, int right, int target) {\n    // Your code here\n    return -1;\n}",
      c: "int recursiveBinarySearch(int arr[], int left, int right, int target) {\n    // Your code here\n    return -1;\n}"
    },
  },
  {
    id: 3,
    title: "Bubble Sort",
    difficulty: "Easy",
    tags: ["Sorting", "Bubble Sort"],
    description: "Sort an array using the bubble sort algorithm.",
    examples: [
      {
        input: { arr: [5, 1, 4, 2, 8] },
        output: [1, 2, 4, 5, 8],
      },
    ],
    constraints: ["1 <= arr.length <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [3, 1, 4, 1, 5, 9] },
        output: [1, 1, 3, 4, 5, 9],
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30] },
        output: [10, 20, 30],
      },
      {
        case: "Case 3",
        input: { arr: [-10, -20, -30] },
        output: [-30, -20, -10],
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static void bubbleSort(int[] arr) {\n        // Your code here\n    }\n}",
      python: "def bubble_sort(arr):\n    # Your code here\n    pass",
      cpp: "void bubbleSort(vector<int>& arr) {\n    // Your code here\n}",
      c: "void bubbleSort(int arr[], int n) {\n    // Your code here\n}"
    },
  },
  {
    id: 4,
    title: "Selection Sort",
    difficulty: "Easy",
    tags: ["Sorting", "Selection Sort"],
    description: "Sort an array using the selection sort algorithm.",
    examples: [
      {
        input: { arr: [64, 25, 12, 22, 11] },
        output: [11, 12, 22, 25, 64],
      },
    ],
    constraints: ["1 <= arr.length <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [3, 1, 4, 1, 5, 9] },
        output: [1, 1, 3, 4, 5, 9],
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30] },
        output: [10, 20, 30],
      },
      {
        case: "Case 3",
        input: { arr: [-10, -20, -30] },
        output: [-30, -20, -10],
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static void selectionSort(int[] arr) {\n        // Your code here\n    }\n}",
      python: "def selection_sort(arr):\n    # Your code here\n    pass",
      cpp: "void selectionSort(vector<int>& arr) {\n    // Your code here\n}",
      c: "void selectionSort(int arr[], int n) {\n    // Your code here\n}"
    },
  },
  {
    id: 5,
    title: "Insertion Sort",
    difficulty: "Easy",
    tags: ["Sorting", "Insertion Sort"],
    description: "Sort an array using the insertion sort algorithm.",
    examples: [
      {
        input: { arr: [12, 11, 13, 5, 6] },
        output: [5, 6, 11, 12, 13],
      },
    ],
    constraints: ["1 <= arr.length <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [3, 1, 4, 1, 5, 9] },
        output: [1, 1, 3, 4, 5, 9],
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30] },
        output: [10, 20, 30],
      },
      {
        case: "Case 3",
        input: { arr: [-10, -20, -30] },
        output: [-30, -20, -10],
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static void insertionSort(int[] arr) {\n        // Your code here\n    }\n}",
      python: "def insertion_sort(arr):\n    # Your code here\n    pass",
      cpp: "void insertionSort(vector<int>& arr) {\n    // Your code here\n}",
      c: "void insertionSort(int arr[], int n) {\n    // Your code here\n}"
    },
  },
  {
    id: 6,
    title: "Linear Search",
    difficulty: "Easy",
    tags: ["Search", "Linear Search"],
    description: "Implement linear search to find the index of a target element in an array.",
    examples: [
      {
        input: { arr: [1, 2, 3, 4, 5], target: 4 },
        output: 3,
      },
    ],
    constraints: ["1 <= arr.length <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [3, 1, 4, 1, 5, 9], target: 5},
        output: 4,
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30], target: 20},
        output: 1,
      },
      {
        case: "Case 3",
        input: { arr: [-10, -20, -30], target: -30},
        output: 2,
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static int linearSearch(int[] arr, int target) {\n        // Your code here\n        return -1;\n    }\n}",
      python: "def linear_search(arr, target):\n    # Your code here\n    return -1",
      cpp: "int linearSearch(int arr[], int n, int target) {\n    // Your code here\n    return -1;\n}",
      c: "int linearSearch(int arr[], int n, int target) {\n    // Your code here\n    return -1;\n}"
    },
  },
  {
    id: 7,
    title: "Merge Sort",
    difficulty: "Medium",
    tags: ["Sorting", "Merge Sort"],
    description: "Implement merge sort to sort an array.",
    examples: [
      {
        input: { arr: [12, 11, 13, 5, 6, 7] },
        output: [5, 6, 7, 11, 12, 13],
      },
    ],
    constraints: ["1 <= arr.length <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [3, 1, 4, 1, 5, 9] },
        output: [1, 1, 3, 4, 5, 9],
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30] },
        output: [10, 20, 30],
      },
      {
        case: "Case 3",
        input: { arr: [-10, -20, -30] },
        output: [-30, -20, -10],
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static void mergeSort(int[] arr, int left, int right) {\n        // Your code here\n    }\n}",
      python: "def merge_sort(arr):\n    # Your code here\n    pass",
      cpp: "void mergeSort(int arr[], int left, int right) {\n    // Your code here\n}",
      c: "void mergeSort(int arr[], int left, int right) {\n    // Your code here\n}"
    },
  },
  {
    id: 8,
    title: "Quick Sort",
    difficulty: "Medium",
    tags: ["Sorting", "Quick Sort"],
    description: "Implement quick sort to sort an array.",
    examples: [
      {
        input: { arr: [10, 7, 8, 9, 1, 5] },
        output: [1, 5, 7, 8, 9, 10],
      },
    ],
    constraints: ["1 <= arr.length <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: { arr: [3, 1, 4, 1, 5, 9] },
        output: [1, 1, 3, 4, 5, 9],
      },
      {
        case: "Case 2",
        input: { arr: [10, 20, 30] },
        output: [10, 20, 30],
      },
      {
        case: "Case 3",
        input: { arr: [-10, -20, -30] },
        output: [-30, -20, -10],
      },
    ],
    starterCode: {
      java: "public class Main {\n    public static void quickSort(int[] arr, int low, int high) {\n        // Your code here\n    }\n}",
      python: "def quick_sort(arr):\n    # Your code here\n    pass",
      cpp: "void quickSort(int arr[], int low, int high) {\n    // Your code here\n}",
      c: "void quickSort(int arr[], int low, int high) {\n    // Your code here\n}"
    },
  },
  {
    id: 9,
    title: "Depth First Search (DFS)",
    difficulty: "Medium",
    tags: ["Graph", "DFS"],
    description: "Implement DFS traversal for a graph represented using adjacency list.",
    examples: [
      {
        input: {
          graph: {
            0: [1, 2],
            1: [2],
            2: [0, 3],
            3: [3],
          },
          start: 2,
        },
        output: [2, 0, 1, 3],
      },
    ],
    constraints: ["0 <= number of vertices <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: {
          graph: {
            0: [1, 2],
            1: [2],
            2: [0, 3],
            3: [3],
          },
          start: 2,
        },
        output: [2, 0, 1, 3],
      },
      {
        case: "Case 2",
        input: {
          graph: {
            0: [1],
            1: [2],
            2: [3],
            3: [],
          },
          start: 0,
        },
        output: [0, 1, 2, 3],
      },
      {
        case: "Case 3",
        input: {
          graph: {
            0: [],
            1: [0],
            2: [1],
            3: [2],
          },
          start: 3,
        },
        output: [3, 2, 1, 0],
      },
    ],
    starterCode: {
      java: "import java.util.*;\npublic class Main {\n    public static void dfs(int v, boolean[] visited, List<List<Integer>> adj) {\n        // Your code here\n    }\n}",
      python: "def dfs(node, visited, adj):\n    # Your code here\n    pass",
      cpp: "void dfs(int node, vector<bool>& visited, vector<vector<int>>& adj) {\n    // Your code here\n}",
      c: "void dfs(int node, int visited[], int adj[][MAX], int n) {\n    // Your code here\n}"
    },
  },
  {
    id: 10,
    title: "Breadth First Search (BFS)",
    difficulty: "Medium",
    tags: ["Graph", "BFS"],
    description: "Implement BFS traversal for a graph represented using adjacency list.",
    examples: [
      {
        input: {
          graph: {
            0: [1, 2],
            1: [2],
            2: [0, 3],
            3: [3],
          },
          start: 2,
        },
        output: [2, 0, 3, 1],
      },
    ],
    constraints: ["0 <= number of vertices <= 1000"],
    testCases: [
      {
        case: "Case 1",
        input: {
          graph: {
            0: [1, 2],
            1: [2],
            2: [0, 3],
            3: [3],
          },
          start: 2,
        },
        output: [2, 0, 3, 1],
      },
      {
        case: "Case 2",
        input: {
          graph: {
            0: [1],
            1: [2],
            2: [3],
            3: [],
          },
          start: 0,
        },
        output: [0, 1, 2, 3],
      },
      {
        case: "Case 3",
        input: {
          graph: {
            0: [],
            1: [0],
            2: [1],
            3: [2],
          },
          start: 3,
        },
        output: [3, 2, 1, 0],
      },
    ],
    starterCode: {
      java: "import java.util.*;\npublic class Main {\n    public static void bfs(int start, boolean[] visited, List<List<Integer>> adj) {\n        // Your code here\n    }\n}",
      python: "def bfs(start, visited, adj):\n    # Your code here\n    pass",
      cpp: "void bfs(int start, vector<bool>& visited, vector<vector<int>>& adj) {\n    // Your code here\n}",
      c: "void bfs(int start, int visited[], int adj[][MAX], int n) {\n    // Your code here\n}"
    },
  }
];

export default problems;



