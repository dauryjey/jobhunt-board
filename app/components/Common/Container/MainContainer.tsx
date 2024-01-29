interface MainContainerProps {
  children: React.ReactNode
}

export const MainContainer: React.FC<MainContainerProps> = ({ children}: MainContainerProps) => {
  return <main className="px-4">{children}</main>
}