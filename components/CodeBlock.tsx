import React from 'react';

interface CodeBlockProps {
  data: any;
  title: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ data, title }) => {
  const jsonString = JSON.stringify(data, null, 2);

  // Simple syntax highlighting via regex replacement
  const highlighted = jsonString.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "text-orange-300"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-os-accent font-bold"; // key
        } else {
          cls = "text-green-300"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-blue-400"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-gray-500"; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );

  return (
    <div className="bg-os-800 border border-os-700 rounded-lg overflow-hidden h-full flex flex-col shadow-lg">
      <div className="bg-os-900 px-4 py-2 border-b border-os-700 flex justify-between items-center">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{title}</span>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
        </div>
      </div>
      <div className="p-4 overflow-auto flex-1 custom-scrollbar">
        <pre className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
    </div>
  );
};