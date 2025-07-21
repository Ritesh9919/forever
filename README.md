# 🎉 E-commerce App

A full-fledged E-commerce App using the MERN stack!

---

## Tech Stack

React.js, Tailwind CSS, Node.js, MongoDB, Stripe, Razorpay


## 📦 Setup Instructions

### 1. Run backend

```bash
1. git clone https://github.com/Ritesh9919/forever
2. cd backend
3. npm install
4. npm run dev
```

### 2. Run frontend

```bash
1. git clone https://github.com/Ritesh9919/forever
2. cd frontend
3. npm install
4. npm run dev
```

### 3. Run admin

```bash
1. git clone https://github.com/Ritesh9919/forever
2. cd admin
3. npm install
4. npm run dev
```

### 3. Configure Environment Variables

1. Frontend

```bash
VITE_BACKEND_URL='http://localhost:8000'
VITE_RAZORPAY_KEY_ID=
```

2. Backend

```bash
PORT=8000
MONGO_URI=
JWT_SECRET="HELLO"
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_EMAIL="admin@ritesh.com"
ADMIN_PASSWORD="admin1999"
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

2. admin

```bash
VITE_BACKEND_URL='http://localhost:8000'
```


### 🚀 Features

- User Authentication\*\*: Implemented secure login and registration using JWT for a seamless user experience.

- Product Management\*\*: Adding, editing, and viewing products. 

- **Image Uploads**: Integrated image uploads, a crucial feature for any e-commerce platform.

- **Search, Sort, & Filter**: Enhanced the user experience with functionalities to search, sort, and filter products.

- **Online Payments**: Integrate Stripe and Razorpay for secure and efficient product booking payments.

- MongoDB persistence using Mongoose
- Admin panel for adding products, viewing orders , deleting product and updating order status.
- **Recent product on Home Page**: Displayed recently added product on the home page, keeping the content dynamic and engaging.
