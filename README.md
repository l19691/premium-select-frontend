Premium Select Frontend
A responsive and role-based product management + ordering platform for Premium Select — built with React, Redux Toolkit, Tailwind CSS, and JSON Server.

Live Preview
_(If deployed)_ Coming soon...

- Features
- User Roles
- Admin: Can add, edit, delete products.
- Customer: Can browse and place orders.

Authentication

- Role-based login (no backend auth needed — state managed via Redux).

Product Management

- View all products
- View product details
- Add new product (admin)
- Edit existing product (admin)
- Delete product (admin)

Orders

- Customers can place multi-product orders
- Orders saved in JSON Server

Protected Routes

- Dashboard, Add Product, Edit Product, and Orders are restricted based on role

UI/UX

- Fully responsive
- Modern Tailwind UI
- Clean forms with validation and success/error feedback

Tech Stack
| Technology | Use |
|------------------|-------------------------------------------|
| React | UI components and routing |
| Redux Toolkit | Global state for auth, products, orders |
| React Router | Navigation and route protection |
| Axios | API communication with JSON Server |
| Tailwind CSS | Styling and layout |
| JSON Server | Simulated backend and database |

Folder Structure
src/
├── app/ # Redux store
├── components/ # Reusable components
├── features/ # Redux slices (auth, products, orders)
├── hooks/ # Custom hooks (useAuth)
├── layouts/ # Shared layout
├── pages/ # Page components
├── App.jsx # Main routes
├── index.css # Tailwind imports
└── main.jsx # App root

Running the App Locally

1. Clone the Repo
   git clone https://github.com/l19691/premium-select-frontend.git
   cd premium-select-frontend

2. Start the JSON server
   npx json-server --watch db.json --port 3001

3. Start hthe Front end
   npm run dev
