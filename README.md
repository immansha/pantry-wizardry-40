
Pantry wizardry(Smart Recipe Generator)

**Your personal AI chef — transforming fridge ingredients into smart, healthy recipes!**

---

## 🌍 **Overview**

Cooking shouldn’t be stressful.
The **Smart Recipe Generator** uses **AI-powered ingredient recognition** and a **recipe-matching algorithm** to instantly suggest dishes based on what’s available in your kitchen.
It not only recommends recipes but also personalizes them for your **dietary preferences**, **nutrition goals**, and **time constraints** — all wrapped in a **beautiful, responsive, animated dark UI**.

---

## ⚡ **Problem Statement**

People waste ingredients because they don’t know what to cook with them. Existing recipe apps require manual searching and ignore available resources.
This project solves that by enabling users to:

* Upload a photo or list of ingredients.
* Get curated recipes instantly.
* Learn cooking steps, nutrition info, and alternatives — all in one place.

---

## 💡 **Our Solution**

A full-stack AI-driven web app that:

1. **Understands your ingredients** using image and text recognition.
2. **Generates the best-matched recipes** from its intelligent database.
3. **Adapts to your dietary and time preferences** dynamically.
4. **Engages users** with a stunning interactive interface and smart feedback system.

---

## 🧩 **Key Features**

### 👁️ Ingredient Detection

* Upload ingredient photo → AI identifies items (using MobileNet/Google Vision API).
* Manual input option with auto-suggestions.

### 🍽️ Recipe Generation

* Multiple recipes ranked by ingredient match score.
* Cooking steps, difficulty level, cook time, and serving size.
* Substitution suggestions for missing items.
* Nutritional breakdown for each dish.

### 🎛️ Filters & Personalization

* Filter by cooking time, difficulty, and dietary restrictions.
* Auto-adjust ingredient quantities based on serving size.
* Personalized “Suggested for You” section based on previous ratings.

### 💬 User Interaction

* Rate and save favorite recipes (stored via localStorage or DB).
* Dynamic feedback loop that improves recommendations.

### 🌙 Dark UI + Visual Motion

* Animated glassmorphism interface.
* Scroll-triggered fades, gradient glows, hover lifts, and ripple effects.
* Fully responsive across devices.

### ⚙️ Error & State Handling

* Graceful handling for invalid inputs or empty matches.
* Loading skeletons and fallback recommendations.

---



## 🧮 **Algorithmic Approach**

**1. Ingredient Recognition →** Extract ingredients from image/text.
**2. Normalization →** Map synonyms (e.g., “capsicum” → “bell pepper”).
**3. Recipe Scoring →**
[
\text{Match Score} = \frac{\text{Matched Ingredients}}{\text{Total Ingredients in Recipe}} \times 100
]
**4. Sorting →** Rank by score, dietary compatibility, and time.
**5. Output →** Display best recipes + nutritional data.

---

## 🧾 **Evaluation Criteria Mapping**

| Criteria                  | Implementation                              |
| ------------------------- | ------------------------------------------- |
| Ingredient classification | AI-based recognition                        |
| Recipe matching logic     | Weighted score algorithm                    |
| Error handling            | Fallback recipes + input validation         |
| UI/UX                     | Animated dark mode, responsive, interactive |
| Hosting                   | Deployed on Netlify + Render                |
| Documentation             | Full README + structured architecture       |

---

## 🚀 **How to Run Locally**

```bash
# Clone the repo
git clone https://github.com/your-username/smart-recipe-generator.git
cd smart-recipe-generator

# Install dependencies
npm install

# Start server
npm start
```

Visit: `http://localhost:3000`

---


---

