# NSUTExperienceX

A MERN stack blog application for NSUT students to share placement experiences and interview insights.

## 🚀 Features

- **User Authentication**: Sign up, sign in, and Google OAuth
- **Blog Posts**: Create, read, update, and delete blog posts
- **Image Upload**: Cloudinary integration for image uploads
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Redux state management
- **Admin Panel**: Admin-only post creation and management

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Flowbite React** for UI components
- **React Router** for navigation
- **React Quill** for rich text editing

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **cookie-parser** for cookie handling

### External Services
- **Cloudinary** for image uploads
- **Firebase** for Google OAuth
- **MongoDB Atlas** for database

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NSUTExperienceX.git
   cd NSUTExperienceX
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Set up environment variables**
   
   Create `.env` file in root directory:
   ```env
   MONGO=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   
   Create `.env` file in client directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env in root)
- `MONGO`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend (.env in client)
- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset

## 📱 Usage

1. **Sign up** with your email or use Google OAuth
2. **Create posts** about your placement experiences
3. **Share insights** about interview rounds, technical questions, and tips
4. **Read posts** from other students
5. **Admin users** can manage all posts

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- NSUT students for sharing their experiences
- Open source community for amazing tools
- Cloudinary and Firebase for free tiers
