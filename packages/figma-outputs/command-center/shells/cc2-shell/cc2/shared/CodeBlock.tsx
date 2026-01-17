/**
 * CODE BLOCK - JSON EDITOR
 * For editing response contracts and proof pathways
 */

interface CodeBlockProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function CodeBlock({ value, onChange, language = 'json' }: CodeBlockProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-700 p-4 font-mono text-sm overflow-auto max-h-96">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-zinc-300 focus:outline-none resize-none min-h-[200px]"
        spellCheck={false}
      />
    </div>
  );
}
