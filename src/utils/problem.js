// problems.js

const problems = [
    {
      id: 1,
      title: 'Iterative Binary Search',
      description: 'Perform binary search on a sorted array using iteration.',
      difficulty: 'Easy',
      examples: [
        {
          input: 'arr = [1, 3, 5, 7, 9], target = 5',
          output: '2'
        },
        {
          input: 'arr = [1, 3, 5, 7, 9], target = 8',
          output: '-1'
        }
      ],
      constraints: [
        '1 <= arr.length <= 10^4',
        '-10^5 <= arr[i], target <= 10^5'
      ],
      testCases: [
        { input: [1, 3, 5, 7, 9], target: 5 },
        { input: [1, 3, 5, 7, 9], target: 8 },
        { input: [10, 20, 30, 40, 50], target: 10 }
      ],
      starterCode: {
        java: `public class Solution {
      public int binarySearch(int[] arr, int target) {
          // write your code here
      }
  }`,
        python: `def binary_search(arr, target):
      # write your code here
      pass`,
        cpp: `int binarySearch(vector<int>& arr, int target) {
      // write your code here
  }`,
        c: `int binarySearch(int arr[], int n, int target) {
      // write your code here
  }`
      }
    },
  
    {
      id: 2,
      title: 'Recursive Binary Search',
      description: 'Perform binary search on a sorted array using recursion.',
      difficulty: 'Easy',
      examples: [
        {
          input: 'arr = [2, 4, 6, 8, 10], target = 6',
          output: '2'
        }
      ],
      constraints: [
        '1 <= arr.length <= 10^4',
        '-10^5 <= arr[i], target <= 10^5'
      ],
      testCases: [
        { input: [2, 4, 6, 8, 10], target: 6 },
        { input: [2, 4, 6, 8, 10], target: 5 },
        { input: [5], target: 5 }
      ],
      starterCode: {
        java: `public class Solution {
      public int recursiveBinarySearch(int[] arr, int left, int right, int target) {
          // write your code here
      }
  }`,
        python: `def recursive_binary_search(arr, left, right, target):
      # write your code here
      pass`,
        cpp: `int recursiveBinarySearch(vector<int>& arr, int left, int right, int target) {
      // write your code here
  }`,
        c: `int recursiveBinarySearch(int arr[], int left, int right, int target) {
      // write your code here
  }`
      }
    },
  
    {
      id: 3,
      title: 'Bubble Sort',
      description: 'Sort the array using Bubble Sort algorithm.',
      difficulty: 'Easy',
      examples: [
        {
          input: 'arr = [5, 1, 4, 2, 8]',
          output: '[1, 2, 4, 5, 8]'
        }
      ],
      constraints: [
        '1 <= arr.length <= 500',
        '-10^5 <= arr[i] <= 10^5'
      ],
      testCases: [
        { input: [5, 1, 4, 2, 8] },
        { input: [3, 2, 1] },
        { input: [1, 2, 3] }
      ],
      starterCode: {
        java: `public class Solution {
      public void bubbleSort(int[] arr) {
          // write your code here
      }
  }`,
        python: `def bubble_sort(arr):
      # write your code here
      pass`,
        cpp: `void bubbleSort(vector<int>& arr) {
      // write your code here
  }`,
        c: `void bubbleSort(int arr[], int n) {
      // write your code here
  }`
      }
    },
  
    {
      id: 4,
      title: 'Insertion Sort',
      description: 'Sort the array using Insertion Sort algorithm.',
      difficulty: 'Easy',
      examples: [
        {
          input: 'arr = [12, 11, 13, 5, 6]',
          output: '[5, 6, 11, 12, 13]'
        }
      ],
      constraints: ['1 <= arr.length <= 500'],
      testCases: [
        { input: [12, 11, 13, 5, 6] },
        { input: [4, 3, 2, 10, 12] },
        { input: [1, 2, 3, 4, 5] }
      ],
      starterCode: {
        java: `public class Solution {
      public void insertionSort(int[] arr) {
          // write your code here
      }
  }`,
        python: `def insertion_sort(arr):
      # write your code here
      pass`,
        cpp: `void insertionSort(vector<int>& arr) {
      // write your code here
  }`,
        c: `void insertionSort(int arr[], int n) {
      // write your code here
  }`
      }
    },
  
    {
      id: 5,
      title: 'Selection Sort',
      description: 'Sort the array using Selection Sort algorithm.',
      difficulty: 'Easy',
      examples: [
        {
          input: 'arr = [64, 25, 12, 22, 11]',
          output: '[11, 12, 22, 25, 64]'
        }
      ],
      constraints: ['1 <= arr.length <= 500'],
      testCases: [
        { input: [64, 25, 12, 22, 11] },
        { input: [29, 10, 14, 37, 13] },
        { input: [1, 2, 3, 4, 5] }
      ],
      starterCode: {
        java: `public class Solution {
      public void selectionSort(int[] arr) {
          // write your code here
      }
  }`,
        python: `def selection_sort(arr):
      # write your code here
      pass`,
        cpp: `void selectionSort(vector<int>& arr) {
      // write your code here
  }`,
        c: `void selectionSort(int arr[], int n) {
      // write your code here
  }`
      }
    },
  
    {
      id: 6,
      title: 'Find Maximum and Minimum',
      difficulty: 'Easy',
      description: 'Find the maximum and minimum elements in an array.',
      testCases: [
        { input: 'arr = [3, 5, 1, 2, 4]', output: 'max = 5, min = 1' },
        { input: 'arr = [10, 20, 30]', output: 'max = 30, min = 10' },
        { input: 'arr = [-5, -2, -9, -1]', output: 'max = -1, min = -9' }
      ],
      starterCode: {
        java: `public class MaxMinFinder {
      public static void main(String[] args) {
          int[] arr = {3, 5, 1, 2, 4};
          // Your code here
      }
  }`,
        python: `arr = [3, 5, 1, 2, 4]
  # Your code here`,
        cpp: `#include <iostream>
  using namespace std;
  
  int main() {
      int arr[] = {3, 5, 1, 2, 4};
      // Your code here
      return 0;
  }`,
        c: `#include <stdio.h>
  
  int main() {
      int arr[] = {3, 5, 1, 2, 4};
      // Your code here
      return 0;
  }`
      }
    },
  
    {
      id: 7,
      title: 'Merge Sort',
      difficulty: 'Medium',
      description: 'Implement merge sort to sort an array of integers.',
      testCases: [
        { input: 'arr = [5, 2, 4, 7, 1, 3, 2, 6]', output: 'arr = [1, 2, 2, 3, 4, 5, 6, 7]' },
        { input: 'arr = [1, 20, 6, 4, 5]', output: 'arr = [1, 4, 5, 6, 20]' }
      ],
      starterCode: {
        java: `public class MergeSort {
      public static void main(String[] args) {
          int[] arr = {5, 2, 4, 7, 1, 3, 2, 6};
          // Your code here
      }
  }`,
        python: `arr = [5, 2, 4, 7, 1, 3, 2, 6]
  # Your code here`,
        cpp: `#include <iostream>
  using namespace std;
  
  int main() {
      int arr[] = {5, 2, 4, 7, 1, 3, 2, 6};
      // Your code here
      return 0;
  }`,
        c: `#include <stdio.h>
  
  int main() {
      int arr[] = {5, 2, 4, 7, 1, 3, 2, 6};
      // Your code here
      return 0;
  }`
      }
    },
  
    {
      id: 8,
      title: 'Quick Sort',
      difficulty: 'Medium',
      description: 'Implement quick sort to sort an array of integers.',
      testCases: [
        { input: 'arr = [10, 7, 8, 9, 1, 5]', output: 'arr = [1, 5, 7, 8, 9, 10]' },
        { input: 'arr = [64, 34, 25, 12, 22]', output: 'arr = [12, 22, 25, 34, 64]' }
      ],
      starterCode: {
        java: `public class QuickSort {
      public static void main(String[] args) {
          int[] arr = {10, 7, 8, 9, 1, 5};
          // Your code here
      }
  }`,
        python: `arr = [10, 7, 8, 9, 1, 5]
  # Your code here`,
        cpp: `#include <iostream>
  using namespace std;
  
  int main() {
      int arr[] = {10, 7, 8, 9, 1, 5};
      // Your code here
      return 0;
  }`,
        c: `#include <stdio.h>
  
  int main() {
      int arr[] = {10, 7, 8, 9, 1, 5};
      // Your code here
      return 0;
  }`
      }
    },
  
    {
      id: 9,
      title: 'Breadth First Search',
      difficulty: 'Medium',
      description: 'Implement BFS traversal for a graph represented using adjacency list.',
      testCases: [
        { input: 'graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}, start = 2', output: '2 0 3 1' },
        { input: 'graph = {0: [1, 2], 1: [], 2: []}, start = 0', output: '0 1 2' }
      ],
      starterCode: {
        java: `import java.util.*;
  
  public class BFS {
      public static void main(String[] args) {
          // Your code here
      }
  }`,
        python: `from collections import deque
  
  def bfs(graph, start):
      # Your code here
      pass`,
        cpp: `#include <iostream>
  #include <vector>
  #include <queue>
  using namespace std;
  
  int main() {
      // Your code here
      return 0;
  }`,
        c: `#include <stdio.h>
  
  // Note: Implementing BFS in pure C requires adjacency matrix or list logic
  int main() {
      // Your code here
      return 0;
  }`
      }
    },
  
    {
      id: 10,
      title: 'Depth First Search',
      difficulty: 'Medium',
      description: 'Implement DFS traversal for a graph represented using adjacency list.',
      testCases: [
        { input: 'graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}, start = 2', output: '2 0 1 3' },
        { input: 'graph = {0: [1], 1: [2], 2: []}, start = 0', output: '0 1 2' }
      ],
      starterCode: {
        java: `import java.util.*;
  
  public class DFS {
      public static void main(String[] args) {
          // Your code here
      }
  }`,
        python: `def dfs(graph, node, visited):
      # Your code here
      pass`,
        cpp: `#include <iostream>
  #include <vector>
  using namespace std;
  
  void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
      // Your code here
  }
  
  int main() {
      // Your code here
      return 0;
  }`,
        c: `#include <stdio.h>
  
  // Note: DFS in C would require adjacency matrix and stack/recursion handling manually
  int main() {
      // Your code here
      return 0;
  }`
      }
    }
  ];
  
export default problems;