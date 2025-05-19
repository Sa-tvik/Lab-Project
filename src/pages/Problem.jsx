import { useParams } from 'react-router-dom';

export default function Problem() {
  const { id } = useParams();
  const problem = problemList.find((p) => p.id === parseInt(id)); 

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#1e1e1e] font-inter">
      <Header />
      <Split className="split" minSize={0}>
        <div className="h-[40vh] md:h-auto md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
          <ProblemDescription problem={problem} />
        </div>
        <div className="flex-1 h-[60vh] md:h-auto">
          <Editor problem={problem} />
        </div>
      </Split>
    </div>
  );
}
