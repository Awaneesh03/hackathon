<div align="center">

# 🛵 CampusDash

**Instant delivery & micro-commerce for college campuses — built at a hackathon.**

Students post a request (food, stationery, medicines, chargers, laundry or any errand), and fellow students — *Dashers* — pick it up and deliver it within minutes.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure)

</div>

---

## 💡 The Problem

On campus, getting something small — a snack from the canteen, a charger, a medicine, a printout — often means leaving your room, class or study session. CampusDash turns the students already moving around campus into an on-demand delivery network.

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🍔 | **Categories** | Food pickup, hostel needs, stationery, medicines, tech & chargers, laundry, and custom errands |
| 📝 | **Create a request** | Describe what you need, where it should go, and submit in a few taps |
| 🏃 | **Dasher mode** | Students can accept open requests and earn by delivering them |
| 📍 | **Order tracking** | Live status of every request from *posted* → *picked up* → *delivered* |
| 🔔 | **Notifications** | Real-time updates powered by Supabase Realtime |
| 🤖 | **AI chatbot** | Built-in assistant that helps users place requests and answers FAQs |
| 🧾 | **Canteen QR upload** | Upload a canteen payment QR so the Dasher can pay on your behalf |
| 🔐 | **Authentication** | Email sign-up / login (Google OAuth optional) via Supabase Auth |
| 📱 | **Installable PWA** | Web manifest + service worker so it can be installed like a mobile app |

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, vanilla JavaScript (no framework, no build step)
- **Backend / Database:** [Supabase](https://supabase.com) — PostgreSQL, Auth, Realtime
- **Offline / install:** Service Worker + Web App Manifest

**Database tables:** `users`, `requests`, `notifications`, `reviews`, `transactions`, `dasher_stats`, `chat_messages`, `saved_locations`

## 🚀 Getting Started

### Prerequisites
- A free [Supabase](https://supabase.com) project
- Any static file server (VS Code Live Server, `python3 -m http.server`, etc.)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Awaneesh03/hackathon.git
cd hackathon

# 2. Serve the files locally
python3 -m http.server 8000
# → open http://localhost:8000
```

3. **Create the database** — open the Supabase SQL Editor and run [`database-schema.sql`](database-schema.sql). Step-by-step guide: [`DATABASE-SETUP.md`](DATABASE-SETUP.md).
4. **Enable auth** — follow [`AUTH-SETUP.md`](AUTH-SETUP.md).
5. **Connect your project** — put your own Supabase URL and anon key in [`supabase-client.js`](supabase-client.js).

## 📁 Project Structure

```text
hackathon/
├── index.html            # Landing page & category grid
├── login.html            # Login / sign-up
├── request.html          # Create a delivery request
├── food.html · hostel.html · stationery.html · medicines.html · tech.html · laundry.html · custom.html
├── dasher.html           # Dasher view — accept open requests
├── task.html             # Active pickup task for a Dasher
├── tracking.html         # Order tracking
├── upload-qr.html        # Canteen payment QR upload
├── success.html          # Request confirmation
├── auth.js               # Auth helpers
├── supabase-client.js    # Supabase client setup
├── notifications.js      # Realtime notifications
├── chatbot.js            # In-app AI assistant
├── service-worker.js     # PWA offline support
├── manifest.json         # PWA manifest
├── database-schema.sql   # Full database schema
└── styles.css · shared.css · shared.js · script.js
```

## 🗺 Roadmap

- [ ] In-app payments & Dasher earnings wallet
- [ ] Push notifications on mobile
- [ ] Live map tracking of the Dasher

---

## 👤 Author

**Awaneesh Gupta** — B.Tech CSE (AI) @ Vedam School of Technology

[![GitHub](https://img.shields.io/badge/GitHub-Awaneesh03-181717?style=flat-square&logo=github)](https://github.com/Awaneesh03)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-awaneesh--gupta-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/awaneesh-gupta)

<p align="center"><sub>If you found this project useful, consider giving it a ⭐</sub></p>
