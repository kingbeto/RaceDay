const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(data);
    log('green', `✓ ${path.basename(filePath)} - Valid JSON`);
    return parsed;
  } catch (error) {
    log('red', `✗ ${path.basename(filePath)} - Invalid JSON: ${error.message}`);
    return null;
  }
}

function validateTrainingPlan(data) {
  log('blue', '\n📊 Validating Training Plan...');
  
  if (!data) return false;
  
  // Check required fields
  const requiredFields = ['id', 'title', 'weeks'];
  for (const field of requiredFields) {
    if (!data[field]) {
      log('red', `✗ Missing required field: ${field}`);
      return false;
    }
  }
  
  log('green', `✓ Found ${data.weeks.length} weeks`);
  
  // Check weeks structure
  for (const week of data.weeks) {
    if (!week.id || !week.rows || !Array.isArray(week.rows)) {
      log('red', `✗ Invalid week structure: ${week.id || 'unknown'}`);
      return false;
    }
  }
  
  const totalDays = data.weeks.reduce((sum, week) => sum + week.rows.length, 0);
  log('green', `✓ Total training days: ${totalDays}`);
  
  return true;
}

function validateNutritionPlan(data) {
  log('blue', '\n🍽️ Validating Nutrition Plan...');
  
  if (!data) return false;
  
  const dates = Object.keys(data);
  log('green', `✓ Found nutrition data for ${dates.length} days`);
  
  // Check sample nutrition data structure
  for (const [date, nutrition] of Object.entries(data)) {
    if (!nutrition.meals || !Array.isArray(nutrition.meals)) {
      log('red', `✗ Invalid nutrition structure for date: ${date}`);
      return false;
    }
    
    // Check first few entries only
    if (dates.indexOf(date) < 3) {
      log('green', `✓ ${date}: ${nutrition.meals.length} meals, ${nutrition.totalCalories} kcal`);
    }
  }
  
  return true;
}

function validateGroceryLists(data) {
  log('blue', '\n🛒 Validating Grocery Lists...');
  
  if (!data) return false;
  
  const weeks = Object.keys(data);
  log('green', `✓ Found grocery lists for ${weeks.length} weeks`);
  
  for (const week of weeks) {
    const categories = data[week];
    if (!Array.isArray(categories)) {
      log('red', `✗ Invalid grocery structure for week: ${week}`);
      return false;
    }
    
    const totalCategories = categories.length;
    log('green', `✓ ${week}: ${totalCategories} categories`);
  }
  
  return true;
}

function main() {
  log('blue', '🏃‍♂️ RaceDay Data Validation\n');
  
  const dataDir = path.join(__dirname, 'app', 'data');
  
  // Validate JSON files
  const trainingData = validateJSON(path.join(dataDir, 'el-cruce-plan.json'));
  const nutritionData = validateJSON(path.join(dataDir, 'nutrition-plan.json'));
  const groceryData = validateJSON(path.join(dataDir, 'grocery-lists.json'));
  
  // Validate data structure
  const validTraining = validateTrainingPlan(trainingData);
  const validNutrition = validateNutritionPlan(nutritionData);
  const validGrocery = validateGroceryLists(groceryData);
  
  // Summary
  log('blue', '\n📋 Summary:');
  
  if (validTraining && validNutrition && validGrocery) {
    log('green', '✅ All data validation passed! The Vue app should load successfully.');
  } else {
    log('red', '❌ Data validation failed. Please fix the issues above.');
  }
}

main();
