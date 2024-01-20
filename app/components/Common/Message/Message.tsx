interface MessageProps {
  msg: string;
}

export const Message: React.FC<MessageProps> = ({ msg }: MessageProps) => {
  return <p>{msg}</p>
}