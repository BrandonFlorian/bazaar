# Bazaar

Please note that this is currently a work in progress and is not production ready!

Welcome to Bazaar, a modern e-commerce application built with Next.js, Supabase, Prisma, and Mantine.

This project showcases a fast and responsive e-commerce platform, leveraging the latest technologies and best practices for web development.

## Features

- Server-rendered pages with Next.js 13 app directory
- User authentication and data storage with Supabase
- Database management using Prisma and PostgreSQL
- Payment processing via Circle (USDC)
- Modern and responsive UI with Mantine components
- Environment variables for easy configuration

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.16 or newer is recommended)
- [npm](https://www.npmjs.com/) package manager
- [Supabase CLI](https://supabase.io/docs/guides/cli) (optional, for local Supabase setup)

### Installation

1. Clone the repository:

- git clone https://github.com/BrandonFlorian/bazaar.git

- cd bazaar

2. Install the dependencies:

- npm install

3. Set up environment variables:

Create a `.env.local` file in the project root with the following variables:

- NEXT_PUBLIC_PRODUCTS_ENDPOINT=<your-products-endpoint>
- NEXT_PUBLIC_USERNAME_ENDPOINT=<your-user-endpoint>
- NEXT_PUBLIC_PROFILE_ENDPOINT=<your-profile-endpoint>
- NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
- SUPABASE_KEY=<your-supabase-key>
- SUPABASE_ID=<your-supabase-id>
- PROJECT_ID=<your-project-id>
- DATABASE_URL=<your-database-url>
- PROJECT_URL=<your-project-url>
- PUBLIC_KEY=<your-public-key>
- NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
- SUPABASE_ANON_KEY=<your-supabase-anon-key>
- NEXT_PUBLIC_IMAGE_HOSTNAME=<your-image-hostname>
- NEXT_PUBLIC_IMAGE_BUCKET=<your-image-bucket>
- CIRCLE_API_KEY=<your-circle-api-key>
- NEXT_PUBLIC_CIRCLE_API=<your-circle-api>

  Replace the placeholders with your actual values. These variables are necessary for connecting your application to your Supabase instance and database.

4. Run the development server:

- npm run dev

The application should now be running at `http://localhost:3000`.
