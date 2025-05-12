# 🛡Vulnerable MERN E-Commerce Application

This is a deliberately vulnerable e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It is intended for educational use to help learn about common web security issues and test penetration techniques.

## Getting Started

### Prerequisites
- Node.js (v22+)
- MongoDB Atlas account
- npm (Node Package Manager)
- Cloudinary Account


### How to Set Up the Project Locally

### 1. Clone the repository:
```bash
git clone https://github.com/MuhaibShamsher/Vulnerable-Web-Application.git
cd vulnerable-Web-Application
```
### 2. Client Setup:
Navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```

Open the application in your browser at http://localhost:5173/

### 3. Server Setup:
Navigate to the `server` directory:
```bash
cd server
npm install
npm start
```

The backend will be running at http://localhost:5000


## Tools & Frameworks Used

### Development Stack
- **Frontend:** React.js with Bootstrap  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (hosted on MongoDB Atlas)  
- **Image Storage:** Cloudinary  


### Security & Testing Tools
- **OWASP Top 10 Vulnerabilities**  
- **Burp Suite** (for interception & analysis)  
- **Developer Tools** (Browser DevTools, Postman, etc.)  
- **JWT** for authentication  


## Vulnerabilities Covered
- NoSQL Injection  
- Stored XSS  
- IDOR (Insecure Direct Object Reference)  
- Privilege Escalation  
- Missing Security Headers  
- Clickjacking  
- Price Manipulation  
- Broken Access Control  
- Weak JWT Secrets  
- No Email Verification  


## Sample Credentials

### Customer Logins
- **User 01**  
  - Email: `user01@email.com`  
  - Password: `user01`  

- **User 02**  
  - Email: `user02@email.com`  
  - Password: `user02`  

### Admin Login
- Email: `admin@admin.com`  
- Password: `admin123`  


## Live User Login
[https://vulnerable-web-application-jecw.vercel.app/login](https://vulnerable-web-application-jecw.vercel.app/login)

## Live Admin Login
[https://vulnerable-web-application-jecw.vercel.app/admin](https://vulnerable-web-application-jecw.vercel.app/admin)

