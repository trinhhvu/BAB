# 🖤 BAB — Back Alley Boyz Shop

> A modern e-commerce web app for a Vietnamese streetwear brand — built as a personal project to practice real-world frontend development.

[![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Status](https://img.shields.io/badge/Status-In_Development-orange?style=flat-square)]()

🔗 **Live Demo:** [backalleyboiz.netlify.app](https://backalleyboiz.netlify.app/)

## 💡 Introduction & Goals
Welcome to the repository of **Back Alley Boyz Shop**. This is an e-commerce website inspired by a streetwear brand from an older brother that I greatly respect and love.

This project was built with the following goals:
- **Challenge & Learn:** Build a real-world e-commerce website using React and modern technologies.
- **Respect & Support:** This is my way of showing support and learning from the amazing products of the brand.

---

### 🛍️ Customer Area
| Feature | Details |
|---|---|
| **Product Grid** | Responsive product list with a cool image swap effect on hover. |
| **Category Filter** | Instantly filter products by ALL / TOPS / ACCESSORIES. |
| **Product Detail** | Detailed page showing color variants and prices. |
| **Mini Cart** | Slide-in drawer cart from the right, auto-calculates total price. |
| **Lookbook Gallery** | A place to view collections, with a slider to adjust the number of image columns. |
| **Pop-up Events** | Updates on offline activities and brand events. |
| **Brand Story** | An "About" page with a strong streetwear typography design. |
| **Loading Screen** | A preloader screen with the brand logo (progress bar goes 0% → 100%). |

### 👑 Admin Dashboard
| Feature | Details |
|---|---|
| **Auth Security** | Admin route is strictly protected by **Supabase Authentication** (Email & Password). |
| **Add Product** | Upload new products to the real Database, appearing on the site instantly (Real-time). |
| **Edit/Delete (C.R.U.D)** | Manage, edit information, prices, or delete junk items from the DB. |
| **Sold-out Toggle** | Mark items as "Sold Out" with 1 click. The site auto-dims the image and adds a red stamp. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React (v19) + React Router DOM |
| **Styling** | Modular CSS (Plain CSS separated into smaller files for easier maintenance) |
| **Backend / Database** | Supabase (Cloud PostgreSQL + Supabase Auth) |
| **Compile & Build Tool** | Vite |
| **CI/CD Hosting** | Netlify (Auto deploys every time code is pushed to Github) |

---

## 🚀 Getting Started

If you want to view the source code and test it on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/trinhhvu/BAB.git

# 2. Go to the app folder
cd BAB/bab-shop-react

# 3. Install dependencies
npm install

# 4. Start the server
npm run dev
```

The website will run at: `http://localhost:5173/`

---

## 📁 Folder Structure

```text
bab-shop-react/
├── public/                 # Static product images, icons
├── src/
│   ├── components/         # Shared UI components (Header, Footer, Cart, Menu...)
│   ├── data/               # Local data as a backup if DB fails
│   ├── pages/              # Main pages (Home, About, Admin, Lookbook...)
│   ├── services/           # Contains 'productService.js' connecting to the API
│   └── styles/             # Modular CSS files (*.css split apart)
├── .env.example            # Sample environment variables
├── vite.config.js          # Vite configuration
└── package.json            # Library information
```

---

## 🗺️ Roadmap

- [x] Product listing & category filter
- [x] Admin dashboard with full CRUD
- [x] Mini cart drawer
- [x] Lookbook interactive gallery
- [x] Supabase Auth & real-time DB
- [ ] Online payment (Stripe / MoMo)
- [ ] Drag & drop image upload to Supabase Storage
- [ ] Order management system

---

## ⚠️ Disclaimer

To avoid any misunderstandings, I want to clarify:
1. **Not for commercial use:** This project is **NOT** for business purposes, selling products, or seeking profit.
2. **Image copyrights:** I do **NOT** use images, logos, or intellectual property of the brand for personal gain. All materials in the code are strictly for technical practice.
3. **Respect:** This project fully respects the intellectual property rights of the original brand. If there are any issues regarding images or content, all data will be removed immediately upon request.

---

## 👤 Author

**Trinh Vu**
- GitHub: [@trinhhvu](https://github.com/trinhhvu)

---

*Thanks for checking out my learning project! 🖤*
