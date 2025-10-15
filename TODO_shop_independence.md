# TODO: Make Shops Independent

## Backend Changes
- [x] Verify `req.userId` extraction in `isAuth` middleware
- [x] Add strict validation in `getMyShop` to ensure only owner's shop is returned
- [x] Check for any potential data leakage in shop queries

## Frontend Changes
- [x] Clear cached shop data on login/logout in `useGetMyShop` hook
- [x] Ensure shop data is fetched only for current user

## Testing
- [ ] Test with multiple shop owners to verify independence
