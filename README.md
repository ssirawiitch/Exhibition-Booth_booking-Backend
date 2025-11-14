## BookYourBooth - Exhibition Booth Booking System API

BookYourBooth is a RESTful API for Exhibition Booth Booking System with user authentication and role-based access control.

## 🚀 Features

### Authentication System
- User registration and login with JWT tokens
- Password hashing using bcryptjs
- Role-based authorization (member/admin)
- Protected routes with middleware

### Core Entities
- **Users:** Registration, login, profile management. There are two types of user 'admin' and 'member'.
- **Exhibitions:** CRUD operations for exhibition management to manage available exhibitions.
- **Bookings:** Bookings linking Users to Exhibitions

### Database Schema
- **User Model:** name, email, tel, password, role, timestamps
- **Exhibition Model:** name, description, venue, startDate, durationDay, smallBoothQuota, bigBoothQuota, posterPicture
- **Booking Model:** user reference, exhibition reference, boothType (small/big), amount

### API Structure
- **Auth Routes (/api/v1/auth):** register, login, logout, get profile
- **Exhibition Routes (/api/v1/exhibitions):** CRUD operations for exhibitions
- **Booking Routes (/api/v1/booking):** CRUD operations for booth booking

### Access Control / Controllers 
- After login, registered admin user can add/update/delete/view any exhibition. For adding the exhibition, the startDate cannot be earlier than the current date.
- After login, registered member user can submit booth booking for the exhibition. The exhibition list is provided to the user. Exhibition information is also available. For each exhibition, a member user can submit multiple bookings but the total number of booths (both big and small) must not exceed 6.
- Registered member user can view his/her own booking
- Registered member user can edit his/her own booking 
- Registered member user can delete his/her own booking 
- Registered admin user can view any booking 
- Registered admin user can edit any booking 
- Registered admin user can delete any booking 

### Security Features
- JWT-based authentication
- Rate limiting (100 requests per 10 minutes)
- Helmet for security headers
- XSS protection
- MongoDB injection protection
- CORS enabled

### Documentation
- Swagger/OpenAPI documentation integrated
- Available at /api-docs endpoint

### Technology Stack
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose ODM
**Authentication:** JWT, bcryptjs
**Security:** helmet, xss-clean, express-rate-limit
**Documentation:** Swagger UI

### Development Setup
- Uses nodemon for development
- Environment variables in config/config.env
- MongoDB connection with mongoose

The project follows RESTful API conventions with proper middleware, error handling, and security measures.
