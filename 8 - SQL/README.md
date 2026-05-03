# E-Commerce Database SQL Practice

This repository/folder contains a complete SQL script designed for practicing database creation, normalization, and querying within a MySQL/MariaDB environment (such as XAMPP).

## 🗄️ Database Schema

The database represents a simple e-commerce system and consists of four normalized tables:

1.  **`customers`**: Stores customer details (id, name, email, address).
2.  **`products`**: Stores product inventory (id, name, price, description, discount).
3.  **`orders`**: Stores order metadata (id, customer_id, order_date, total_amount).
4.  **`order_items`**: A junction table that resolves the many-to-many relationship between orders and products (id, order_id, product_id, quantity).

## 🚀 Queries Included

The included SQL script (`script.sql`) covers the following operations:

1.  **Date Filtering & Joins:** Retrieve customers who ordered in the last 30 days.
2.  **Aggregation (`SUM` & `GROUP BY`):** Calculate the total amount spent by each customer.
3.  **Data Modification (`UPDATE`):** Update the price of a specific product.
4.  **Schema Modification (`ALTER TABLE`):** Add a new `discount` column to an existing table.
5.  **Sorting & Limiting (`ORDER BY` & `LIMIT`):** Retrieve the top 3 most expensive products.
6.  **Complex Joins (4 Tables):** Find all customers who purchased a specific item.
7.  **Basic Joins (`INNER JOIN`):** Retrieve a list of customer names alongside their order dates.
8.  **Basic Filtering (`WHERE`):** Retrieve orders with a total amount greater than a specific threshold.
9.  **Database Normalization:** Create a junction table to establish foreign key relationships.
10. **Averages (`AVG`):** Calculate the average order value across the entire database.

## 🛠️ How to Use

### Prerequisites
* A local server environment like **XAMPP** (which includes MySQL/MariaDB).
* A database management interface like **phpMyAdmin** or the MySQL command line.

### Execution Steps
1.  Open XAMPP and ensure the **MySQL module** is running.
2.  Navigate to phpMyAdmin (usually `http://localhost/phpmyadmin/`).
3.  Create a new database (e.g., `ecommerce_practice`).
4.  Navigate to the **SQL** tab.
5.  Copy and paste the contents of your SQL script.
6.  Click **Go** (or run) to execute the script and build your database structure.

*Note: In MySQL, single-line comments are written using `#` or `-- ` (dash-dash-space).*
