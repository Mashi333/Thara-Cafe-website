# Food Delivery App (MERN Stack)

A full-stack food ordering website built with React JS, MongoDB, Express, Node.js & Stripe.

## Features

### Customer Frontend
- Browse food items by category
- Add/remove items from cart
- User registration & login (JWT auth)
- Stripe payment integration
- Order tracking
- Responsive design

### Admin Panel
- Add new food items with image upload
- View all food items
- Remove food items
- View all orders
- Update order status (Food Processing → Out for delivery → Delivered)

### Backend API
- User authentication (register/login)
- Food item CRUD operations
- Cart management
- Order placement & tracking
- Stripe payment session creation

## Tech Stack

- **Frontend:** React.js, React Router, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Payments:** Stripe API
- **Auth:** JWT (JSON Web Tokens)

## Project Structure

```
├── backend/
│   ├── config/         # DB connection
│   ├── middleware/      # Auth middleware
│   ├── models/         # Mongoose models (User, Food, Order)
│   ├── routes/         # API routes (user, food, cart, order)
│   ├── uploads/        # Uploaded food images
│   ├── server.js       # Express server entry
│   └── .env            # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # Navbar, FoodItem, FoodDisplay, etc.
│   │   ├── context/    # StoreContext (state management)
│   │   ├── pages/      # Home, Cart, PlaceOrder, MyOrders, Verify
│   │   └── App.jsx     # Main app with routing
│   └── index.html
├── admin/
│   ├── src/
│   │   ├── components/ # Sidebar
│   │   └── pages/      # AddItem, ListItems, Orders
│   └── index.html
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Stripe account (for API keys)

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Configure Environment Variables
Edit `backend/.env`:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

### 3. Run the Apps (3 terminals)

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

**Terminal 3 - Admin:**
```bash
npm run dev:admin
```

### 4. Access the Apps
- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5174
- **API:** http://localhost:4000

## API Endpoints

### User
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login

### Food
- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add food item (with image upload)
- `POST /api/food/remove` - Remove food item

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/cart/get` - Get cart data

### Order
- `POST /api/order/place` - Place order & get Stripe checkout URL
- `POST /api/order/verify` - Verify payment
- `GET /api/order/userorders` - Get user's orders
- `GET /api/order/list` - Get all orders (admin)
- `POST /api/order/status` - Update order status (admin)

## Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test API keys from the Dashboard
3. Add `STRIPE_SECRET_KEY` to `backend/.env`
4. For the frontend, the Stripe checkout redirects are configured in the order route

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>
