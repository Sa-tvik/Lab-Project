const submissionStatus = [
  {
    id: 1,
    description: "Your submission is waiting in the queue to be processed.",
  },
  {
    id: 2,
    description: "Your code is currently being processed and executed.",
  },
  {
    id: 3,
    description: "Congratulations! Your code ran successfully and produced the expected output.",
  },
  {
    id: 4,
    description: "Your code ran but the output didn’t match the expected result. Check your logic or output formatting.",
  },
  {
    id: 5,
    description: "Your program took too long to finish. Try optimizing your code or using faster algorithms.",
  },
  {
    id: 6,
    description: "Your code failed to compile. Check for syntax errors, missing semicolons, or incorrect imports.",
  },
  {
    id: 7,
    description: "Runtime Error: Segmentation fault (SIGSEGV). Your code tried to access invalid memory. Check array indices or pointer use.",
  },
  {
    id: 8,
    description: "Runtime Error: File size limit exceeded (SIGXFSZ). Your code tried to create or write a file that’s too large.",
  },
  {
    id: 9,
    description: "Runtime Error: Floating-point exception (SIGFPE). Division by zero or invalid arithmetic operation occurred.",
  },
  {
    id: 10,
    description: "Runtime Error: Aborted (SIGABRT). Your program was stopped abruptly, possibly due to memory issues or failed assertions.",
  },
  {
    id: 11,
    description: "Runtime Error: Non-zero exit code (NZEC). Your program exited unexpectedly. Check for unhandled exceptions or input errors.",
  },
  {
    id: 12,
    description: "Runtime Error: Other. Your code crashed for an unknown reason. Review your logic and input handling.",
  },
  {
    id: 13,
    description: "Internal error occurred on the server. Please try again later or contact support.",
  },
  {
    id: 14,
    description: "Exec format error. The program format is invalid. Ensure your code is written in the correct language and format.",
  },
];

export default submissionStatus;
