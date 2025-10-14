# Node-Assessment

## 📋 Project Information

**Developer:** Kaled Mesa  
**Clan:** Linux  
**Project:** FHL Logistics REST API

## 🚀 Overview

FHL Logistics API is a comprehensive RESTful API designed to manage logistics operations including deliveries, orders, warehouses, products, and clients. Built with Node.js, TypeScript, Express, and PostgreSQL, this system provides a robust solution for logistics management with role-based access control and complete CRUD operations.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **API Documentation:** Swagger UI / OpenAPI 3.0
- **Development Tools:** ts-node-dev

## 📚 API Documentation

Once the server is running, you can access the **Swagger API Documentation** at:

```
http://localhost:3000/api/docs
```

This interactive documentation allows you to:
- View all available endpoints
- Test API requests directly from the browser
- See request/response schemas
- Understand authentication requirements

## 🔧 Prerequisites

Before starting, ensure you have installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Node-Assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Create the Database

Connect to PostgreSQL and create the database:

```bash
psql -U postgres
```

Then run:

```sql
CREATE DATABASE fhl_db;
```

#### Create Tables

Execute the provided SQL script to create all necessary tables:

```bash
psql -U postgres -d fhl_db -f psql/create_db_and_tables.psql
```

### 4. Environment Configuration

Create a `.env` file in the root directory of the project with the following variables:

#### .env Example

```env
# Server Configuration
PORT=3000

# Database Configuration
SQL_URI=postgresql://postgres:yourpassword@localhost:5432/fhl_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10
```

**Important:** Replace `yourpassword` with your actual PostgreSQL password and `your_super_secret_jwt_key_change_this_in_production` with a strong secret key.

### 5. Seed Database (Optional)

To populate the database with sample data including test users, clients, warehouses, and products:

```bash
npm run seed
```

This will create:
- **Admin User:** admin@fhl.com / admin123
- **Analyst User:** analyst@fhl.com / analyst123
- Sample clients, warehouses, and products

## 🎯 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start the server in development mode with auto-reload |
| **Build** | `npm run build` | Compile TypeScript to JavaScript in `dist/` folder |
| **Start** | `npm start` | Run the compiled production build |
| **Seed** | `npm run seed` | Populate database with sample data |

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or the port specified in your .env file).

### Production Mode

```bash
npm run build
npm start
```

## 🔐 Authentication

The API uses **JWT Bearer Token** authentication. Most endpoints require authentication.

### How to Authenticate:

1. **Register** a new user or **Login** with existing credentials
2. Use the `/api/auth/login` endpoint to obtain a JWT token
3. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

### Default Test Users (after running seed):

| Email | Password | Role |
|-------|----------|------|
| admin@fhl.com | admin123 | admin |
| analyst@fhl.com | analyst123 | analyst |

## 📍 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Clients (Admin only)
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create a new client
- `GET /api/clients/:id` - Get client by ID
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Warehouses
- `GET /api/warehouses` - List all warehouses
- `POST /api/warehouses` - Create warehouse
- `GET /api/warehouses/:id` - Get warehouse details
- `PUT /api/warehouses/:id` - Update warehouse
- `GET /api/warehouses/:id/stock` - View warehouse stock
- `PATCH /api/warehouses/:id/toggle` - Activate/deactivate warehouse

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get order history
- `POST /api/orders` - Create new order
- `GET /api/orders/client/:clientId` - Get orders by client
- `PATCH /api/orders/:id/status` - Update order status

For complete endpoint documentation with request/response examples, visit the **Swagger UI** at `/api/docs`.

## 🗂 Project Structure

```
Node-Assessment/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection configuration
│   ├── controllers/             # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── client.controller.ts
│   │   ├── order.controller.ts
│   │   ├── product.controller.ts
│   │   └── warehouse.controller.ts
│   ├── docs/
│   │   └── swagger.ts           # Swagger setup
│   ├── middlewares/             # Express middlewares
│   │   ├── auth.middleware.ts   # JWT authentication
│   │   ├── error.middleware.ts  # Global error handler
│   │   ├── role.middleware.ts   # Role-based access control
│   │   └── validate.middleware.ts
│   ├── models/                  # Sequelize models
│   │   ├── User.ts
│   │   ├── Client.ts
│   │   ├── Address.ts
│   │   ├── Warehouse.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   └── index.ts             # Model associations
│   ├── routes/                  # API routes
│   │   ├── auth.routes.ts
│   │   ├── client.routes.ts
│   │   ├── order.routes.ts
│   │   ├── product.routes.ts
│   │   ├── warehouse.routes.ts
│   │   └── index.ts
│   ├── services/                # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── client.service.ts
│   │   ├── order.service.ts
│   │   ├── product.service.ts
│   │   └── warehouse.service.ts
│   ├── validators/              # Zod validation schemas
│   │   ├── auth.validator.ts
│   │   ├── client.validator.ts
│   │   ├── order.validator.ts
│   │   ├── product.validator.ts
│   │   └── warehouse.validator.ts
│   ├── seed/
│   │   └── seed.ts              # Database seeding script
│   ├── app.ts                   # Express app configuration
│   └── server.ts                # Server entry point
├── psql/
│   └── create_db_and_tables.psql # Database schema
├── swagger.yaml                 # OpenAPI specification
├── .env                         # Environment variables (create this)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔑 Key Features

- ✅ **RESTful API** with best practices
- ✅ **JWT Authentication** and authorization
- ✅ **Role-based Access Control** (Admin/Analyst)
- ✅ **Input Validation** with Zod
- ✅ **Transaction Management** for orders
- ✅ **Stock Management** with inventory control
- ✅ **Error Handling** with custom middleware
- ✅ **API Documentation** with Swagger/OpenAPI
- ✅ **TypeScript** for type safety
- ✅ **Database Relations** with Sequelize ORM
- ✅ **Password Hashing** with bcrypt

## 🧪 Testing the API

### Using Swagger UI (Recommended)

1. Start the server: `npm run dev`
2. Open browser: `http://localhost:3000/api/docs`
3. Use the "Authorize" button to add your JWT token
4. Test endpoints directly from the interface

### Using cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fhl.com","password":"admin123"}'

# Get warehouses (with token)
curl -X GET http://localhost:3000/api/warehouses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API endpoints from Swagger
2. Set up environment variables for base URL and token
3. Test all endpoints with proper authorization

## 🐛 Troubleshooting

### Database Connection Error

- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check `SQL_URI` in `.env` file
- Ensure database exists: `psql -l`

### Port Already in Use

- Change `PORT` in `.env` file
- Kill process using port: `lsof -ti:3000 | xargs kill -9`

### JWT Authentication Error

- Verify `JWT_SECRET` is set in `.env`
- Check token expiration
- Ensure proper `Authorization` header format

### TypeScript Compilation Errors

- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration
- Delete `dist/` folder and rebuild: `rm -rf dist && npm run build`

## 📝 Notes

- Always use HTTPS in production
- Never commit `.env` file to version control
- Change default passwords and JWT secret in production
- Regular database backups are recommended
- Monitor application logs for errors
- Keep dependencies updated

## 📄 License

This project is developed for assessment purposes.

---