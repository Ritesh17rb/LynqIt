# LynQt - Multi-Vendor Ecommerce Platform

## Introduction

LynQt is a comprehensive multi-vendor ecommerce platform designed to connect customers, shop owners, and delivery personnel in a seamless online shopping experience. The platform supports real-time interactions, location-based services, secure payments, and role-based access control. Users can browse products, place orders, and track deliveries, while shop owners manage their inventories and orders, and delivery boys handle logistics.

The application is segregated into three primary views:
- **User View**: For customers to browse, shop, and track orders.
- **Owner View**: For shop owners to manage their shops, items, and orders.
- **Delivery Boy View**: For delivery personnel to accept assignments and deliver orders.

LynQt leverages modern web technologies to ensure scalability, real-time updates, and a responsive user interface.

## Features

### Core Features
- **Multi-Role Authentication**: Secure login/signup with role-based access (User, Owner, Delivery Boy) using JWT tokens and Firebase authentication.
- **Location-Based Services**: Users and delivery boys can update and share locations using geolocation APIs and Leaflet maps.
- **Real-Time Communication**: Socket.io integration for live updates on order status, delivery tracking, and notifications.
- **Payment Integration**: Razorpay for online payments, with support for Cash on Delivery (COD).
- **Image Management**: Cloudinary for uploading and managing product/shop images.
- **Email Notifications**: Nodemailer for OTP verification, password resets, and order confirmations.
- **Cart and Checkout**: Persistent cart with item quantity management and secure checkout process.
- **Order Tracking**: Real-time order status updates and delivery tracking with OTP verification for secure handoffs.
- **Rating System**: Users can rate products, influencing average ratings.
- **Search and Filtering**: Browse items by category, shop, or location.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS.

### User-Specific Features
- Browse shops and items by city/location.
- Add items to cart, manage quantities.
- Place orders with multiple payment options.
- View order history and track deliveries in real-time.
- Receive notifications for order updates.

### Owner-Specific Features
- Create and manage shops with location details.
- Add, edit, and delete items with categories, prices, sizes, colors, and descriptions.
- View and manage orders from their shops.
- Track order preparation and delivery status.
- Dashboard for analytics (implied via components like OwnerDashboard).

### Delivery Boy-Specific Features
- Receive broadcasted delivery assignments.
- Accept or reject assignments.
- Track delivery routes and update status.
- Generate and verify OTP for order delivery.
- Real-time location sharing for tracking.

### Additional Features
- **OTP Verification**: For account verification and delivery confirmation.
- **Forgot Password**: Secure password reset via email.
- **Data Isolation**: Owners can only access their own shops and items.
- **Scalable Architecture**: Modular backend with controllers, routes, and models.
- **Environment Configuration**: Secure handling of sensitive data via environment variables.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcryptjs for password hashing
- **Real-Time**: Socket.io
- **Payments**: Razorpay
- **File Uploads**: Multer and Cloudinary
- **Email**: Nodemailer
- **Other Libraries**: Cors, Cookie-Parser, Dotenv

### Frontend
- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Maps**: Leaflet and React-Leaflet
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Charts**: Recharts (for potential analytics)
- **Loaders**: React Spinners
- **Real-Time**: Socket.io Client

### Database Models

#### User Model
- **Fields**: fullName, email, password, mobile, role (user/owner/deliveryBoy), resetOtp, isOtpVerified, otpExpires, socketId, isOnline, location (GeoJSON Point)
- **Indexes**: 2dsphere on location for geospatial queries
- **Purpose**: Manages user accounts, roles, and real-time presence.

#### Shop Model
- **Fields**: name, image, owner (ref User), city, state, address, items (array of ref Item)
- **Purpose**: Represents vendor shops with location and item listings.

#### Item Model
- **Fields**: name, image, shop (ref Shop), category (enum: Clothing, Footwear, etc.), price, brand, size (array), color, description, rating (average, count)
- **Purpose**: Product catalog with detailed attributes and ratings.

#### Order Model
- **Fields**: user (ref User), paymentMethod (cod/online), deliveryAddress (text, lat, lng), totalAmount, shopOrders (array of sub-documents), payment (boolean), razorpayOrderId, razorpayPaymentId
- **Sub-Schemas**:
  - shopOrderItem: item (ref Item), name, price, quantity
  - shopOrder: shop (ref Shop), owner (ref User), subtotal, shopOrderItems, status (pending/preparing/out of delivery/delivered), assignment (ref DeliveryAssignment), assignedDeliveryBoy (ref User), deliveryOtp, otpExpires, deliveredAt
