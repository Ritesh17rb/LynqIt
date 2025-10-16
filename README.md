# LynQt - Multi-Vendor Ecommerce Platform
![1000262589](https://github.com/user-attachments/assets/dca8918a-7711-45a8-84ff-be79b067f06a)



#  Team 
## Nishant
## Adil
## Prathmesh
## Ritesh




## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Overall App Structure and Workflow](#overall-app-structure-and-workflow)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Models](#database-models)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Detailed API Descriptions](#detailed-api-descriptions)
- [How MAP (Leaflet) is Used for Location Services and Tracking](#how-map-leaflet-is-used-for-location-services-and-tracking)
- [How Socket Real-Time Communication Works](#how-socket-real-time-communication-works)
- [App Architecture](#app-architecture)
- [Validation Mechanisms](#validation-mechanisms)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

LynQt is a comprehensive multi-vendor ecommerce platform designed to connect customers, shop owners, and delivery personnel in a seamless online shopping experience. The platform supports real-time interactions, location-based services, secure payments, and role-based access control. Users can browse products, place orders, and track deliveries, while shop owners manage their inventories and orders, and delivery boys handle logistics.

The application is segregated into three primary views:
- **User View**: For customers to browse, shop, and track orders.
- **Owner View**: For shop owners to manage their shops, items, and orders.
- **Delivery Boy View**: For delivery personnel to accept assignments and deliver orders.

LynQt leverages modern web technologies to ensure scalability, real-time updates, and a responsive user interface.

## Technologies Used

### Backend Technologies
- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web application framework for building RESTful APIs and handling HTTP requests.
- **MongoDB**: NoSQL database for storing application data with flexible schema.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, providing schema validation and data modeling.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization by generating and verifying tokens.
- **bcryptjs**: Library for hashing passwords to ensure secure storage.
- **Socket.io**: Enables real-time, bidirectional communication between client and server for features like live updates and notifications.
- **Razorpay**: Payment gateway integration for handling online payments securely.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **Cloudinary**: Cloud-based service for image and video management, including uploads, transformations, and storage.
- **Nodemailer**: Module for sending emails, used for OTP verification and notifications.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing for API requests from different domains.
- **Cookie-Parser**: Middleware to parse cookies attached to client requests.
- **Dotenv**: Loads environment variables from a .env file for configuration management.
- **Winston**: Logging library for handling application logs (error and combined logs).
- **Joi**: Schema validation library for validating API inputs and ensuring data integrity.

### Frontend Technologies
- **React 19**: JavaScript library for building user interfaces with components and hooks.
- **Vite**: Build tool and development server for fast frontend development and bundling.
- **Redux Toolkit**: State management library for predictable state updates and global state handling.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and responsive design.
- **React Router DOM**: Library for declarative routing in React applications.
- **Leaflet**: Open-source JavaScript library for interactive maps.
- **React-Leaflet**: React components for Leaflet maps integration.
- **Firebase Auth**: Authentication service for handling user sign-in methods like Google OAuth.
- **Axios**: HTTP client for making API requests to the backend.
- **React Icons**: Library providing popular icons as React components.
- **Recharts**: Composable charting library for data visualization (used for potential analytics).
- **React Spinners**: Collection of loading spinners for better user experience during async operations.
- **Socket.io Client**: Client-side library for real-time communication with the server.
- **React Hook Form**: Forms library for efficient form handling and validation (implied in validation schemas).
- **Yup**: Schema validation library for form validation on the frontend (used in auth.schema.js and forms.schema.js).

### Other Technologies
- **Docker**: Containerization platform for packaging applications and their dependencies.
- **Nginx**: Web server used as a reverse proxy and for serving static files in production.
- **MongoDB Atlas**: Cloud-hosted MongoDB service for database management.
- **Git**: Version control system for tracking changes and collaboration.

## Overall App Structure and Workflow
![deepseek_mermaid_20251016_87d9d1](https://github.com/user-attachments/assets/d6ba17d5-dceb-400c-8fc0-a62f7780ab6a)


### Core Entities and Relationships
- **Users**: Three roles - User (customer), Owner (shop owner), Delivery Boy (delivery personnel)
- **Shops**: Owned by Owners, contain Items, located in specific cities
- **Items**: Products listed by Owners in their Shops, categorized and rated by Users
- **Orders**: Multi-shop orders placed by Users, split into ShopOrders for each shop
- **DeliveryAssignments**: Broadcasted to nearby Delivery Boys for order fulfillment
![1000262585](https://github.com/user-attachments/assets/8cdeff90-7983-4b0b-a80f-d41e1e3ce435)

### Workflow Overview

![deepseek_mermaid_20251016_c797ba](https://github.com/user-attachments/assets/b5729ba4-8ca0-42a1-85d4-93ec8874ca8a)

![deepseek_mermaid_20251016_87d9d1](https://github.com/user-attachments/assets/35c43fd6-3a95-4d20-b5c6-08401e489a84)

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

### Order Fulfillment Entity Flow
![1000262587](https://github.com/user-attachments/assets/54f7eaf8-c44c-42d0-b96e-d79444bfe4d7)


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

### Location Acquisition and Handling
- **Geolocation API Usage**: The app uses the browser's `navigator.geolocation` API to obtain user coordinates. Two primary methods are employed:
  - `getCurrentPosition()`: Used in `useGetCity.jsx` hook for one-time location retrieval to determine city, state, and address via reverse geocoding (Geoapify API). This data is stored in Redux (userSlice) and used for filtering shops/items by location.
  - `watchPosition()`: Implemented in `useUpdateLocation.jsx` hook for continuous location tracking. It updates user location every 30 seconds (maximumAge: 30000ms) with high accuracy enabled. Delivery boys are excluded from this hook as they use Socket.io for real-time updates instead.
- **Location Storage**: Coordinates are stored as GeoJSON Point type in MongoDB User model with 2dsphere indexing for efficient geospatial queries (e.g., finding nearby delivery boys within 5km radius).
- **Reverse Geocoding**: Location coordinates are converted to human-readable addresses using Geoapify API, which requires an API key stored in environment variables.

### Leaflet Map Rendering and Features
- **React-Leaflet Integration**: Maps are rendered using React-Leaflet components with OpenStreetMap tiles.
- **Custom Markers**: Delivery boys use a scooter icon, customers use a home icon, created via Leaflet Icon class with specified size and anchor points.
- **Interactive Elements**: Maps include popups for markers, polylines for route visualization, and auto-centering based on delivery boy position.
- **Real-Time Updates**: Map markers update dynamically as delivery boy location changes, received via Socket.io events.

### Map Features in Components
- **DeliveryBoyTracking.jsx**: Core tracking component displaying:
  - Delivery boy marker with real-time position updates
  - Customer location marker at delivery address
  - Blue polyline connecting delivery boy to customer for visual route guidance
  - Responsive map container with zoom level 16 and full width/height
- **TrackOrderPage.jsx**: Integrates DeliveryBoyTracking for order-specific tracking, handling multiple shop orders per delivery.

### Location Workflow
1. **Initial Location Fetch**: On app load, `useGetCity` hook gets current position and reverse geocodes to city/state/address.
2. **Continuous Updates for Users/Owners**: `useUpdateLocation` hook sends location to backend via `/api/user/update-location` API.
3. **Delivery Boy Tracking**: Delivery boys emit `updateLocation` via Socket.io with coordinates, updating User model and broadcasting to assigned customers.
4. **Real-Time Broadcasting**: Backend finds active assignments and emits `updateDeliveryLocation` to customer socketIds for live map updates.
5. **Map Rendering**: Frontend receives events, updates Redux state, and re-renders DeliveryBoyTracking component.

### Privacy Concerns and Data Handling
- **Location Data Sensitivity**: Real-time location sharing enables live tracking but raises privacy concerns regarding user location data collection and usage.
- **Data Storage**: Location coordinates are stored in MongoDB as GeoJSON Points, potentially indefinitely unless user account is deleted.
- **Real-Time Sharing**: Delivery boy locations are broadcast to customers during active deliveries, visible on maps without explicit consent beyond order placement.
- **Geolocation Permissions**: App relies on browser geolocation permissions; users can deny access, but this may limit functionality (e.g., location-based shop filtering).
- **Data Retention**: No explicit data retention policies mentioned; locations persist in database until user updates or account deletion.
- **Potential Risks**: Location data could be misused for tracking users beyond delivery purposes; consider implementing data minimization and user consent mechanisms.
- **Security Measures**: Location updates require authenticated JWT tokens; however, real-time broadcasts occur over WebSocket without additional encryption beyond Socket.io's built-in security.
- **Recommendations**: Implement user controls for location sharing preferences, data anonymization for non-essential uses, and compliance with privacy regulations like GDPR/CCPA.

## Authentication and Security Mechanisms

### JWT (JSON Web Tokens) Implementation
- **Token Generation**: JWT tokens are created using `jsonwebtoken` library with HS256 algorithm, signed with a secret key stored in environment variables (`JWT_SECRET`). Tokens expire in 7 days and include userId payload.
- **Token Verification**: All protected routes use `isAuth.js` middleware to verify JWT tokens from cookies. Invalid or expired tokens return 401 errors.
- **Secure Storage**: Tokens are stored in HTTP-only cookies to prevent XSS attacks, with secure flags in production.
- **Encryption**: Passwords are hashed using `bcryptjs` with salt rounds for secure storage. No plain-text passwords are stored.

### Authentication Flow
1. **Signup/Signin**: User credentials validated, password hashed, JWT generated and sent in cookie.
2. **Protected Routes**: Middleware verifies token, attaches userId to request object.
3. **Role-Based Access**: Controllers check user roles (user/owner/deliveryBoy) for authorization.
4. **Firebase Integration**: Additional OAuth authentication via Firebase for Google sign-in.

### Security Measures
- **Input Validation**: Joi schemas validate all API inputs to prevent injection attacks.
- **CORS Configuration**: Restricted to frontend domain (localhost:5173) to prevent unauthorized cross-origin requests.
- **Rate Limiting**: Not explicitly implemented; consider adding for production.
- **HTTPS**: Recommended for production to encrypt data in transit.
- **Environment Variables**: Sensitive data (secrets, API keys) stored securely, not hardcoded.
- **Error Handling**: Generic error messages prevent information leakage about system internals.

### Data Encryption and Privacy
- **Password Encryption**: bcryptjs ensures one-way hashing; passwords cannot be decrypted.
- **JWT Encryption**: Tokens are signed but payload is base64 encoded (not encrypted); sensitive data not stored in tokens.
- **Database Encryption**: MongoDB data at rest encryption recommended for production.
- **API Key Security**: External APIs (Geoapify, Cloudinary, Razorpay) use secure key storage.
- **User Data Protection**: Role-based data isolation prevents unauthorized access to other users' data.
- **Compliance Considerations**: Implement GDPR/CCPA compliance for user data handling, consent management, and data deletion rights.

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
