# Express MongoDB App

This is a simple Express.js application with MongoDB integration and car details functionality.

## Installation

1. Install dependencies: `npm install`
2. Create a `.env` file with your MongoDB connection string: `MONGO_URI=your_mongodb_uri`
3. Start MongoDB (if using local) or ensure Atlas connection
4. Run the app: `npm start`

## Database Structure

This application uses **two separate MongoDB collections** for optimal performance:

### 1. `cars` Collection (Basic Info for Cards/Lists)
Used for landing page and car listings. Contains minimal fields for fast loading.

```javascript
{
  "id": "bmw-x5-2023",
  "name": "BMW X5",
  "year": 2023,
  "priceGel": 120000,
  "priceUsd": 38000,
  "oldPriceGel": 125000,
  "oldPriceUsd": 40000,
  "mainPic": "https://example.com/bmw-x5.jpg",
  "isForLanding": true
}
```

### 2. `cardetails` Collection (Full Details)
Used for individual car detail pages. Contains all information including specifications.

```javascript
{
  "id": "bmw-x5-2023",
  "name": "BMW X5",
  "year": 2023,
  "priceGel": 120000,
  "priceUsd": 38000,
  "oldPriceGel": 125000,
  "oldPriceUsd": 40000,
  "mainPic": "https://example.com/bmw-x5.jpg",
  "additionalPics": ["pic1.jpg", "pic2.jpg"],
  "horsePower": 375,
  "gasolineType": "Diesel",
  "doors": "5",
  "description": "Luxury SUV...",
  "engine": "3.0L Turbo Diesel",
  "transmission": "Automatic",
  "drivetrain": "AWD",
  "fuelEconomy": { "city": 22, "highway": 28 },
  "features": ["Leather Seats", "Navigation", "Sunroof"],
  "color": "Black",
  "mileage": 15000,
  "vin": "VIN123456",
  "condition": "used"
}
```

## Data Management

**Manual Management Only** - Add data directly to MongoDB using your preferred tools:

- MongoDB Compass
- Studio 3T
- MongoDB Shell
- MongoDB Atlas web interface

### Adding Sample Data

```bash
npm run add-sample
```

This adds sample cars to the `cars` collection. You can then manually add corresponding detailed information to the `cardetails` collection.

## 🚀 Deployment

### Vercel Deployment

This app is configured for **Vercel serverless deployment**:

1. **Connect your GitHub repo to Vercel**
2. **Add environment variable**: `MONGO_URI=your_mongodb_connection_string`
3. **Deploy automatically** - Vercel will build and deploy your app

### API Endpoints

- `GET /` - Welcome message with available endpoints
- `GET /api/health` - Health check
- `GET /api/landing` - Returns landing page data from `cars` collection
- `GET /api/cars/[id]` - Returns detailed car info from `cardetails` collection

### Vercel Configuration

- **Framework**: Serverless Functions
- **Runtime**: Node.js with ES modules
- **Database**: MongoDB Atlas
- **Routes**: Automatic API routing via `/api/*`

## 🛠️ Development vs Production

- **Development**: Run locally with `npm start`
- **Production**: Automatic deployment on Vercel
- **Database**: Same MongoDB instance for both environments

### Car Details Page

Visit `http://localhost:3000/car-details.html` to see the car details page for the sample Toyota Corolla.

## Features

- Modern ES6+ JavaScript with modules
- MongoDB integration with Mongoose
- Environment variable configuration
- RESTful API endpoints
- Responsive car details page
- Error handling and health checks