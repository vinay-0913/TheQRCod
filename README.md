# The QR Code Generator (SaaS)

A modern, full-stack Software as a Service (SaaS) application built with Next.js 16. It enables users to generate highly customizable static QR codes for free, and create trackable, dynamic QR codes through a premium subscription tier.

## 🚀 Features

*   **Static QR Generation:** Create unlimited, highly customizable static QR codes (colors, logos, dots styling) entirely client-side.
*   **Dynamic QR Codes:** Premium users can generate trackable QR codes where the destination URL can be changed anytime without re-printing the code.
*   **Real-Time Analytics Dashboard:** Track scan counts, geographical data, devices, browsers, and operating systems using a custom edge-optimized redirect handler and Recharts.
*   **Authentication:** Secure user login and session management powered by NextAuth.js (supporting Google OAuth and Email/Password credentials).
*   **Monetization / Subscriptions:** Integrated with the Razorpay API to process live payments and automatically upgrade user limits.
*   **SEO Optimized:** Server-Side Rendered (SSR) pages, dynamic XML sitemaps, and Schema.org JSON-LD structured data.

## 💻 Tech Stack

*   **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React, Recharts
*   **Backend:** Next.js Server Actions & API Routes, Node.js
*   **Database:** MongoDB, Mongoose (ODM)
*   **Authentication:** NextAuth.js (v5 / Auth.js), bcryptjs
*   **Payments:** Razorpay Node.js SDK
*   **Utilities:** qr-code-styling (QR generation), nanoid (URL shortener)
*   **Language:** TypeScript

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A MongoDB database (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
*   A [Razorpay](https://razorpay.com/) account (for payments)
*   A [Google Cloud Console](https://console.cloud.google.com/) project (for Google OAuth)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vinay-0913/TheQRCod.git
   cd qrcg-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (NextAuth)
   NEXTAUTH_SECRET=your_super_secret_string
   NEXTAUTH_URL=http://localhost:3000 # Use your production URL when deployed

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Razorpay (Payments)
   RAZORPAY_KEY_ID=your_razorpay_test_or_live_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_test_or_live_key_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). 

1. Push your code to a GitHub repository.
2. Import the repository in Vercel.
3. Make sure to set the **Root Directory** to `qrcg-app`.
4. Add all the environment variables from your `.env.local` file into the Vercel dashboard.
5. Click **Deploy**.

## 📄 License

This project is for personal portfolio and business use.
