# 🛒 QuickCart — Full Stack E-Commerce Web Application

A full-featured e-commerce web application for buying men's, women's, and kids' clothing. Includes an admin dashboard for managing products and orders, secure user authentication, and multiple payment options.

## ✨ Features

### 👤 User Side
- Browse and filter products by category (Men, Women, Kids)
- Filter products by type (Topwear, Bottomwear, Winterwear)
- Sort products by price: Low to High / High to Low
- Search products in real time
- Add products to cart with size selection
- Update cart quantity or remove items
- Place orders via **Cash on Delivery** or **Stripe** payment
- Track order status (Order Placed → Packing → Shipped → Out for Delivery → Delivered)
- View full order history
- Secure login and signup with JWT authentication
- Show/hide password toggle on login

### 🔐 Admin Dashboard
- Separate admin panel access (role-based)
- Add new products with image upload (Cloudinary)
- View all listed products with pagination
- Delete products with confirmation alert
- View all customer orders with pagination
- Update order status in real time

---

## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication & authorization |
| Cloudinary | Image upload & storage |
| Stripe | Payment gateway |
| Helmet | HTTP security headers |
| HPP | HTTP parameter pollution protection |
| CORS | Cross-origin resource sharing |
| XSS | Cross-site scripting sanitization |
| express-rate-limit | Brute force protection |
| Custom Mongo Sanitizer | NoSQL injection protection (Express 5 compatible) |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI library |
| React Router | Client-side routing |
| Context API | Global state management |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Axios | HTTP requests |
| React Toastify | Toast notifications |
| React Icons | Icon library |
| Stripe.js | Frontend payment integration |

---

## 📁 Project Structure

```
QuickCart/
├── client/                   # React frontend
│   ├── src/
│   │   ├── animation/        # Framer Motion components
│   │   ├── assets/           # Images, logos, SVGs
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # ShopContext (global state)
│   │   ├── helper/           # Utility/helper functions
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── PlaceOrder.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
└── server/                   # Node.js backend
    ├── src/
    │   ├── config/           # DB and Cloudinary config
    │   ├── controllers/      # Route controllers
    │   ├── middleware/       # Auth and security middleware
    │   ├── models/           # Mongoose models
    │   └── routes/           # API routes
    ├── app.js
    ├── server.js
    ├── .env
    └── package.json
```

---

## ⚙️ Environment Variables

### Backend `/server/.env`
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend `/client/.env`
```env
VITE_BACKEND_URL=http://localhost:4000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Stripe account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/quickcart.git
cd quickcart
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env   # Fill in your environment variables
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env   # Fill in your environment variables
npm run dev
```

### 4. Open in browser
```
Frontend: http://localhost:5173
Backend:  http://localhost:4000
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/register` | Register new user |
| POST | `/api/v1/login` | Login user |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/list-products` | Get all products |
| POST | `/api/v1/add-products` | Add product (Admin) |
| DELETE | `/api/v1/remove-products/:id` | Delete product (Admin) |

### Cart
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/get-cart` | Get user cart |
| POST | `/api/v1/update-cart` | Update cart item |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/user-order` | Get user orders |
| GET | `/api/v1/orders-list` | Get all orders (Admin) |
| POST | `/api/v1/update-status` | Update order status (Admin) |
| POST | `/api/v1/place-order` | Place COD order |
| POST | `/api/v1/stripe-payment` | Place Stripe order |

---

## 🛡️ Security

- JWT-based authentication with token stored in `localStorage`
- Role-based access control (Admin / User)
- HTTP security headers via `Helmet`
- NoSQL injection protection via custom sanitizer (Express 5 compatible)
- XSS protection via `xss` sanitizer on request body
- HTTP parameter pollution prevention via `HPP`
- Rate limiting — 500 requests per 15 minutes per IP
- CORS restricted to allowed origins only

---

## 📦 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway |
| Database | MongoDB Atlas |
| Images | Cloudinary |

---

## 🙋‍♂️ Author

**Mustafijur Rahman**
Full Stack Developer (MERN)

- GitHub: [@your-github](https://github.com/your-github)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)
- Fiverr: [your-fiverr](https://fiverr.com/your-fiverr)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).