interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return <h1 className="text-4xl font-bold">{title}</h1>;
};
