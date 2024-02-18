# JOBHUNT-BOARD

Welcome to JOBHUNT-BOARD, a platform designed to connect job seekers with employers seamlessly. Whether you're on the lookout for new opportunities or aiming to fill positions within your organization, JOBHUNT-BOARD provides a user-friendly interface to streamline the process.

## Features

### Current Features
- **Dashboard Access:** Users can access the dashboard without requiring a login.
- **Pagination:** The dashboard features pagination for improved navigation and organization of job listings.
- **Authentication:** Secure login, signup, and logout functionality are provided for both employers and job seekers.
- **Role-based Access:** Users can register as either employers or job seekers, each with their respective privileges and functionalities.
- **Validation:** ZOD library is utilized for robust data validation, ensuring the integrity of user inputs.
- **Job Search:** Users can search for jobs based on various criteria within the dashboard.
- **Categories:** Access categorized job listings to facilitate targeted job searches.
- **Job Details:** Detailed job descriptions are available, including the option to send cover letters directly from the platform.
- **Cover Letter Integration:** Job seekers can craft and submit cover letters, viewable by employers alongside job applications.
- **Employer Dashboard:** Employers have access to a dedicated dashboard where they can manage posted jobs, view job proposals, and perform other administrative tasks.

### Planned Features
- **Delete Jobs:** Implement functionality to allow employers to remove outdated or filled job listings.
- **User Profiles:** Create individual profile pages for users, providing a centralized hub for managing personal information and job preferences.
- **Job Status Updates:** Enable employers to update the status of job listings (e.g., open, closed, pending).
- **Blacklist Words:** Implement a feature to filter out inappropriate or irrelevant content from job listings and communications.
- **Email Integration:** Set up email notifications to keep users informed about relevant updates, such as new job postings or application status changes.

## Technologies Used

JOBHUNT-BOARD is built using the following technologies:

- **Remix.run with Typescript:** A versatile web framework for building modern web applications, featuring robust TypeScript support.
- **TailwindCSS:** A utility-first CSS framework for creating custom designs with minimal effort.
- **Flowbite React:** A collection of responsive UI components for React applications, enhancing the visual appeal and functionality of JOBHUNT-BOARD.
- **Prisma:** A modern data access toolkit for Node.js and TypeScript, simplifying database interactions and management.
- **PostgreSQL:** A powerful open-source relational database system used for storing and managing application data.
- **Serverless Neon:** A serverless deployment platform designed to optimize scalability and performance while minimizing operational overhead.

## Getting Started

To run JOBHUNT-BOARD locally and explore its features, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using your preferred package manager (e.g., npm or yarn).
3. Set up your PostgreSQL database and configure the connection settings in the application.
4. Define a `SESSIONS_SECRET` in your `.env` file.
5. Run the application using `npm run dev` for development mode or `npm run build` for production build.
6. Access the local instance of JOBHUNT-BOARD via your web browser.