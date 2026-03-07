# Income Expense Calculator

This is a simple web-based income and expense tracker implemented using HTML, Tailwind CSS, and vanilla JavaScript. The data is stored in the browser's `localStorage`, allowing users to add, edit, and remove transaction records.

## 📄 Pages

### 1. Add/Edit Transaction (`index.html`)

- **Fields:**
  - Name
  - Type (Income or Expense)
  - Price
  - Date
  - Description
- **Actions:**
  - **Save:** Validates the form and stores the record in `localStorage`. When editing an existing entry, updates the record instead.
  - **Clear:** Resets the form fields to their default values.
  - **Back to List:** Link to return to the transaction list page.
- When a record is successfully saved, a SweetAlert2 popup confirms the action and redirects to the list page.

### 2. Transaction List (`list.html`)

- **Displays:**
  - Table of all transactions (with columns: Sr, Type, Name, Price, Date, Description, Actions)
  - Total Income, Total Expense, and Net Balance boxes
- **Features:**
  - **Filters:** Three radio buttons to view All, Income only, or Expense only transactions.
  - **Edit:** Opens the add/edit page with the record’s data populated.
  - **Delete:** Removes the transaction from `localStorage` after confirmation via SweetAlert2.
  - Defaults to showing "No transactions found" when the list is empty.

## ⚙️ Functionality Details

- Data is fetched from and saved to `localStorage` under the key `Data`.
- The listing page recalculates totals and filter-based views each time the data or selected filter changes.
- The application uses Tailwind CSS for styling and SweetAlert2 for alerts.

## 🚀 Usage

1. Open `index.html` to add a new transaction or edit an existing one (use `?id=<transactionId>` to activate edit mode).
2. Fill in the required fields and click **Save**.
3. Use the **Clear** button to reset inputs without saving.
4. Navigate to the list page to view, filter, edit, or delete records.

## 🛠️ Notes

- No backend is required; everything runs in the browser.
- Records persist between sessions via `localStorage`.
- Validation ensures required fields are filled before saving.