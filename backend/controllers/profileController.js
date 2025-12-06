import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id }).populate('userId', 'name email');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      age,
      sex,
      weight,
      height,
      activityLevel,
      dietaryRestrictions,
      medicalConditions,
      cuisinePreferences,
      dislikedFoods,
    } = req.body;

    let profile = await Profile.findOne({ userId: req.params.id });

    if (!profile) {
      // Create profile if it doesn't exist
      profile = await Profile.create({
        userId: req.params.id,
        age,
        sex,
        weight,
        height,
        activityLevel,
        dietaryRestrictions,
        medicalConditions,
        cuisinePreferences,
        dislikedFoods,
      });
    } else {
      // Update existing profile
      profile.age = age ?? profile.age;
      profile.sex = sex ?? profile.sex;
      profile.weight = weight ?? profile.weight;
      profile.height = height ?? profile.height;
      profile.activityLevel = activityLevel ?? profile.activityLevel;
      profile.dietaryRestrictions = dietaryRestrictions ?? profile.dietaryRestrictions;
      profile.medicalConditions = medicalConditions ?? profile.medicalConditions;
      profile.cuisinePreferences = cuisinePreferences ?? profile.cuisinePreferences;
      profile.dislikedFoods = dislikedFoods ?? profile.dislikedFoods;

      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

