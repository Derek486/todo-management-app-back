# **Express TypeScript Starter 🚀**  

A structured and scalable starter template for building REST APIs using **Express.js** and **TypeScript**. This project follows a clean architecture approach, separating concerns for better maintainability and scalability.  

## **✨ Features**  
✅ **Express.js + TypeScript** – Strongly typed, fast, and scalable API development.  
✅ **Modular Architecture** – Organized folder structure for controllers, services, repositories, and middleware.  
✅ **Database Ready** – Includes **MySQL2** integration with a persistence layer.  
✅ **Error Handling** – Centralized error handling for cleaner controllers.  
✅ **DTOs & Mappers** – Ensures data consistency between API requests and database models.  
✅ **Environment Variables** – Configurable settings via `.env` file.  
✅ **Pre-configured Scripts** – Ready-to-use commands for development and production.  

## **📂 Folder Structure**  
```
express-ts-starter/
│── src/
│   ├── http/               # HTTP Layer (Controllers, Middlewares, Requests, Shared Helpers)
│   ├── infrastructure/     # Business Logic (DTOs, Mappers, Implementations, Repositories)
│   ├── persistence/        # Database Layer (Migrations, Models, Connection)
│   ├── routes/             # API Routes
│   ├── shared/             # Common utilities, constants, and helpers
│   ├── app.ts              # Express App Configuration
│   ├── config.ts           # Application Configurations
│   ├── index.ts            # Main Entry Point
│── .env                    # Environment Variables
│── .gitignore              # Ignored Files
│── package.json            # Project Dependencies
│── tsconfig.json           # TypeScript Configuration
```

## **🚀 Getting Started**  

### **1️⃣ Install Dependencies**  
```sh
npm install
```

### **2️⃣ Setup Environment Variables**  
Create a `.env` file and configure database credentials:  
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=express_ts_db
```

### **3️⃣ Run the Development Server**  
```sh
npm run dev
```

### **4️⃣ Build & Start for Production**  
```sh
npm run build
npm start
```

## **📌 Contributing**  
Feel free to fork this repository and contribute!  

🔥 **Start your next Express.js project with TypeScript the right way!** 🚀