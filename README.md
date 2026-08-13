# 🩸 BloodFinder

<p align="center">
  <img src="./bloodFinder.png" alt="BloodFinder Logo" width="140"/>
</p>

<h1 align="center">BloodFinder</h1>

<p align="center">
  <strong>Find the right blood. When it matters.</strong>
</p>

<p align="center">
  A modern blood donor discovery platform that connects people who need blood with compatible and available donors.
</p>

<p align="center">
  <a href="https://blood-finder-beta.vercel.app/">
    🌐 Live Demo
  </a>
  •
  <a href="#features">
    ✨ Features
  </a>
  •
  <a href="#tech-stack">
    🛠️ Tech Stack
  </a>
</p>

---

## 📌 About

**BloodFinder** is a web-based blood donation platform designed to make finding blood donors faster and easier.

Users can:

- 🔎 Find compatible blood donors
- 🩸 Register as a blood donor
- 📋 Browse registered donors
- 📍 Search donors by division
- ☎️ Contact available donors
- 🤖 Get intelligent donor matching scores
- ⚡ Find the most suitable donors based on blood compatibility and location

The platform is designed with a simple goal:

> **Make it easier for people to find the blood they need when every second matters.**

---

## 🌐 Live Website

🚀 **Try BloodFinder:**

👉 https://blood-finder-beta.vercel.app/

---

## ✨ Features

### 🩸 Donor Registration

Anyone can register as a blood donor by providing:

- Name
- Blood Group
- Division
- Phone Number

Registered donor information is stored securely in **Supabase**.

---

### 🔎 Find a Donor

Users can submit a blood request by selecting:

- Patient/requester name
- Required blood group
- Division

BloodFinder then searches for compatible available donors.

---

### 🤖 Smart Donor Matching

BloodFinder calculates a matching score for donors based on:

| Criteria | Score |
|---|---:|
| Exact Blood Group Match | +60 |
| Compatible Blood Group | +40 |
| Same Division | +25 |
| Available Donor | +15 |

The best matching donors are displayed first.

---

### 📋 Donor Directory

Users can browse the registered donor database and filter donors using:

- 🔎 Name
- ☎️ Phone number
- 🩸 Blood group
- 📍 Division

---

### 📞 Donor Request

When a user selects a suitable donor, BloodFinder displays the donor's information and provides their contact number so the requester can contact the donor directly.

---

### 📱 Responsive Design

BloodFinder is designed to work across:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

---

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/DaisyUI-5-5A0EF8?style=for-the-badge"/>
</p>

### Backend / Database

<p>
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
</p>

### Routing & Forms

- React Router
- React Hook Form

### Deployment

- Vercel

---

## 🏗️ Project Structure

```text
blood-finder/
│
├── public/
│   └── bloodFinder.png
│
├── src/
│   │
│   ├── components/
│   │   ├── AIScoreResult.jsx
│   │   ├── DonorFind.jsx
│   │   ├── DonorList.jsx
│   │   ├── DonorRegistry.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Donors.jsx
│   │   └── FindDonor.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── supabaseClient.js
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
