import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Markdown({ content }: { content: string }) {
  return (
    <div className='prose prose-m dark:prose-invert max-w-none break-words'>
        <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        >
        {content}
        </ReactMarkdown>
    </div>
  );
}