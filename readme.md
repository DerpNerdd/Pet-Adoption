# **Pet Adoption Platform**

Welcome to the **Pet Adoption Platform**, a full-stack web application designed to connect potential pet adopters with pet owners looking to find new homes for their pets. This platform allows users to browse available pets, view detailed information, contact pet owners, and manage pet listings.

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Running the Project](#running-the-project)
- [Routes and API Endpoints](#routes-and-api-endpoints)
  - [User Authentication Routes](#user-authentication-routes)
  - [Pet Routes](#pet-routes)
  - [Contact Routes](#contact-routes)
  - [Admin Routes](#admin-routes)
- [Project Structure](#project-structure)
- [License](#license)
- [Contact](#contact)
- [Appendix: Detailed Route Explanations](#appendix-detailed-route-explanations)
  - [User Authentication Routes](#user-authentication-routes-1)
  - [Pet Routes](#pet-routes-1)
  - [Contact Routes](#contact-routes-1)
  - [Admin Routes](#admin-routes-1)
- [Middleware Functions](#middleware-functions)
- [Models](#models)
- [Views](#views)
- [Controllers](#controllers)
- [Security Considerations](#security-considerations)
- [Known Issues and TODOs](#known-issues-and-todos)
- [Changelog](#changelog)
- [Credits](#credits)

---

## **Features**

- **User Authentication:**
  - Secure user registration and login using email and password.
  - Session management with authentication middleware.

- **Pet Listings:**
  - View all available pets for adoption.
  - Filter pets based on location, breed, and other criteria.
  - Detailed pet profiles with images, descriptions, and owner contact information.

- **Pet Management:**
  - Registered users can create, edit, and delete their pet listings.
  - Upload multiple images for each pet.

- **Contact Pet Owners:**
  - Send messages to pet owners directly through the platform.
  - Pre-filled inquiry forms for ease of communication.

- **Admin Dashboard:**
  - Manage users and pet listings.
  - Delete inappropriate or outdated content.

- **Responsive Design:**
  - Mobile and desktop-friendly layouts.
  - Consistent styling and branding across the platform.

---

## **Technologies Used**

- **Frontend:**
  - HTML5, CSS3, JavaScript
  - EJS (Embedded JavaScript Templates)
  - Responsive design with media queries

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose ORM

- **Authentication:**
  - Passport.js for user authentication
  - bcrypt for password hashing

- **File Uploads:**
  - Multer for handling multipart/form-data

- **Email Communication:**
  - Nodemailer for sending emails to pet owners

- **Icons and Fonts:**
  - Google Fonts for typography
  - Ionicons for icons

---

## **Installation and Setup**

### **Prerequisites**

- Node.js (v12 or higher)
- npm (Node Package Manager)
- MongoDB (local instance or MongoDB Atlas)

### **Clone the Repository**

```bash
git clone https://github.com/Derpnerdd/Pet-Adoption.git
cd Pet-Adoption
```
### **Install Dependencies**
```bash
npm install
```
### **Environment Variables**
Create a .env file in the root directory.

### **Running the Project**
Start the Server
```
npm start
```
The server will start on http://localhost:3000 or the port specified in your .env file.

### **Access the Application**
Open your web browser and navigate to http://localhost:3000.

# Routes and API Endpoints
## User Authentication Routes
**GET /login**
- Description: Render the login page.
- Access: Public
- View: login.ejs
**POST /api/v1/users/login**
- Description: Authenticate user and start a session.
- Access: Public
- Data: email, password
**GET /signup**
- Description: Render the signup (registration) page.
- Access: Public
- View: signup.ejs
**POST /api/v1/users/register**
- Description: Register a new user.
- Access: Public
- Data: username, email, password
**GET /logout**
- Description: Log out the current user and destroy the session.
- Access: Private (authenticated users)
## Pet Routes
**GET /**
- Description: Display all available pets for adoption.
- Access: Public
- View: index.ejs
**GET /pets/new**
- Description: Render the form to create a new pet listing.
- Access: Private (authenticated users)
- View: create-pet.ejs
**POST /pets**
- Description: Create a new pet listing.
- Access: Private (authenticated users)
- Data: Pet details and images.
**GET /pets/:id**
- Description: Display detailed information about a specific pet.
- Access: Public
- View: pet-details.ejs
**GET /pets/edit/:id**
- Description: Render the form to edit a pet listing.
- Access: Private (pet owner only)
- View: edit-pet.ejs
**POST /pets/edit/:id**
- Description: Update the pet listing with new information.
- Access: Private (pet owner only)
- Data: Updated pet details and images.
**POST /pets/delete/:id**
- Description: Delete a pet listing.
- Access: Private (pet owner or admin)
## Contact Routes
**GET /contact/:petId**
- Description: Render the contact form to message the pet owner.
- Access: Private (authenticated users)
- View: contact.ejs
**POST /contact/:petId**
- Description: Send a message to the pet owner via email.
- Access: Private (authenticated users)
- Data: subject, message
- Redirects to: email-sent.ejs confirmation page.
## Admin Routes
**GET /admin**
- Description: Render the admin dashboard.
- Access: Private (admin users)
- View: admin.ejs
**POST /admin/delete-user/:userId**
- Description: Delete a user from the database.
- Access: Private (admin users)
# Project Structure
```
Pet-Adoption/
├── app.js
├── package.json
├── .env
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── pet-details.css
│   │   ├── create-pet.css
│   │   ├── auth.css
│   │   ├── contact.css
│   │   ├── email-sent.css
│   │   └── admin.css
│   ├── images/
│   └── fonts/
├── routes/
│   ├── index.js
│   ├── users.js
│   ├── pets.js
│   └── admin.js
├── controllers/
│   ├── authController.js
│   ├── petController.js
│   ├── adminController.js
│   └── contactController.js
├── models/
│   ├── User.js
│   └── Pet.js
└── views/
    ├── index.ejs
    ├── login.ejs
    ├── signup.ejs
    ├── pet-details.ejs
    ├── create-pet.ejs
    ├── edit-pet.ejs
    ├── contact.ejs
    ├── email-sent.ejs
    └── admin.ejs
```
## Key Files and Directories
- app.js: The main application file where the Express app is configured.
- routes/: Contains all route handlers for different parts of the application.
- controllers/: Contains controller functions that handle the logic for each route.
- models/: Mongoose schemas and models for MongoDB collections.
- views/: EJS templates for rendering HTML pages.
- public/: Static assets like CSS, images, and fonts.

## License
This project is licensed under the MIT License.

## Planning
Trello: [Trello](https://trello.com/invite/b/67195d97e06a95b323747ab0/ATTI1e12641cc64b9c7dab5a3801fce70266598CA015/pet-adoption-db)
Figma Wireframing: [Figma](https://www.figma.com/design/iXSIQilEn9T57x2VdlpduE/Pet-Adoption?node-id=0-1&node-type=canvas&t=gSFFZbK5uOrlOn7m-0)

## Contact
For any inquiries or support, please contact:

- Email:  sanchez1.alan1@gmail.com
- GitHub: Derpnerdd

# Appendix: Detailed Route Explanations
## User Authentication Routes
**GET /login**
- Purpose: Render the login page where users can enter their credentials to access their account.
- Middleware: redirectIfAuthenticated (redirects to home if the user is already logged in).
- Renders: login.ejs with a form for email and password.
**POST /api/v1/users/login**
- Purpose: Process login information and authenticate the user.
- Middleware: passport.authenticate('local')
Behavior:
- Checks the provided email and password.
- If valid, creates a session and logs the user in.
- Redirects to the specified redirectTo URL or home page.
**GET /signup**
- Purpose: Render the signup page for new users to create an account.
- Middleware: redirectIfAuthenticated
- Renders: signup.ejs with a form for username, email, and password.
**POST /api/v1/users/register**
- Purpose: Register a new user in the database.
Behavior:
- Validates input data.
- Hashes the password using bcrypt.
- Saves the new user to the database.
- Logs the user in and redirects to the home page.
**GET /logout**
- Purpose: Log out the current user.
Behavior:
- Destroys the user session.
- Redirects to the login page.
Pet Routes
**GET /**
- Purpose: Display a list of all available pets for adoption.
Behavior:
- Fetches all pet listings from the database.
- Applies filters if any are provided in query parameters.
- Renders index.ejs with the list of pets.
**GET /pets/new**
- Purpose: Render a form to create a new pet listing.
- Middleware: ensureAuthenticated (only logged-in users can access).
- Renders: create-pet.ejs with a form for pet details.
**POST /pets**
- Purpose: Add a new pet listing to the database.
Middleware:
- ensureAuthenticated
- upload.single('profileImage') (handles file upload)
Behavior:
- Validates and processes form data.
- Saves pet information and images to the database.
- Redirects to the pet details page.
**GET /pets/:id**
- Purpose: Display detailed information about a specific pet.
Behavior:
- Fetches pet details by ID, populating the owner field.
- Renders pet-details.ejs with pet information.
**GET /pets/edit/:id**
- Purpose: Render a form to edit an existing pet listing.
- Middleware: ensurePetOwner (only the pet owner can edit).
- Renders: edit-pet.ejs with current pet details pre-filled.
**POST /pets/edit/:id**
- Purpose: Update pet listing with new information.
Middleware:
- ensurePetOwner
- upload.array('images', 5) (handles multiple file uploads)
Behavior:
- Processes updated data and images.
- Updates the pet in the database.
- Redirects to the pet details page.
**POST /pets/delete/:id**
- Purpose: Delete a pet listing from the database.
- Middleware: ensurePetOwner or ensureAdmin (only pet owner or admin can delete).
Behavior:
- Removes the pet listing.
- Redirects to the home page with a success message.
## Contact Routes
**GET /contact/:petId**
- Purpose: Render a form to send a message to the pet owner.
- Middleware: ensureAuthenticated
Behavior:
- Fetches pet and owner details.
- Renders contact.ejs with a form pre-filled with pet owner email and subject.
**POST /contact/:petId**
- Purpose: Send an email message to the pet owner.
- Middleware: ensureAuthenticated
Behavior:
- Uses nodemailer to send the email.
- Redirects to email-sent.ejs to confirm the message was sent.
- Admin Routes
**GET /admin**
- Purpose: Render the admin dashboard.
- Middleware: ensureAdmin (only accessible by admin users).
Behavior:
- Fetches all users and pets.
- Renders admin.ejs with management options.
**POST /admin/delete-user/:userId**
- Purpose: Delete a user from the database.
- Middleware: ensureAdmin
Behavior:
- Removes the user.
- Redirects back to the admin dashboard.
## Middleware Functions
**ensureAuthenticated**
- Purpose: Ensure that a route is only accessible to authenticated users.
- Behavior: If the user is logged in, proceed to the next middleware or route handler; otherwise, redirect to the login page.
**redirectIfAuthenticated**
- Purpose: Prevent logged-in users from accessing routes like login or signup.
- Behavior: If the user is logged in, redirect to the home page; otherwise, proceed.
**ensureAdmin**
- Purpose: Ensure that a route is only accessible to admin users.
- Behavior: If the user is an admin, proceed; otherwise, send a 403 Forbidden response.
**ensurePetOwner**
- Purpose: Ensure that only the owner of a pet can edit or delete the pet listing.
- Behavior: Checks if the current user is the owner of the pet; if so, proceed; otherwise, send a 403 response.
## Models
**User Model (User.js)**
Fields:

- username (String)
- email (String, unique)
- password (String, hashed)
- isAdmin (Boolean, default: false)
## Methods:

**Pet Model (Pet.js)**
Fields:
- name (String)
- age (Number)
- breed (String)
- location (Object with city and state)
- description (String)
- behavior (String)
- history (String)
- price (Number)
- owner (ObjectId referencing User)
- profileImage (Object with image data)
- images (Array of image objects)
## Views
- index.ejs: Home page displaying pet listings.
- login.ejs: Login form.
- signup.ejs: Registration form.
- pet-details.ejs: Detailed pet information.
- create-pet.ejs: Form to add a new pet.
- edit-pet.ejs: Form to edit a pet listing.
- contact.ejs: Contact form to message pet owner.
- email-sent.ejs: Confirmation page after sending a message.
- admin.ejs: Admin dashboard for managing users and pets.
## Controllers
**authController.js**
- Handles user authentication logic, including login, signup, and logout.
**petController.js**
- Manages pet-related operations such as creating, editing, viewing, and deleting pet listings.
**adminController.js**
- Provides functionalities for admin users to manage other users and pet listings.
**contactController.js**
- Handles the logic for sending messages to pet owners via email.
## Security Considerations
- Password Security: User passwords are hashed using bcrypt before storing in the database.
Authentication: Sessions are managed securely using Express sessions and Passport.js.
- Input Validation: All user inputs should be validated and sanitized to prevent injection attacks.
- Access Control: Middleware functions ensure that only authorized users can access certain routes.
## Known Issues and TODOs
- Image Uploads: Currently supports JPEG, PNG, and WebP formats. Consider adding validation for file size and type.
- Email Service: Configure nodemailer with a reliable email service. Handle errors gracefully.
- Testing: Implement unit and integration tests for critical components.
- Error Handling: Improve error handling and provide user-friendly error messages.
## Changelog
v1.0.0
- Initial release with core functionalities:
- User authentication
- Pet listing management
- Contact pet owners
- Admin dashboard
## Credits
This project was developed with the aim of facilitating pet adoption and helping pets find loving homes.

Thank you for contributing to the Pet Adoption Platform!
