# 🛍️ KrushiStore

A modern dark-themed e-commerce UI built with React, featuring cart management, favorites, and a clean shopping experience.

🔗 **Live Demo:** https://krushistore.netlify.app/

---

## 🚀 Features

* 🧾 **Product Listing (API)**
  Fetches real product data using Axios.

* 🛒 **Cart System**

  * Add to cart
  * Remove from cart
  * Quantity management (increment/decrement)
  * Dynamic total calculation

* ❤️ **Favorites System**

  * Add/remove favorites
  * View in modal

* 💸 **Discount Logic**

  * Flat **10% discount** applied on total price

* 🌙 **Dark UI**

  * Fully dark-themed interface
  * Consistent design system (glass + gradients + glow)

* 📱 **Responsive Design**

  * Works across mobile, tablet, and desktop

* 🧩 **Modal System**

  * Favorites displayed in modal
  * Clean overlay with blur effect

---

## 🛠️ Tech Stack

* **React (Vite)**
* **Tailwind CSS (CDN)**
* **React Router**
* **Context API + useReducer**
* **Axios**

---

## 📁 Folder Structure

```
src/
│
├── assets/
├── components/
│   ├── Cart/
│   │   └── Cart.jsx
│   ├── Navbar/
│   │   └── navbar.jsx
│   ├── ProductCard/
│   │   └── ProductCard.jsx
│   ├── ProductList/
│   │   └── ProductList.jsx
│   ├── ProductModal/
│   │   ├── FavModal.jsx
│   │   └── ProductModal.jsx
│   │── footer.jsx
│   │── header.jsx
│   └── Modal.jsx
│
├── App.jsx
├── CartContext.jsx
├── CartProvider.jsx
├── main.jsx
```

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/krushistore.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

---

## 🧠 How It Works

* Global state is managed using **Context API + useReducer**
* Cart logic handles:

  * Quantity updates
  * Price calculations
  * Discount application
* Products are fetched once and cached in state
* UI follows a **consistent dark design system**:

  * Background: `#020617`
  * Cards: `#0f172a`
  * Accent: gradient (pink → purple → indigo)

---

## 🔮 Future Improvements

* 🧮 Coupon code system (dynamic discounts)
* 💾 Cart persistence (localStorage)
* 🔔 Toast notifications (instead of alerts)
* 🎬 Animations (Framer Motion)
* 🛒 Cart drawer instead of modal
* 🔍 Search & filtering

---

## 👨‍💻 Author

Built with focus on clean UI and real-world logic by **Krushi**

---

## 💥 Final Note

This project goes beyond basic CRUD—it focuses on:

* UI consistency
* State management
* Real cart behavior

A solid step toward production-level frontend development.
