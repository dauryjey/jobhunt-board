interface StatusProps {
  available: boolean;
}

export const Status: React.FC<StatusProps> = ({ available }: StatusProps) => {
  return (
    <>
      {available ? (
        <p className="text-green-500">Open</p>
      ) : (
        <p className="text-red-500">Closed</p>
      )}
    </>
  );
};
