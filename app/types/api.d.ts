type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  skills: string[];
  experience: string;
};

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

type Application = {
  id: string;
  userId: string;
  jobId: string;
  message: string;
};
