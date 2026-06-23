# 🛍️ Store System

A modern, full-stack e-commerce platform built with cutting-edge web technologies. This comprehensive system demonstrates proficiency in both frontend and backend development, with a focus on secure authentication, efficient data management, and responsive user experience.

---

## 📋 About

The **Store System** is a complete e-commerce solution designed to streamline product management and shopping experiences. The platform enables users to browse products, manage their shopping baskets, and seamlessly complete transactions through a secure, JWT-based authentication system. Built with scalability and performance in mind, this project showcases best practices in full-stack development and modern software architecture.

**Core Purpose:** Provide a robust, user-friendly platform for managing products and customer orders with enterprise-grade security and data persistence.

---
## 📸 Project Showcase

| Home Page | Product Catalog | Shopping Basket |
| :---: | :---: | :---: |
| ![Home](Screenshot/home.png) | ![Products](Screenshot/products.png) | ![Basket](Screenshot/basket.png) |
| *Intuitive Landing Page* | *Browse & Filter Products* | *Real-time Cart Management* |

**Admin Features:**
* **Add Products:** Manage inventory with our streamlined form:
  ![Add Product](Screenshot/admin_add.png)
* **Product Management:** Edit or delete products directly:
  ![Edit Products](Screenshot/admin_edit.png)
* **Secure Authentication:** JWT-based login interface:
  ![Login Screen](Screenshot/login.png)

## 🛠️ Key Technologies

### Frontend
- **React** 19.1.0 - Modern UI library with hooks and functional components
- **Redux Toolkit** 2.8.2 - Centralized state management for predictable data flow
- **React Router DOM** 7.6.3 - Client-side routing and navigation
- **PrimeReact** 10.9.6 - Enterprise-grade UI component library
- **JWT-decode** 4.0.0 - Secure token authentication
- **Emoji Picker React** - Rich user interaction features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** 5.1.0 - Minimalist web framework for API routing
- **MongoDB + Mongoose** 8.15.1 - NoSQL database with ODM layer for data modeling
- **JWT (jsonwebtoken)** 9.0.2 - Token-based authentication
- **Bcrypt** 6.0.0 - Password hashing and security
- **CORS** 2.8.5 - Cross-origin resource sharing configuration

### Development Tools
- **Nodemon** 3.1.10 - Hot-reloading for development efficiency

---

## ✨ Key Features

### Authentication & Security
- ✅ User registration with email validation
- ✅ Secure login with JWT token generation
- ✅ Password encryption using bcrypt (industry-standard hashing)
- ✅ Protected API routes with middleware-based verification
- ✅ Token refresh mechanisms

### Product Management
- ✅ Browse and display product catalog
- ✅ Create, read, update, and delete products (full CRUD operations)
- ✅ Product search and filtering capabilities
- ✅ Dynamic product categorization

### Shopping Cart & Orders
- ✅ Real-time basket management
- ✅ Add, remove, and update cart items
- ✅ Persistent cart storage with database integration
- ✅ Order tracking and history

### User Experience
- ✅ Responsive, mobile-friendly design with PrimeReact components
- ✅ Intuitive navigation with React Router
- ✅ Clean, professional UI with consistent styling
- ✅ Interactive features (emoji picker integration)

---

## 🔧 Technical Challenges & Solutions

### 1. **Secure Authentication Architecture**
Implemented a robust JWT-based authentication system with token verification middleware. This ensures secure communication between client and server while maintaining statelessness for scalability.

### 2. **State Management Complexity**
Leveraged Redux Toolkit to centralize application state, eliminating prop-drilling and ensuring predictable data flow across complex component hierarchies. Implemented async thunks for API calls.

### 3. **Database Relationships & Schema Design**
Designed normalized MongoDB schemas with Mongoose for users, products, and baskets with proper indexing and validation rules to ensure data integrity.

### 4. **Cross-Origin Resource Sharing (CORS)**
Configured CORS policies to safely allow communication between frontend and backend running on different ports during development and production.

### 5. **Password Security**
Implemented bcrypt hashing with salt rounds for secure password storage, ensuring user credentials are never stored in plaintext.

---

## 🚀 How to Run

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local or MongoDB Atlas connection string)
- **Git**

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/H-308/Store_system.git
cd store-system
```

#### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create a .env file with the following variables
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000

# Start the development server
npm run dev
# OR for production
npm start
```

The backend will run on **http://localhost:5000**

#### 3. Frontend Setup
```bash
cd ../client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will automatically open at **http://localhost:3000**

#### 4. Environment Variables (.env)

**Server (.env)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/store-system
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

**Client (.env - optional)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📁 Project Structure

```
store-system/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── features/               # Feature-specific logic
│   │   │   ├── auth/              # Authentication (login, register)
│   │   │   ├── product/           # Product management
│   │   │   └── basket/            # Shopping cart
│   │   ├── app/                   # Redux store configuration
│   │   └── index.js
│   └── package.json
│
└── server/                          # Express Backend
    ├── controllers/                # Business logic
    ├── models/                     # MongoDB schemas
    ├── routers/                    # API routes
    ├── middleware/                 # Custom middleware (JWT verification)
    ├── config/                     # Configuration files
    ├── server.js
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login and token generation

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Basket
- `GET /api/basket` - Retrieve user's basket
- `POST /api/basket/add` - Add item to basket
- `PUT /api/basket/:id` - Update basket item
- `DELETE /api/basket/:id` - Remove item from basket

---

## 🧪 Testing

```bash
# Frontend tests
cd client
npm test

# Backend can be tested using Postman or API clients
```

---

## 📚 Learning Outcomes & Skills Demonstrated

- ✔️ Full-stack development with modern JavaScript frameworks
- ✔️ RESTful API design and implementation
- ✔️ Authentication and authorization patterns
- ✔️ NoSQL database design and optimization
- ✔️ State management in complex applications
- ✔️ Security best practices (password hashing, JWT, CORS)
- ✔️ Responsive UI/UX development
- ✔️ Component-based architecture

---

## 🎯 Future Enhancements

- 📦 Payment gateway integration (Stripe/PayPal)
- 📊 Admin dashboard with analytics
- 📧 Email notifications for orders
- 🔍 Advanced search and filtering
- ⭐ Product reviews and ratings
- 📱 Native mobile app with React Native

---

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