- **Purpose**: Handles complex multi-shop orders with status tracking and delivery assignments.

#### DeliveryAssignment Model
- **Fields**: order (ref Order), shop (ref Shop), shopOrderId, broadcastedTo (array of ref User), assignedTo (ref User), status (broadcasted/assigned/completed), acceptedAt
- **Purpose**: Manages delivery assignments broadcasted to delivery boys.

## Project Structure

```
LynQt/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controllers.js   # Authentication logic
│   │   ├── item.controllers.js   # Item CRUD with ownership checks
│   │   ├── order.controllers.js  # Order management
│   │   ├── shop.controllers.js   # Shop management
│   │   └── user.controllers.js   # User profile updates
│   ├── middlewares/
│   │   ├── isAuth.js             # JWT authentication middleware
│   │   └── multer.js             # File upload middleware
│   ├── models/
│   │   ├── deliveryAssignment.model.js
│   │   ├── item.model.js
│   │   ├── order.model.js
│   │   ├── shop.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── item.routes.js
│   │   ├── order.routes.js
│   │   ├── shop.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── cloudinary.js         # Image upload utility
│   │   ├── mail.js               # Email sending utility
│   │   └── token.js              # JWT token utilities
│   ├── socket.js                 # Socket.io event handlers
│   ├── index.js                  # Main server file
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Static images
│   │   ├── components/
│   │   │   ├── CartItemCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── DeliveryBoy.jsx
│   │   │   ├── DeliveryBoyTracking.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── OwnerItemCard.jsx
│   │   │   ├── OwnerOrderCard.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── UserOrderCard.jsx
│   │   ├── hooks/
│   │   │   ├── useGetCity.jsx
│   │   │   ├── useGetCurrentUser.jsx
│   │   │   ├── useGetItemsByCity.jsx
│   │   │   ├── useGetMyOrders.jsx
│   │   │   ├── useGetMyShop.jsx
│   │   │   ├── useGetShopByCity.jsx
│   │   │   └── useUpdateLocation.jsx
│   │   ├── pages/
│   │   │   ├── AddItem.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckOut.jsx
│   │   │   ├── CreateEditShop.jsx
│   │   │   ├── EditItem.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── OrderPlaced.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── TrackOrderPage.jsx
│   │   ├── redux/
│   │   │   ├── mapSlice.js
│   │   │   ├── ownerSlice.js
│   │   │   ├── store.js
│   │   │   └── userSlice.js
│   │   ├── App.jsx
│   │   ├── category.js            # Category data with images
│   │   ├── firebase.js            # Firebase config
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
├── TODO.md                        # Task tracking
├── TODO_delivery_fixes.md         # Additional tasks
└── README.md                      # This file
```

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- Firebase project for authentication
- Razorpay account for payments
- Cloudinary account for image storage

### Backend Setup
1. Navigate to `backend/` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to `frontend/` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   VITE_FIREBASE_APIKEY=your_firebase_api_key
   ```
4. Start the dev server: `npm run dev`

### Usage

#### User View
1. Sign up/sign in as a user.
2. Browse categories and shops on the home page.
3. View shop details and add items to cart.
4. Proceed to checkout, select payment method.
5. Track orders in "My Orders" and use real-time tracking.

#### Owner View
1. Sign up/sign in as an owner.
2. Create or edit your shop.
3. Add/edit items with details.
4. Manage orders: update status from pending to delivered.
5. View dashboard for shop performance.

#### Delivery Boy View
1. Sign up/sign in as a delivery boy.
2. Receive delivery assignments via broadcasts.
3. Accept assignments and track routes.
4. Update order status and generate/verify OTP for delivery.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/forgot-password` - Password reset

### User
- `PUT /api/user/update-location` - Update user location

### Shop
- `POST /api/shop/create` - Create shop
- `GET /api/shop/my-shop` - Get owner's shop
- `GET /api/shop/by-city/:city` - Get shops by city

### Item
- `POST /api/item/add` - Add item (owner only)
- `PUT /api/item/edit/:id` - Edit item (owner only)
- `DELETE /api/item/delete/:id` - Delete item (owner only)
- `GET /api/item/by-city/:city` - Get items by city
- `GET /api/item/:id` - Get item details

### Order
- `POST /api/order/create` - Create order
- `GET /api/order/my-orders` - Get user's orders
- `PUT /api/order/update-status` - Update order status
- `POST /api/order/assign-delivery` - Assign delivery
- `POST /api/order/verify-delivery-otp` - Verify delivery OTP

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request.

## License

ISC License

## Contact

For questions or support, contact the development team at [your-email@example.com].
