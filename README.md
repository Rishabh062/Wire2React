# Wire2React - AI-Powered Wireframe to Code Converter

Wire2React is a cutting-edge web application that transforms wireframe designs into production-ready React code using advanced AI technology. Built with Next.js and modern web technologies, it provides a seamless experience for developers and designers to convert their wireframes into functional code.

## 🚀 Features

- **AI-Powered Conversion**: Convert wireframe images to React code using state-of-the-art AI models
- **Multiple AI Model Support**: Choose from various AI models for optimal conversion results
- **Real-time Preview**: See your converted code in action with live preview
- **User Authentication**: Secure login and registration system
- **Credit System**: Manage your AI conversion credits
- **Modern UI**: Clean, responsive design with smooth animations
- **Code Export**: Download your generated code in various formats

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Image Processing**: Cloudinary
- **AI Integration**: Multiple AI models for code generation
- **Animation**: Framer Motion
- **Icons**: Lucide Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm or yarn
- MongoDB
- Cloudinary account

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wire2react.git
cd wire2react
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_API_CLOUD_NAME=your_cloudinary_cloud_name
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
wire2react/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard pages
│   │   └── view-code/     # Code preview pages
│   ├── api/               # API routes
│   └── provider.tsx       # Auth provider
├── components/            # Reusable components
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔐 Authentication

The application uses NextAuth.js for authentication. Currently supported providers:
- Email/Password
- Google OAuth

## 🖼️ Image Upload

The application uses Cloudinary for image processing. To use the image upload feature:
1. Create a Cloudinary account
2. Set up your environment variables
3. Configure your upload preset in Cloudinary

## 🤖 AI Models

The application supports multiple AI models for code generation:
- GPT-4
- Claude
- Gemini
- Mistral

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn UI for the beautiful components
- All AI model providers
- The open-source community

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by Rishabh Dwivedi
