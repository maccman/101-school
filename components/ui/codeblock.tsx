export function CodeBlock({ value }: { value: string; language: string }) {
  return (
    <div className="bg-gray-800 text-white rounded p-5">
      <code>{value}</code>
    </div>
  )
}
