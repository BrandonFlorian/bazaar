# Bazaar

Please note that this is currently a work in progress and is not production ready!

Welcome to Bazaar, a modern e-commerce application built with Next.js, Supabase, Prisma, and Mantine.

This project showcases a fast and responsive e-commerce platform, leveraging the latest technologies and best practices for web development.

## Features

- Server-rendered pages with Next.js
- User authentication and data storage with Supabase
- Database management using Prisma and PostgreSQL
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

- NEXT_PUBLIC_PRODUCTS_ENDPOINT=<your_products_endpoint>
- DATABASE_URL=<your_database_url>
- PROJECT_URL=<your_project_url>
- PUBLIC_KEY=<your_public_key>
- NEXT_PUBLIC_IMAGE_HOSTNAME=<your_image_bucket>

Replace the placeholders with your actual values. These variables are necessary for connecting your application to your Supabase instance and database.

4. Run the development server:

- npm run dev

The application should now be running at `http://localhost:3000`.
