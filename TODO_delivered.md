# TODO: Prevent Status Changes on Delivered Orders

## Steps to Complete:

### Backend Changes
- [x] Modify `markAsDelivered` in `backend/controllers/order.controllers.js`: Add check to return error if `shopOrder.status === "delivered"`
- [ ] Optionally, update `cancelOrder` in `backend/controllers/order.controllers.js` to explicitly include "delivered" in the prevention check for clarity

### Testing
- [ ] Test the backend to ensure status cannot be changed once delivered (e.g., try to mark as delivered again, cancel a delivered order, update status of delivered order)
