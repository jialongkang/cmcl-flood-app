interface TextBlockProps {
  title: string;
  content: string;
}

const TextBlock = ({ title, content }: TextBlockProps) => {
  return (
    <div>
      <h2 className="h2">{title}</h2>
      <p className="text-muted">{content}</p>
    </div>
  );
};

export default TextBlock;
