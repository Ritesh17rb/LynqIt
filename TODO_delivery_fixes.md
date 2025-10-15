# TODO: Remove OTP for Mark As Delivered

## Backend Changes
- [x] Create `markAsDelivered` function in `backend/controllers/order.controllers.js`
- [x] Add `/mark-as-delivered` route in `backend/routes/order.routes.js`

## Frontend Changes
- [x] Remove OTP-related states (`showOtpBox`, `otp`) in `frontend/src/components/DeliveryBoy.jsx`
- [x] Remove `sendOtp` and `verifyOtp` functions
- [x] Remove OTP input UI
- [x] Update "Mark As Delivered" button to call new `markAsDelivered` function

## Testing
- [ ] Test the changes by running the app and verifying direct delivery marking
 