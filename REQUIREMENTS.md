# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index  
- get (product by id) [token required]
- add [token required]
- delete [token required]

#### Users
- index  
- login
- add [token required]
- delete [token required]


#### Orders
- index  
- get (order by id) [token required]
- add [token required]
- delete [token required]

#### ProductOrders
- get (orders by product id)
- add [token required]
- delete [token required]
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



