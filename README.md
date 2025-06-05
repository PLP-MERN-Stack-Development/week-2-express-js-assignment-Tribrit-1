Product RESTful API Documentation
This is a RESTful API built with Express.js for managing products. The API provides endpoints for creating, reading, updating, and deleting products, along with features like filtering, pagination, and search.

Table of Contents
Features

API Endpoints

Request and Response Examples

Middleware

Error Handling

Environment Variables

Installation

Running the Server

Testing

License

Features
CRUD Operations: Create, Read, Update, and Delete products

Filtering: Filter products by various criteria

Pagination: Get products in paginated format

Search: Search for products by name or description

Middleware: Includes logging, authentication, and validation middleware

Error Handling: Comprehensive error handling with appropriate status codes

API Endpoints
Base URL
http://localhost:3000/api/products

Endpoints
Method	Endpoint	Description
GET	/	Get all products (with optional filtering, pagination)
GET	/:id	Get a specific product by ID
POST	/	Create a new product
PUT	/:id	Update an existing product
DELETE	/:id	Delete a product
Request and Response Examples
1. Get All Products
Request:

GET /api/products
Response:

json
[
  {
    "id": 1,
    "name": "Product 1",
    "description": "Description for product 1",
    "price": 19.99,
    "category": "electronics",
    "createdAt": "2023-10-15T12:00:00.000Z",
    "updatedAt": "2023-10-15T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Product 2",
    "description": "Description for product 2",
    "price": 29.99,
    "category": "clothing",
    "createdAt": "2023-10-15T12:05:00.000Z",
    "updatedAt": "2023-10-15T12:05:00.000Z"
  }
]
2. Get a Single Product
Request:

GET /api/products/1
Response:

json
{
  "id": 1,
  "name": "Product 1",
  "description": "Description for product 1",
  "price": 19.99,
  "category": "electronics",
  "createdAt": "2023-10-15T12:00:00.000Z",
  "updatedAt": "2023-10-15T12:00:00.000Z"
}
3. Create a New Product
Request:

POST /api/products
json
{
  "name": "New Product",
  "description": "Description for new product",
  "price": 39.99,
  "category": "home"
}
Response:

json
{
  "id": 3,
  "name": "New Product",
  "description": "Description for new product",
  "price": 39.99,
  "category": "home",
  "createdAt": "2023-10-15T12:10:00.000Z",
  "updatedAt": "2023-10-15T12:10:00.000Z"
}
4. Update a Product
Request:

PUT /api/products/1
json
{
  "name": "Updated Product",
  "price": 24.99
}
Response:


{
  "id": 1,
  "name": "Updated Product",
  "description": "Description for product 1",
  "price": 24.99,
  "category": "electronics",
  "createdAt": "2023-10-15T12:00:00.000Z",
  "updatedAt": "2023-10-15T12:15:00.000Z"
}
5. Delete a Product
Request:

DELETE /api/products/1
Response:


{
  "message": "Product deleted successfully"
}
Middleware
The API includes the following middleware:

Logging Middleware: Logs all incoming requests with method, URL, and timestamp

Authentication Middleware: Validates API keys for protected routes

Validation Middleware: Validates request bodies for POST and PUT requests

Error Handling Middleware: Handles various types of errors and returns appropriate responses

Error Handling
The API returns appropriate HTTP status codes and error messages:

400 Bad Request: Invalid request data

401 Unauthorized: Missing or invalid authentication

404 Not Found: Resource not found

500 Internal Server Error: Server error

Example error response:
{
  "error": "Product not found",
  "status": 404
}
Environment Variables
The API uses the following environment variables (configured in .env file):

PORT=3000
API_KEY=your-secret-api-key
Installation
Clone the repository:

git clone https://github.com/your-repo/express-product-api.git
Install dependencies:


npm install
Create a .env file based on .env.example:

cp .env.example .env
Configure your environment variables in .env.

Running the Server
Start the development server:


npm start
The server will be available at http://localhost:3000.

Testing
You can test the API using tools like:

Postman

Insomnia

curl commands

Example curl commands:


# Get all products
curl http://localhost:3000/api/products

# Get a single product
curl http://localhost:3000/api/products/1

# Create a product
curl -X POST -H "Content-Type: application/json" -d '{"name":"New Product","price":19.99}' http://localhost:3000/api/products

# Update a product
curl -X PUT -H "Content-Type: application/json" -d '{"price":24.99}' http://localhost:3000/api/products/1

# Delete a product
curl -X DELETE http://localhost:3000/api/products/1
License
This project is licensed under the MIT License. See the LICENSE file for details.
