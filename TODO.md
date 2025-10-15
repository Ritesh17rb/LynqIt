# TODO: Implement Orders Section with Past/Pending Separation and Cancel Functionality

## Steps to Complete:

### Backend Changes
- [x] Update backend/models/order.model.js: Add "cancelled" to shopOrderSchema status enum
- [x] Add cancelOrder controller in backend/controllers/order.controllers.js: Update shopOrder status to "cancelled", handle refunds if online payment
- [x] Add POST /cancel-order/:orderId/:shopId route in backend/routes/order.routes.js
- [x] Prevent status changes on completed orders (delivered or cancelled) in updateOrderStatus

### Frontend Changes
- [x] Modify frontend/src/pages/MyOrders.jsx: Separate orders into "Past Orders" (delivered, cancelled) and "Pending Orders" (pending, preparing, out of delivery) sections
- [x] Update frontend/src/components/UserOrderCard.jsx: Add "Cancel Order" button for pending orders, call cancel API on click
- [x] Update frontend/src/redux/userSlice.js: Add action to update order status on cancel

### Testing
- [ ] Test order separation in UI
- [ ] Test cancel functionality and backend logic
- [ ] Test that status changes are blocked for completed orders
