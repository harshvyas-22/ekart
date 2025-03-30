# eKart

eKart is a full-stack e-commerce application built with modern technologies like Node.js, Express, MongoDB, and React. It supports product management, image uploads, and a responsive design with dark mode.

## Features

- **User Management**: Authentication and authorization.
- **Product Management**: Create, edit, delete, and list products.
- **Image Uploads**: Upload product images using Multer and Cloudinary.
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsiveness.
- **Dark Mode**: Toggle between light and dark themes.
- **Notifications**: Toast notifications for user feedback.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime.
- **Express**: Web framework.
- **MongoDB**: NoSQL database.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud-based image hosting.

### Frontend

- **React**: Component-based UI library.
- **Zustand**: State management.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vite**: Fast build tool.

### Deployment

- **Render**: Hosting platform for backend and frontend.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account for the database.
- Cloudinary account for image hosting.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/ekart.git
   cd ekart
   ```

2. Install dependencies:

   ```sh
   npm install
   cd frontend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=<your_mongo_uri>
   PORT=3000
   CLOUDINARY_URL=<your_cloudinary_url>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```

### Running the Application

1. Start the backend server:

   ```sh
   npm run dev
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

### Build for Production

To build the frontend for production:

```sh
cd frontend
npm run build
```

The production build will be available in the `frontend/dist` directory.

### Deployment

The application is configured for deployment on Render. Ensure the `.env` file is properly set up on the hosting platform.

## Image Uploads

- **Multer**: Handles file uploads in the backend.
- **Cloudinary**: Stores and serves uploaded images.

## Screenshots

- **Product List**: View all products with options to edit or delete.
- **Add Product**: Create a new product with an image upload.
- **Edit Product**: Update product details.
- **Dark Mode**: Toggle between light and dark themes.

## License

This project is licensed under the MIT License.
