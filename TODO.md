# TODO: Fix Owner Data Isolation

## Tasks
- [x] Add ownership check in `editItem` controller to ensure item belongs to logged-in owner's shop
- [x] Add ownership check in `deleteItem` controller to ensure item belongs to logged-in owner's shop
- [x] Add ownership check in `getItemById` controller to ensure item belongs to logged-in owner's shop

## Notes
- Ownership checks will prevent owners from accessing/modifying other owners' items
- Changes only in `backend/controllers/item.controllers.js`
- Test by signing in as different owners and verifying isolation
