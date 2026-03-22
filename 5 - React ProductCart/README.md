# 🛒 React Product Cart App

A simple and clean product cart system built with React. This project demonstrates core frontend concepts like state management, component structure, and UI design using Tailwind CSS.

---

## 🚀 Features

* 🛍️ Product listing page
* ❤️ Add / remove products from favourites
* 🛒 Add / remove products from cart
* 📦 Cart modal with total calculation
* 💡 Favourites modal with quick add-to-cart
* 📱 Fully responsive UI (mobile + desktop)
* ⚡ Smooth and modern UI with Tailwind CSS

---

## 🧠 Concepts Used

* React Hooks (`useState`, `useReducer`)
* Component-based architecture
* Props drilling (lifting state up)
* Conditional rendering
* Basic state management (cart & favourites)
* Tailwind CSS for styling

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Navbar/
│   │   └── navbar.jsx
│   │
│   ├── ProductCard/
│   │   └── ProductCard.jsx
│   │
│   ├── ProductList/
│   │   └── ProductList.jsx
│   │
│   ├── ProductModal/
│   │   ├── FavModal.jsx
│   │   └── ProductModal.jsx
│   │
│   └── Modal.jsx
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🔄 State Flow

* `App.jsx` manages global state using `useReducer`
* State is passed down to components via props
* Actions are dispatched from:

  * Product cards
  * Cart modal
  * Favourite modal

```
Navbar → triggers modal
ProductCard → dispatch actions
Modal → reads & updates state
```

## 🎯 Usage

* Browse products on the main page
* Click ❤️ to add/remove favourites
* Click 🛒 to add items to cart
* Open cart from navbar to review items
* View favourites and quickly move items to cart

---

## ⚠️ Notes

* This project uses local state (no backend or database)
* Data is not persisted after refresh
* Built for learning and demonstration purposes

---

## 🙌 Contributing

Feel free to fork this project and improve it. PRs are welcome.

---

## 📄 License

This project is open-source and free to use.

---

## 💬 Final Thought

This project focuses on **clean UI + simple architecture** without overengineering.
Perfect for learning how real-world React apps manage UI and state together.
