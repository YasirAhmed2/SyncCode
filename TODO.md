# Authentication Issues Fix

## Frontend Issues
- [ ] Fix otpVerification.page.tsx to use correct endpoint (/auth/verify-otp) for forgot password
- [ ] Add password confirmation validation in resetPassword.page.tsx
- [ ] Replace direct axios imports with api instance for consistency
- [ ] Clean up commented code in otpVerification.page.tsx
- [ ] Update resetPassword.page.tsx to handle token properly

## Backend Issues
- [ ] Modify verifyOtp to return resetToken in JSON response

## Testing
- [ ] Test complete password reset flow
