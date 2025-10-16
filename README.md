# LynQt - Multi-Vendor Ecommerce Platform

## Introduction

LynQt is a comprehensive multi-vendor ecommerce platform designed to connect customers, shop owners, and delivery personnel in a seamless online shopping experience. The platform supports real-time interactions, location-based services, secure payments, and role-based access control. Users can browse products, place orders, and track deliveries, while shop owners manage their inventories and orders, and delivery boys handle logistics.

The application is segregated into three primary views:
- **User View**: For customers to browse, shop, and track orders.
- **Owner View**: For shop owners to manage their shops, items, and orders.
- **Delivery Boy View**: For delivery personnel to accept assignments and deliver orders.

LynQt leverages modern web technologies to ensure scalability, real-time updates, and a responsive user interface.

## Overall App Structure and Workflow
![deepseek_mermaid_20251016_87d9d1](https://github.com/user-attachments/assets/d6ba17d5-dceb-400c-8fc0-a62f7780ab6a)


### Core Entities and Relationships
- **Users**: Three roles - User (customer), Owner (shop owner), Delivery Boy (delivery personnel)
- **Shops**: Owned by Owners, contain Items, located in specific cities
- **Items**: Products listed by Owners in their Shops, categorized and rated by Users
- **Orders**: Multi-shop orders placed by Users, split into ShopOrders for each shop
- **DeliveryAssignments**: Broadcasted to nearby Delivery Boys for order fulfillment

### Workflow Overview

#### User Registration and Authentication
1. Users register with role selection (user/owner/deliveryBoy)
2. JWT-based authentication with secure cookies
3. Firebase integration for additional auth methods
4. OTP verification for password resets

#### Shop and Item Management (Owner)
1. Owners create/edit shops with location details
2. Add/edit/delete items with categories, prices, images, etc.
3. Manage inventory and view orders

#### Shopping and Ordering (User)
1. Users browse shops/items by city/location
2. Add items to cart, manage quantities
3. Place orders with payment (COD/Online via Razorpay)
4. Track order status in real-time

#### Order Fulfillment
1. Owners receive new orders via real-time notifications
2. Update order status: pending → preparing → out of delivery
3. When "out of delivery", system broadcasts to nearby Delivery Boys
4. Delivery Boys accept assignments, track routes, deliver with OTP verification

#### Delivery Process
1. Delivery Boys receive assignment broadcasts
2. Accept assignments (first-come-first-served)
3. Update location in real-time for customer tracking
4. Generate and verify OTP for secure delivery handoff
5. Mark orders as delivered, receive statistics

### Real-Time Features
- Order status updates broadcast to Users and Owners
- Delivery location sharing for live tracking
- Assignment broadcasts to Delivery Boys
- Presence tracking (online/offline status)

### Location-Based Services
- Geospatial queries for finding nearby shops/items
- Delivery Boy assignment based on proximity (5km radius)
- Real-time location updates for tracking
- Map visualization using Leaflet

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

## Detailed API Descriptions

### Authentication APIs
- `POST /api/auth/signup` - Registers new users with role selection (user/owner/deliveryBoy). Validates input, hashes password, generates JWT token.
- `POST /api/auth/signin` - Authenticates users, compares hashed passwords, issues JWT token.
- `GET /api/auth/signout` - Clears authentication cookies.
- `POST /api/auth/send-otp` - Sends OTP to email for password reset.
- `POST /api/auth/verify-otp` - Verifies OTP and allows password reset.
- `POST /api/auth/reset-password` - Resets password after OTP verification.
- `POST /api/auth/google-auth` - Handles Google OAuth authentication.

### User APIs
- `GET /api/user/current` - Retrieves current authenticated user details.
- `POST /api/user/update-location` - Updates user's location coordinates for geospatial queries.
- `PUT /api/user/update` - Updates user profile information.
- `DELETE /api/user/deactivate` - Deactivates user account.

### Shop APIs
- `POST /api/shop/create-edit` - Creates or updates shop with image upload (owner only).
- `GET /api/shop/my-shop` - Retrieves shop owned by current user (owner only).
- `GET /api/shop/by-city/:city` - Fetches all shops in specified city with geospatial filtering.

### Item APIs
- `POST /api/item/add-item` - Adds new item to shop with image upload (owner only).
- `POST /api/item/edit-item/:itemId` - Updates existing item details (owner only).
- `GET /api/item/delete/:itemId` - Deletes item from shop (owner only).
- `GET /api/item/by-city/:city` - Retrieves items available in specified city.
- `GET /api/item/:id` - Fetches detailed item information.
- `GET /api/item/get-by-shop/:shopId` - Gets all items for a specific shop.
- `GET /api/item/search-items` - Searches items by query parameters.
- `POST /api/item/rating` - Allows users to rate items.

### Order APIs
- `POST /api/order/place-order` - Creates multi-shop order, groups items by shop, handles payment creation.
- `POST /api/order/verify-payment` - Verifies Razorpay payment and updates order status.
- `GET /api/order/my-orders` - Retrieves orders based on user role (user/owner/deliveryBoy).
- `GET /api/order/get-assignments` - Fetches delivery assignments for delivery boys.
- `GET /api/order/get-current-order` - Gets current active order for delivery boy.
- `POST /api/order/send-delivery-otp` - Generates and sends OTP for delivery verification.
- `POST /api/order/mark-as-delivered` - Marks order as delivered after OTP verification.
- `POST /api/order/update-status/:orderId/:shopId` - Updates order status (owner only), triggers delivery assignment when "out of delivery".
- `POST /api/order/cancel-order/:orderId/:shopId` - Cancels order if in cancellable state.
- `GET /api/order/accept-order/:assignmentId` - Delivery boy accepts assignment.
- `GET /api/order/get-order-by-id/:orderId` - Retrieves detailed order information.
- `GET /api/order/get-today-deliveries` - Gets delivery statistics for current day (delivery boy only).

## How MAP (Leaflet) is Used for Location Services and Tracking

### Location-Based Services Implementation
- **Geolocation API Integration**: Frontend uses browser geolocation API to get user coordinates, stored in Redux state (mapSlice).
- **Leaflet Map Rendering**: React-Leaflet components render interactive maps with custom markers (scooter for delivery boys, home for customers).
- **Geospatial Queries**: MongoDB 2dsphere indexes enable proximity searches for shops/items within city boundaries.
- **Real-Time Location Updates**: Delivery boys emit location updates via Socket.io, stored as GeoJSON Points in User model.

### Map Features in Components
- **DeliveryBoyTracking.jsx**: Displays live delivery tracking with:
  - Delivery boy marker (scooter icon) showing real-time position
  - Customer location marker (home icon) at delivery address
  - Polyline connecting delivery boy to customer for route visualization
  - Auto-centering and zoom based on positions
- **TrackOrderPage.jsx**: Integrates DeliveryBoyTracking for order tracking, receives live location updates via Socket.io.

### Location Workflow
1. Users update location on app load via `useUpdateLocation` hook
2. Location stored in Redux and sent to backend via `/api/user/update-location`
3. Delivery boys continuously update location via Socket.io `updateLocation` event
4. Frontend receives `updateDeliveryLocation` events to update map markers in real-time

## How Socket Real-Time Communication Works

### Socket.io Architecture
- **Server Setup**: Express server creates HTTP server, initializes Socket.io with CORS for frontend (localhost:5173).
- **Client Setup**: React app connects to Socket.io server with credentials, emits `identity` event with userId on connect.
- **Event Handling**: Backend `socket.js` handles connection, identity, updateLocation, and disconnect events.

### Real-Time Features Implementation

#### Order Status Updates
- **Owner Updates Status**: When owner calls `updateOrderStatus`, backend emits `update-status` to customer's socketId.
- **Broadcast to Owners**: New orders emit `newOrder` to shop owner's socketId.
- **Frontend Redux**: `updateRealtimeOrderStatus` reducer updates order status in state for immediate UI updates.

#### Delivery Tracking
- **Location Sharing**: Delivery boys emit `updateLocation` with coordinates, backend finds assigned orders and emits `updateDeliveryLocation` to customers.
- **Assignment Broadcasts**: When order status becomes "out of delivery", system broadcasts `newAssignment` to nearby delivery boys' socketIds.

#### Presence Tracking
- **Online Status**: Socket connection updates User model `socketId` and `isOnline` fields.
- **Disconnect Handling**: On disconnect, clears socketId and sets isOnline to false.

### Socket Events Flow
1. **Connection**: Client connects, emits `identity` with userId
2. **Location Updates**: Delivery boys emit `updateLocation` periodically
3. **Order Events**: Status changes trigger targeted emits to relevant users
4. **Assignment Events**: New assignments broadcast to available delivery boys
5. **Disconnect**: Cleanup on socket disconnect

## App Architecture

### Backend Architecture
- **Layered Architecture**: Routes → Controllers → Models/Services
- **Modular Structure**: Separate folders for controllers, models, routes, middlewares, utils
- **Authentication Middleware**: `isAuth.js` validates JWT tokens, attaches userId to req
- **Error Handling**: Global error handler with custom AppError classes, logging with Winston
- **Validation**: Joi schemas in `utils/validation/` for input sanitization
- **File Upload**: Multer middleware with Cloudinary integration for image handling

### Frontend Architecture
- **Component-Based**: React functional components with hooks
- **State Management**: Redux Toolkit with slices for user, owner, map state
- **Routing**: React Router with protected routes based on authentication
- **Custom Hooks**: Data fetching hooks (useGetCurrentUser, useGetMyOrders, etc.) using Axios
- **Real-Time Integration**: Socket.io client for live updates, integrated with Redux
- **Styling**: Tailwind CSS with dark mode support via Redux theme state

### Data Flow
- **API Calls**: Axios interceptors handle auth headers, responses update Redux state
- **Real-Time Updates**: Socket events dispatch Redux actions for immediate UI updates
- **Location Services**: Geolocation API → Redux → API calls → Database updates → Socket broadcasts

## Validation Mechanisms

### Backend Validation
- **Joi Schemas**: Comprehensive validation in `utils/validation/` for all API inputs
  - `auth.validation.js`: Signup/signin/reset password schemas
  - `item.validation.js`: Item creation/update validation
  - `order.validation.js`: Order placement validation
  - `shop.validation.js`: Shop creation validation
- **Middleware Integration**: `validate.js` utility applies schemas to route handlers
- **Error Responses**: Validation errors return 400 status with detailed messages

### Frontend Validation
- **Form Libraries**: Likely using react-hook-form with validation schemas
- **Real-Time Feedback**: Input validation on blur/change events
- **API Error Handling**: Toast notifications for backend validation errors

### Security Validation
- **JWT Verification**: All protected routes validate tokens
- **Role-Based Access**: Controllers check user roles for authorization
- **Ownership Checks**: Owners can only modify their own shops/items
- **OTP Validation**: Time-limited OTPs for password reset and delivery verification

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request.

## License

ISC License

## Contact

For questions or support, contact the development team at [ritesh17lifeamazing@gmail.com].
