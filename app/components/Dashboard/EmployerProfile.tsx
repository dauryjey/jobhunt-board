import { Job, User } from "@prisma/client"
import { Button } from "flowbite-react"

interface EmployerProfileProps {
  user: User;
  jobs: Job[]
}

export const EmployerProfile: React.FC<EmployerProfileProps> = ({ user, jobs }: EmployerProfileProps) => {
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <aside className="flex flex-col justify-between bg-gray-100 p-5 rounded-xl md:w-2/6 md:h-[80vh]">
    <section>
      <p className="font-semibold text-2xl md:text-4xl">{fullName}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Jobs posted:</span> {jobs.length}</p>
    </section>
    <section className="flex flex-col gap-2 justify-center items-center">
      <Button color="gray" fullSized>Change password</Button>
      <Button color="red" fullSized>Delete account</Button>
    </section>
  </aside>
  )
}