# NSUTExperienceX

A MERN stack blog application for NSUT students to share placement experiences and interview insights.

## 🚀 Features

- **User Authentication**: Sign up, sign in, and Google OAuth (NSUT email only)
- **Email Verification**: OTP-based email verification for secure registration
- **Domain Restriction**: Only @nsut.ac.in email addresses are allowed
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
- **Nodemailer** for email services
- **Crypto** for OTP generation

### External Services
- **Cloudinary** for image uploads
- **Firebase** for Google OAuth
- **MongoDB Atlas** for database
- **Gmail SMTP** for email delivery

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
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   CLIENT_URL=http://localhost:3000
   PORT=5000
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
   Navigate to `http://localhost:5000`

## 🔧 Environment Variables

### Backend (.env in root)
- `MONGO`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `EMAIL_USER`: Gmail address for sending emails
- `EMAIL_PASS`: Gmail app password (not regular password)
- `CLIENT_URL`: Frontend URL for email links
- `PORT`: Server port (default: 5000)

### Frontend (.env in client)
- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset

## 📱 Usage

1. **Sign up** with your NSUT email (@nsut.ac.in) - you'll receive an OTP
2. **Verify your email** by entering the 6-digit OTP sent to your email
3. **Sign in** with your verified email and password
4. **Create posts** about your placement experiences
5. **Share insights** about interview rounds, technical questions, and tips
6. **Read posts** from other students
7. **Admin users** can manage all posts

## 🔒 Security Features

- **Email Domain Restriction**: Only @nsut.ac.in email addresses can register and login
- **Email Verification**: OTP-based verification ensures real email ownership
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-based Access**: Admin and user roles with appropriate permissions
- **OTP Expiration**: Verification codes expire after 10 minutes
- **Rate Limiting**: Prevents OTP spam with cooldown periods

## 📧 Email Setup

To enable email verification, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Use the app password** in your `EMAIL_PASS` environment variable

## 📄 License

This project is licensed under the ISC License.
" "   
