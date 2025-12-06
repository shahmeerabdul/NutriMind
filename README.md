# NutriMind - Mood-Aware, Medical-Aware Meal Planner

A full-stack web application that generates personalized daily meal plans based on your mood, medical conditions, and health goals.

## Features

- 🎯 **Mood-Aware Planning**: Meal plans adapt to your daily mood (happy, stressed, tired, sad, energetic, lazy)
- 🏥 **Medical-Aware**: Respects medical conditions like diabetes, hypertension, allergies, and dietary restrictions
- 📊 **Goal-Oriented**: Personalized plans for weight loss, weight gain, maintenance, or energy boost
- 📝 **Complete Meal Plans**: Includes breakfast, lunch, dinner, and snacks with:
  - Calorie counts
  - Macronutrient breakdown
  - Complete ingredient lists
  - Step-by-step cooking instructions
  - Reasoning for each meal choice
- 🛒 **Grocery Lists**: Automatically generated shopping lists
- 📈 **Nutrition Charts**: Visual breakdown of daily nutrition

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React.js + Vite
- TailwindCSS
- React Router
- Axios
- Recharts for data visualization
- React Hot Toast for notifications

## Project Structure

```
NutriWatch/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── mealController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   └── Recipe.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   └── mealRoutes.js
│   ├── scripts/
│   │   └── seedRecipes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nutrimind
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Make sure MongoDB is running on your system.

5. Seed the database with sample recipes:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile/:id` - Get user profile
- `PUT /api/profile/:id` - Update user profile

### Meals
- `POST /api/meals/generate` - Generate meal plan
  - Body: `{ mood, medicalConditions, goals, profileId }`

## Usage

1. **Register/Login**: Create an account or login to your existing account
2. **Complete Profile**: Fill in your age, weight, height, activity level, medical conditions, and dietary preferences
3. **Generate Meal Plan**: 
   - Select your current mood
   - Choose your health goal
   - Optionally override medical conditions
   - Click "Generate Meal Plan"
4. **View Results**: See your personalized meal plan with recipes, nutrition info, and grocery list
5. **Regenerate**: Create a new plan anytime

## Meal Generation Logic

- **Calorie Calculation**: Uses Mifflin-St Jeor equation with activity level multipliers
- **Mood Mapping**: 
  - Tired → Complex carbs + iron-rich foods
  - Stressed → Magnesium-rich, low-sodium meals
  - Sad → Dopamine-boosting foods
  - Energetic → Balanced macros
  - Lazy → Quick-prep meals
- **Medical Constraints**: Filters recipes based on conditions (diabetes, hypertension, allergies, etc.)
- **Dietary Restrictions**: Respects vegetarian, vegan, keto, paleo, etc.

## Development

### Backend Development
- Uses nodemon for auto-reload during development
- API routes are protected with JWT authentication middleware
- Error handling and validation included

### Frontend Development
- Hot module replacement with Vite
- React Context for state management
- Protected routes for authenticated pages
- Responsive design with TailwindCSS

## License

ISC

## Notes

- Make sure MongoDB is running before starting the backend
- Update JWT_SECRET in production
- The seed script populates the database with sample recipes
- All passwords are hashed using bcrypt before storage

