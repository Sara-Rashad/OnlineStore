# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index 
[**GET** http://localhost:3000/api/products]  
- add [token required]
[**POST** http://localhost:3000/api/products/create] , product fields in the body
- update [token required] 
[**PUT** http://localhost:3000/api/products/] , product id in the body
- delete [token required]
[**DELETE** http://localhost:3000/api/products/] , product id in the body

#### Users
- index 
[**GET** http://localhost:3000/api/users]   
- login
[**POST** http://localhost:3000/api/users/login] , username & password in the body
- add 
[**POST** http://localhost:3000/api/users/login] , user fields in the body
- update [token required]
[**PUT** http://localhost:3000/api/users/] , user id in the body
- delete [token required]
[**DELETE** http://localhost:3000/api/users/] , user id in the body


#### Orders
- index
[**GET** http://localhost:3000/api/orders]  
- add [token required]
[**POST** http://localhost:3000/api/orders/create] , order fields in the body
- update 
[**PUT** http://localhost:3000/api/orders/] , order id in the body
- delete [token required]
[**DELETE** http://localhost:3000/api/orders/] , order id in the body

#### ProductOrders
- get (orders by product id)
[**GET** http://localhost:3000/api/productOrders] , product_id in the body  
- add [token required]
[**POST** http://localhost:3000/api/productOrders/create] , product order fields in the body
- delete [token required]
[**DELETE** http://localhost:3000/api/productOrders/] , productOrder id in the body
-
## Data Shapes
#### Product
-  id
- name
- price
- insert_date

#### User
- id
- firstname
- lastname
- password

#### Orders
- id
- status
- user_id
- order_date

####ProductOrders
- id
- product_id
- order_id
- quantity



