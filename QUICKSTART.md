# NutriMind - Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **npm** (comes with Node.js) or **yarn**

## Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Backend Environment

Create a `.env` file in the `backend` directory:

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env
```

Add the following content to `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nutrimind
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### Step 3: Start MongoDB

**Local MongoDB:**
- Windows: MongoDB should start automatically as a service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

**MongoDB Atlas:**
- No local setup needed, just use your connection string in `.env`

### Step 4: Seed the Database

```bash
cd backend
npm run seed
```

You should see: `Seeded X recipes`

### Step 5: Start Backend Server

```bash
# In the backend directory
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 6: Install Frontend Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

### Step 7: Start Frontend Development Server

```bash
# In the frontend directory
npm run dev
```

The frontend will run on `http://localhost:3000`

## First Time Usage

1. **Open your browser** and navigate to `http://localhost:3000`

2. **Register a new account:**
   - Click "Sign Up"
   - Enter your name, email, and password
   - Click "Create account"

3. **Complete your profile:**
   - You'll be redirected to the profile page
   - Fill in your age, weight, height, activity level
   - Select any dietary restrictions and medical conditions
   - Click "Save Profile"

4. **Generate your first meal plan:**
   - Click "Generate Meal Plan" in the navigation
   - Select your current mood (e.g., "Tired", "Stressed")
   - Choose your goal (e.g., "Lose Weight", "Maintain")
   - Optionally override medical conditions
   - Click "Generate Meal Plan"

5. **View your meal plan:**
   - See your personalized breakfast, lunch, dinner, and snacks
   - Check nutrition breakdown
   - View the grocery list
   - Copy the grocery list to your clipboard

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoDB connection error`

**Solutions:**
- Ensure MongoDB is running: `mongod --version`
- Check your `.env` file has the correct `MONGODB_URI`
- For MongoDB Atlas, ensure your IP is whitelisted and connection string is correct

### Port Already in Use

**Problem:** `Port 5000 is already in use` or `Port 3000 is already in use`

**Solutions:**
- Change the port in `backend/.env` (for backend)
- Change the port in `frontend/vite.config.js` (for frontend)
- Or stop the process using the port

### No Recipes Found

**Problem:** Meal generation fails with "Could not generate meal plan"

**Solution:**
- Run the seed script: `cd backend && npm run seed`
- Check MongoDB connection
- Verify recipes exist: Check MongoDB database `nutrimind` collection `recipes`

### CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
- Ensure backend is running on port 5000
- Check `frontend/vite.config.js` has the proxy configured correctly
- Verify backend CORS is enabled (it should be by default)

## Development Tips

- **Backend auto-reload:** Uses nodemon, so changes auto-restart the server
- **Frontend hot-reload:** Vite provides instant updates on file changes
- **Database reset:** Delete the database and run `npm run seed` again
- **View logs:** Check terminal output for both frontend and backend

## Next Steps

- Customize recipes in `backend/scripts/seedRecipes.js`
- Add more meal types or tags
- Extend the mood-to-food mapping logic
- Add more medical condition filters
- Implement weekly meal planning
- Add meal plan saving functionality

## Need Help?

- Check the main `README.md` for detailed documentation
- Review the API endpoints in `backend/routes/`
- Examine the component structure in `frontend/src/`

Happy meal planning! 🍽️

