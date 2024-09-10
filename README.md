


# Sports Facility Management - SFORCE

## Introduction

This is a website for sports facility management. Where one user can book sports facility all over the world. It's so easy. Just pick the location, date, time and you are on!. Just play
## Project Description

This is a website for booking sports facility. You have dashboard, facility list, admin panel, user panel and so on. Explore all facility and book your facility. Pay with stripe payment system
## Features

- Searching from all facility
- Filter facility by price
- Add, Update, Delete facility
- Image upload using imgbb
- Pagination, Responsiveness, Sorting
- Booking, Booking Management
- Checkout in Stripe payment method

## Technology Stack

- React, Redux, RTK Query, Imgbb api, Stripe, React hook form, sonner, React icons, sweetalert2, tailwind css, animate css, lucide react, moment, react fast marquee, zod, typescript

## Installation Guideline

> First you have to clone the project. <br>
> After successfully clone the project, open that folder and type "npm i" <br>
> Then type "npm run dev" <br>
> Your project will run on localhost <br>
> You have to add  VITE_IMAGE_HOSTING_KEY and VITE_Payment_Gateway_PK in .env.local file. Create it in root folder and put your key <br>


### Installation Steps

1. First you have to clone the project.
2. After successfully clone the project, open that folder and type "npm i"
3. Then type "npm run dev"
4. Your project will run on localhost
5. You have to add  VITE_IMAGE_HOSTING_KEY and VITE_Payment_Gateway_PK in `.env.local` file. Create it in root folder and put your key

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add necessary configuration variables in the `.env.local` file.
   Example:
   ```bash
    VITE_IMAGE_HOSTING_KEY=Hosting key from imgbb
    VITE_Payment_Gateway_PK=Stripe key from stripe development profile
   ```
