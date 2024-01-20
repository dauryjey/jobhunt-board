interface NavContainerProps {
  children: React.ReactNode
}

export const NavContainer: React.FC<NavContainerProps> = ({ children }: NavContainerProps) => {
  return (
    <header className="border-b p-4 mb-4">
      {children}
    </header>
  )}