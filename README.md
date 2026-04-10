## 🧴 Skinstric – AI Skincare Analysis Experience

This is an interactive web application that simulates an AI-powered skincare analysis experience. Users are guided through a multi-step flow where they input personal data, capture or upload an image, and receive a dynamic “AI analysis” of demographic attributes such as age, race, and gender.

The project emphasizes smooth UI transitions, responsive design, and a polished, modern user experience inspired by high-end product interfaces.

---

## 🚀 Features

* **Multi-step user flow**

  * Landing page → Form → Upload/Capture → Analysis Summary

* **AI-style analysis visualization**

  * Dynamic percentage circle with animated transitions
  * Category switching (race, age, gender)
  * Sorted confidence breakdown panel

* **Camera & image upload**

  * Device camera integration
  * Image preview and confirmation flow
  * Local storage persistence between pages

* **Advanced UI/UX interactions**

  * Custom hover animations (expanding diamond, pulse effects)
  * Smooth transitions and easing curves
  * Responsive layout across desktop and mobile

* **State persistence**

  * Analysis data stored in `localStorage`
  * Seamless handoff between routes

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** React Icons
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Deployment:** Vercel

---

## 🧠 Key Implementation Details

* **Hydration-safe data loading**

  * Client-only data (`localStorage`) is accessed within `useEffect` to prevent SSR mismatches.

* **Derived state handling**

  * Default selections are computed dynamically instead of being redundantly stored in state.

* **Animation handling**

  * SVG stroke manipulation (`strokeDashoffset`) is used for the circular progress animation.
  * Edge cases (e.g., 0%) are handled to prevent rendering artifacts.

* **Responsive design strategy**

  * Layout shifts from absolute positioning (desktop) to stacked flex layouts (mobile)
  * Uses `clamp()` and Tailwind breakpoints for fluid scaling

---

## 📱 Responsiveness

The application is optimized for:

* Desktop (primary experience)
* Tablet
* Mobile (including small-width devices)

Special care was taken to:

* Prevent overflow issues
* Maintain visual hierarchy
* Ensure interactive elements remain accessible

---

## ⚠️ Notes

* AI analysis is simulated for demonstration purposes
* No real image processing or ML model is used

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## 🌐 Deployment

The project is deployed on Vercel and optimized for production using:

```bash
npm run build
```

---

## ✨ Future Improvements

* Integrate real AI/ML image analysis
* Add user authentication
* Store results in a database
* Enhance animation system with Framer Motion
