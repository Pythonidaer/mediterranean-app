import type { CuratedRecipe } from "../types/recipe";

export const curatedRecipes: CuratedRecipe[] = [
  {
    id: "1",
    slug: "chicken-hummus-wraps",
    title: "Chicken Hummus Mediterranean Wraps",
    description:
      "Tender grilled chicken layered with creamy hummus, crisp cucumbers, tomatoes, and olives in a whole-wheat wrap. Perfect for grab-and-go lunches all week.",
    imageUrl:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
    categories: ["Wraps", "High Protein"],
    featured: true,
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 20,
    storageDays: 4,
    storageInstructions:
      "Store wraps assembled but with wet ingredients (tomatoes, cucumbers) kept separate. Wrap tightly in foil or parchment and refrigerate for up to 4 days.",
    reheatingInstructions:
      "Eat cold or wrap in foil and heat in a 180°C (350°F) oven for 10 minutes. Microwave for 60–90 seconds on medium.",
    mealPrepNotes: [
      "Grill all chicken at once and slice after cooling.",
      "Store hummus separately in a small container to prevent sogginess.",
      "Prep chopped vegetables in a single batch and refrigerate in airtight containers.",
    ],
    substitutions: [
      "Swap chicken for grilled halloumi for a vegetarian version.",
      "Use gluten-free wraps or lettuce leaves for a low-carb option.",
      "Any nut butter or white bean spread works in place of hummus.",
    ],
    ingredients: [
      { name: "Chicken thighs", normalizedName: "chicken", amount: "600g" },
      {
        name: "Whole-wheat wraps",
        normalizedName: "whole-wheat wraps",
        amount: "4 large",
      },
      { name: "Hummus", normalizedName: "hummus", amount: "200g" },
      {
        name: "Cherry tomatoes",
        normalizedName: "tomato",
        amount: "150g, halved",
      },
      {
        name: "Cucumber",
        normalizedName: "cucumber",
        amount: "1 medium, sliced",
      },
      {
        name: "Kalamata olives",
        normalizedName: "olives",
        amount: "60g, halved",
      },
      {
        name: "Red onion",
        normalizedName: "red onion",
        amount: "½, thinly sliced",
      },
      {
        name: "Fresh parsley",
        normalizedName: "parsley",
        amount: "small handful",
      },
      { name: "Olive oil", normalizedName: "olive oil", amount: "2 tbsp" },
      { name: "Lemon juice", normalizedName: "lemon", amount: "1 lemon" },
      {
        name: "Smoked paprika",
        normalizedName: "paprika",
        amount: "1 tsp",
      },
      { name: "Cumin", normalizedName: "cumin", amount: "1 tsp" },
      {
        name: "Garlic cloves",
        normalizedName: "garlic",
        amount: "2, minced",
      },
      {
        name: "Salt and black pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
      {
        name: "Greek yogurt",
        normalizedName: "greek yogurt",
        amount: "4 tbsp",
        optional: true,
      },
    ],
    instructions: [
      "Combine olive oil, lemon juice, garlic, paprika, cumin, salt, and pepper in a bowl. Add chicken thighs and marinate for at least 15 minutes.",
      "Heat a grill pan or skillet over medium-high heat. Cook chicken for 6–7 minutes per side until cooked through and lightly charred.",
      "Rest the chicken for 5 minutes, then slice into strips.",
      "Lay each wrap flat. Spread a generous layer of hummus across the centre.",
      "Layer sliced chicken, cherry tomatoes, cucumber, red onion, and olives on top.",
      "Add a drizzle of Greek yogurt if using, then scatter over fresh parsley.",
      "Fold in the sides of the wrap and roll tightly. Slice in half if desired.",
    ],
  },
  {
    id: "2",
    slug: "greek-chickpea-wraps",
    title: "Greek Chickpea Wraps",
    description:
      "Hearty chickpeas with feta, roasted peppers, and tzatziki sauce wrapped in a warm flatbread. A satisfying vegetarian meal that keeps well in the fridge.",
    imageUrl:
      "https://images.unsplash.com/photo-1683725519288-eab9fa352335?w=800&q=80",
    categories: ["Wraps", "Vegetarian"],
    featured: true,
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 15,
    storageDays: 4,
    storageInstructions:
      "Keep wrap components separate and assemble just before eating. Store filling in an airtight container for up to 4 days.",
    reheatingInstructions:
      "Heat chickpea filling in a skillet over medium heat for 3–4 minutes. Wraps can be warmed in a dry pan for 30 seconds.",
    mealPrepNotes: [
      "Make a double batch of the chickpea filling for use in grain bowls throughout the week.",
      "Tzatziki can be made ahead and stored for up to 5 days.",
      "Pre-slice all vegetables on Sunday.",
    ],
    substitutions: [
      "Swap feta for vegan feta or omit entirely.",
      "Use any flatbread, pita, or tortilla.",
      "Replace tzatziki with hummus if preferred.",
    ],
    ingredients: [
      {
        name: "Chickpeas",
        normalizedName: "chickpeas",
        amount: "2 × 400g tins, drained",
      },
      {
        name: "Whole-wheat flatbreads",
        normalizedName: "flatbreads",
        amount: "4",
      },
      {
        name: "Feta cheese",
        normalizedName: "feta",
        amount: "100g, crumbled",
      },
      {
        name: "Roasted red peppers",
        normalizedName: "bell pepper",
        amount: "2, sliced",
      },
      {
        name: "Baby spinach",
        normalizedName: "spinach",
        amount: "60g",
      },
      { name: "Tzatziki", normalizedName: "tzatziki", amount: "120g" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "2 tbsp" },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "2, minced" },
      { name: "Cumin", normalizedName: "cumin", amount: "1 tsp" },
      {
        name: "Smoked paprika",
        normalizedName: "paprika",
        amount: "½ tsp",
      },
      {
        name: "Dried oregano",
        normalizedName: "oregano",
        amount: "1 tsp",
      },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium heat. Add garlic and cook for 1 minute until fragrant.",
      "Add chickpeas, cumin, paprika, oregano, salt, and pepper. Cook for 8–10 minutes, stirring occasionally, until chickpeas are lightly golden.",
      "Lightly crush about a third of the chickpeas with the back of a spoon to thicken the mixture.",
      "Warm flatbreads in a dry pan or oven.",
      "Spread tzatziki on each flatbread. Add a layer of baby spinach.",
      "Top with the spiced chickpeas, roasted peppers, and crumbled feta.",
      "Roll or fold the wraps and serve immediately, or wrap in foil to store.",
    ],
  },
  {
    id: "3",
    slug: "turkey-tzatziki-wraps",
    title: "Turkey Tzatziki Wraps",
    description:
      "Lean ground turkey spiced with Mediterranean herbs, paired with cool tzatziki, fresh tomatoes, and crumbled feta. Light, filling, and ready in 30 minutes.",
    imageUrl:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
    categories: ["Wraps", "High Protein"],
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 20,
    storageDays: 3,
    storageInstructions:
      "Store turkey filling and wrap ingredients separately. Filling keeps in the fridge for 3 days. Assemble wraps fresh each day.",
    reheatingInstructions:
      "Reheat turkey filling in a skillet or microwave until hot. Wraps are best assembled after reheating the filling.",
    mealPrepNotes: [
      "Cook a full batch of turkey and refrigerate in portioned containers.",
      "Make tzatziki from scratch on prep day — it improves overnight.",
      "Slice salad vegetables in advance for quick assembly.",
    ],
    substitutions: [
      "Use minced chicken or lamb instead of turkey.",
      "Add a handful of fresh mint for a more authentic Greek flavour.",
      "Plain Greek yogurt works as a tzatziki substitute in a pinch.",
    ],
    ingredients: [
      {
        name: "Ground turkey",
        normalizedName: "turkey",
        amount: "500g",
      },
      {
        name: "Whole-wheat wraps",
        normalizedName: "whole-wheat wraps",
        amount: "4 large",
      },
      { name: "Tzatziki", normalizedName: "tzatziki", amount: "150g" },
      {
        name: "Cherry tomatoes",
        normalizedName: "tomato",
        amount: "150g, halved",
      },
      {
        name: "Cucumber",
        normalizedName: "cucumber",
        amount: "½, diced",
      },
      {
        name: "Feta cheese",
        normalizedName: "feta",
        amount: "80g, crumbled",
      },
      {
        name: "Red onion",
        normalizedName: "red onion",
        amount: "½, finely diced",
      },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "3, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "1 tbsp" },
      {
        name: "Dried oregano",
        normalizedName: "oregano",
        amount: "1½ tsp",
      },
      { name: "Cumin", normalizedName: "cumin", amount: "1 tsp" },
      { name: "Cinnamon", normalizedName: "cinnamon", amount: "¼ tsp" },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
      {
        name: "Fresh mint leaves",
        normalizedName: "mint",
        amount: "small handful",
        optional: true,
      },
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium-high heat. Add red onion and cook for 3 minutes until softened.",
      "Add garlic and cook for 1 minute. Add ground turkey and break it apart with a wooden spoon.",
      "Cook turkey until browned and cooked through, about 8–10 minutes.",
      "Season with oregano, cumin, cinnamon, salt, and pepper. Stir well and cook for a further 2 minutes.",
      "Warm wraps in a dry pan or microwave for 20 seconds.",
      "Spread tzatziki over each wrap. Add turkey mixture, cherry tomatoes, cucumber, and crumbled feta.",
      "Top with fresh mint if using. Roll tightly and serve.",
    ],
  },
  {
    id: "4",
    slug: "slow-cooker-chicken-shawarma-bowls",
    title: "Slow-Cooker Chicken Shawarma Bowls",
    description:
      "Warm-spiced chicken thighs slow-cooked until tender, served over fluffy rice with roasted vegetables, tahini drizzle, and pickled onions. Minimal effort, maximum flavour.",
    imageUrl:
      "https://images.unsplash.com/photo-1744444202869-54debf97b285?w=800&q=80",
    categories: ["Slow Cooker", "High Protein"],
    featured: true,
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 240,
    storageDays: 5,
    storageInstructions:
      "Store chicken, rice, and toppings in separate containers in the fridge for up to 5 days. Assemble bowls to order.",
    reheatingInstructions:
      "Reheat chicken in the microwave with 2 tablespoons of water for 2–3 minutes. Rice reheats well with a splash of water covered in the microwave.",
    mealPrepNotes: [
      "Use the slow cooker on Sunday while you do other things.",
      "Cook a double batch of rice to use throughout the week.",
      "Pickled onions improve with time — make them on Friday or Saturday.",
      "Shred the chicken and mix through the cooking juices before storing.",
    ],
    substitutions: [
      "Chicken breast works but may be slightly less juicy.",
      "Serve over cauliflower rice or quinoa for a lower-carb version.",
      "Replace tahini with yogurt-based dressing if preferred.",
    ],
    ingredients: [
      {
        name: "Chicken thighs",
        normalizedName: "chicken",
        amount: "800g, bone-in or boneless",
      },
      {
        name: "Basmati rice",
        normalizedName: "rice",
        amount: "300g",
      },
      {
        name: "Red onion",
        normalizedName: "red onion",
        amount: "1 large, sliced",
      },
      {
        name: "Cherry tomatoes",
        normalizedName: "tomato",
        amount: "200g",
      },
      { name: "Cucumber", normalizedName: "cucumber", amount: "1, diced" },
      {
        name: "Tahini",
        normalizedName: "tahini",
        amount: "3 tbsp",
      },
      { name: "Lemon juice", normalizedName: "lemon", amount: "2 lemons" },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "4, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "2 tbsp" },
      {
        name: "Cumin",
        normalizedName: "cumin",
        amount: "2 tsp",
      },
      {
        name: "Coriander",
        normalizedName: "coriander",
        amount: "1 tsp",
      },
      { name: "Turmeric", normalizedName: "turmeric", amount: "½ tsp" },
      {
        name: "Smoked paprika",
        normalizedName: "paprika",
        amount: "1 tsp",
      },
      { name: "Cinnamon", normalizedName: "cinnamon", amount: "¼ tsp" },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
      {
        name: "Fresh parsley",
        normalizedName: "parsley",
        amount: "to garnish",
        optional: true,
      },
    ],
    instructions: [
      "Combine cumin, coriander, turmeric, paprika, cinnamon, garlic, lemon juice, olive oil, salt, and pepper in a bowl.",
      "Coat chicken thighs thoroughly with the spice mixture.",
      "Place chicken in the slow cooker with the red onion. Cook on low for 6–8 hours or high for 3–4 hours.",
      "When cooked, shred the chicken with two forks and mix through the cooking juices.",
      "Cook rice according to packet instructions. Prepare a quick pickled onion by soaking red onion in vinegar and a pinch of sugar for 20 minutes.",
      "Mix tahini with 3 tablespoons of water and lemon juice to make a drizzle sauce.",
      "Assemble bowls with rice, shawarma chicken, cherry tomatoes, cucumber, pickled onion, and tahini drizzle.",
      "Garnish with fresh parsley if desired.",
    ],
  },
  {
    id: "5",
    slug: "mediterranean-chicken-and-rice",
    title: "Mediterranean Chicken and Rice",
    description:
      "One-pot lemon herb chicken baked with fragrant rice, olives, and sun-dried tomatoes. Everything cooks in one dish, making it ideal for weekly meal prep.",
    imageUrl:
      "https://images.unsplash.com/photo-1684556560149-c6ac1c9cecd9?w=800&q=80",
    categories: ["One Pot", "High Protein"],
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 45,
    storageDays: 5,
    storageInstructions:
      "Allow to cool completely before portioning into airtight containers. Refrigerate for up to 5 days.",
    reheatingInstructions:
      "Add a splash of water or chicken stock before reheating to prevent rice from drying out. Microwave for 2–3 minutes or reheat in a pan with a lid over low heat.",
    mealPrepNotes: [
      "This dish improves with time as the flavours meld.",
      "Cook in an oven-safe pan or Dutch oven for best results.",
      "Portion directly from the pan into containers after cooking.",
    ],
    substitutions: [
      "Use brown rice — increase cooking time by 15 minutes and add an extra 60ml of stock.",
      "Swap chicken for chickpeas for a vegetarian version.",
      "Add a tin of diced tomatoes for a saucier result.",
    ],
    ingredients: [
      {
        name: "Chicken thighs",
        normalizedName: "chicken",
        amount: "600g, bone-in",
      },
      {
        name: "Long-grain white rice",
        normalizedName: "rice",
        amount: "280g",
      },
      {
        name: "Chicken stock",
        normalizedName: "chicken stock",
        amount: "500ml",
      },
      {
        name: "Kalamata olives",
        normalizedName: "olives",
        amount: "80g",
      },
      {
        name: "Sun-dried tomatoes",
        normalizedName: "sun-dried tomatoes",
        amount: "60g, sliced",
      },
      { name: "Lemon", normalizedName: "lemon", amount: "1, sliced into rounds" },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "4, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "3 tbsp" },
      {
        name: "Dried oregano",
        normalizedName: "oregano",
        amount: "2 tsp",
      },
      { name: "Dried thyme", normalizedName: "thyme", amount: "1 tsp" },
      {
        name: "Smoked paprika",
        normalizedName: "paprika",
        amount: "1 tsp",
      },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
      {
        name: "Fresh parsley",
        normalizedName: "parsley",
        amount: "to serve",
        optional: true,
      },
    ],
    instructions: [
      "Preheat the oven to 200°C (180°C fan / 400°F).",
      "Season chicken thighs with paprika, oregano, half the garlic, salt, and pepper.",
      "Heat olive oil in an oven-safe pan over medium-high heat. Brown chicken thighs skin-side down for 4 minutes, then flip and cook for 2 more minutes. Set aside.",
      "In the same pan, add remaining garlic and cook for 1 minute. Add rice and stir to coat in the oil.",
      "Pour in chicken stock. Add olives, sun-dried tomatoes, and thyme. Season with salt and pepper.",
      "Nestle chicken thighs on top of the rice. Lay lemon slices over the chicken.",
      "Bring to a simmer on the hob, then transfer to the oven and bake uncovered for 30–35 minutes, until rice has absorbed all the liquid and chicken is cooked through.",
      "Rest for 5 minutes before serving. Garnish with fresh parsley.",
    ],
  },
  {
    id: "6",
    slug: "one-pot-lentil-tomato-stew",
    title: "One-Pot Lentil Tomato Stew",
    description:
      "A rich, warming stew of red lentils, crushed tomatoes, and Mediterranean spices. Ready in under 40 minutes and even better the next day.",
    imageUrl:
      "https://images.unsplash.com/photo-1581347860118-588a42326161?w=800&q=80",
    categories: ["One Pot", "Vegetarian"],
    featured: true,
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 35,
    storageDays: 5,
    storageInstructions:
      "Cool completely before refrigerating in airtight containers for up to 5 days. The stew thickens as it sits — add a splash of water when reheating.",
    reheatingInstructions:
      "Reheat in a saucepan over medium heat, adding water as needed. Microwave for 2–3 minutes, stirring halfway through.",
    mealPrepNotes: [
      "Make a large batch as this freezes very well for up to 3 months.",
      "Serve with crusty bread, rice, or flatbread throughout the week.",
      "Top with a spoon of yogurt and a drizzle of olive oil when serving.",
    ],
    substitutions: [
      "Green or brown lentils can be used — increase cooking time by 10 minutes.",
      "Add baby spinach or kale in the last 2 minutes of cooking.",
      "A splash of coconut milk makes it creamier.",
    ],
    ingredients: [
      {
        name: "Red lentils",
        normalizedName: "lentils",
        amount: "300g, rinsed",
      },
      {
        name: "Crushed tomatoes",
        normalizedName: "tomato",
        amount: "2 × 400g tins",
      },
      {
        name: "Vegetable stock",
        normalizedName: "vegetable stock",
        amount: "700ml",
      },
      {
        name: "Yellow onion",
        normalizedName: "onion",
        amount: "1 large, diced",
      },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "4, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "3 tbsp" },
      { name: "Cumin", normalizedName: "cumin", amount: "2 tsp" },
      {
        name: "Smoked paprika",
        normalizedName: "paprika",
        amount: "1 tsp",
      },
      { name: "Turmeric", normalizedName: "turmeric", amount: "½ tsp" },
      { name: "Coriander", normalizedName: "coriander", amount: "1 tsp" },
      { name: "Cayenne pepper", normalizedName: "cayenne", amount: "¼ tsp" },
      { name: "Lemon juice", normalizedName: "lemon", amount: "1 lemon" },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
      {
        name: "Fresh coriander",
        normalizedName: "fresh coriander",
        amount: "to garnish",
        optional: true,
      },
      {
        name: "Greek yogurt",
        normalizedName: "greek yogurt",
        amount: "to serve",
        optional: true,
      },
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add onion and cook for 5–6 minutes until softened and golden.",
      "Add garlic and cook for another minute. Add cumin, paprika, turmeric, coriander, and cayenne. Stir and cook for 1 minute until fragrant.",
      "Add the rinsed red lentils and stir to coat in the spices.",
      "Pour in the crushed tomatoes and vegetable stock. Season with salt and pepper.",
      "Bring to a boil, then reduce heat to low. Simmer uncovered for 25–30 minutes, stirring occasionally, until lentils are soft and the stew has thickened.",
      "Squeeze in lemon juice and adjust seasoning to taste.",
      "Serve topped with fresh coriander and a spoon of Greek yogurt if desired.",
    ],
  },
  {
    id: "7",
    slug: "white-bean-spinach-tomato-soup",
    title: "White Bean, Spinach, and Tomato Soup",
    description:
      "A comforting, protein-rich soup with creamy white beans, wilted spinach, and a flavoursome tomato broth. Ready in 30 minutes and deeply satisfying.",
    imageUrl:
      "https://images.unsplash.com/photo-1779119867390-c64f66cd02b8?w=800&q=80",
    categories: ["One Pot", "Vegetarian"],
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 25,
    storageDays: 5,
    storageInstructions:
      "Refrigerate in airtight containers for up to 5 days. Soup may thicken in the fridge; stir in extra water or stock when reheating.",
    reheatingInstructions:
      "Reheat in a pot over medium heat for 5 minutes, adding water as needed. Microwave for 2–3 minutes, stirring halfway.",
    mealPrepNotes: [
      "This soup freezes beautifully for up to 3 months.",
      "Add a parmesan rind while simmering for extra depth of flavour.",
      "Serve with crusty sourdough for a complete meal.",
    ],
    substitutions: [
      "Swap white beans for chickpeas or butter beans.",
      "Use kale instead of spinach — add earlier and cook for 5 minutes.",
      "Chicken stock can replace vegetable stock for a non-vegetarian version.",
    ],
    ingredients: [
      {
        name: "Cannellini beans",
        normalizedName: "cannellini beans",
        amount: "2 × 400g tins, drained",
      },
      {
        name: "Baby spinach",
        normalizedName: "spinach",
        amount: "120g",
      },
      {
        name: "Crushed tomatoes",
        normalizedName: "tomato",
        amount: "1 × 400g tin",
      },
      {
        name: "Vegetable stock",
        normalizedName: "vegetable stock",
        amount: "800ml",
      },
      {
        name: "Yellow onion",
        normalizedName: "onion",
        amount: "1, diced",
      },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "3, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "3 tbsp" },
      {
        name: "Dried thyme",
        normalizedName: "thyme",
        amount: "1 tsp",
      },
      {
        name: "Dried rosemary",
        normalizedName: "rosemary",
        amount: "½ tsp",
      },
      { name: "Lemon juice", normalizedName: "lemon", amount: "½ lemon" },
      {
        name: "Chilli flakes",
        normalizedName: "chilli",
        amount: "½ tsp",
        optional: true,
      },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add onion and cook for 5 minutes until soft and translucent.",
      "Add garlic and cook for 1 minute. Add thyme, rosemary, and chilli flakes (if using) and cook for 30 seconds.",
      "Add crushed tomatoes and cook for 3–4 minutes, stirring occasionally.",
      "Add vegetable stock and cannellini beans. Season with salt and pepper.",
      "Bring to a boil, then reduce to a simmer for 15 minutes.",
      "Use a potato masher to lightly crush some of the beans against the side of the pot to thicken the soup.",
      "Stir in baby spinach and cook for 1–2 minutes until wilted.",
      "Finish with a squeeze of lemon juice. Taste and adjust seasoning.",
    ],
  },
  {
    id: "8",
    slug: "one-pot-lemon-herb-orzo",
    title: "One-Pot Lemon Herb Orzo",
    description:
      "Creamy orzo simmered with lemon, garlic, spinach, and feta in a single pot. Light, bright, and endlessly comforting — ready in 25 minutes.",
    imageUrl:
      "https://images.unsplash.com/photo-1683615062749-46872b5acb69?w=800&q=80",
    categories: ["One Pot", "Vegetarian"],
    featured: true,
    servings: 4,
    prepMinutes: 5,
    cookMinutes: 25,
    storageDays: 4,
    storageInstructions:
      "Orzo continues to absorb liquid as it sits. Add a splash of water or stock before reheating. Refrigerate in sealed containers for up to 4 days.",
    reheatingInstructions:
      "Add 2–3 tablespoons of water and reheat in a saucepan over low heat, stirring until creamy. Microwave with a splash of water for 90 seconds, stir, and repeat if needed.",
    mealPrepNotes: [
      "This dish is best freshly cooked but reheats well with a little added liquid.",
      "Pairs well with a simple green salad to add crunch and freshness.",
      "For extra protein, stir in cooked chickpeas or serve alongside grilled chicken.",
    ],
    substitutions: [
      "Use any small pasta shape in place of orzo.",
      "Nutritional yeast and a squeeze of lemon replace feta for a dairy-free version.",
      "Kale or Swiss chard can replace spinach.",
    ],
    ingredients: [
      { name: "Orzo pasta", normalizedName: "orzo", amount: "300g" },
      {
        name: "Baby spinach",
        normalizedName: "spinach",
        amount: "120g",
      },
      {
        name: "Feta cheese",
        normalizedName: "feta",
        amount: "150g, crumbled",
      },
      {
        name: "Vegetable stock",
        normalizedName: "vegetable stock",
        amount: "900ml",
      },
      { name: "Lemon", normalizedName: "lemon", amount: "1, zest and juice" },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "3, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "2 tbsp" },
      {
        name: "Dried oregano",
        normalizedName: "oregano",
        amount: "1 tsp",
      },
      {
        name: "Cherry tomatoes",
        normalizedName: "tomato",
        amount: "150g, halved",
        optional: true,
      },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
    ],
    instructions: [
      "Heat olive oil in a wide, deep pan or pot over medium heat. Add garlic and cook for 1 minute until fragrant.",
      "Add orzo and stir for 1–2 minutes to lightly toast.",
      "Pour in the vegetable stock. Add oregano and a generous pinch of salt. Stir well.",
      "Bring to a boil, then reduce heat to a gentle simmer. Cook uncovered for 10–12 minutes, stirring occasionally, until orzo is tender and has absorbed most of the liquid.",
      "Add cherry tomatoes if using and cook for 2 more minutes.",
      "Stir in baby spinach and cook until just wilted, about 1–2 minutes.",
      "Remove from heat. Stir in lemon zest, lemon juice, and crumbled feta.",
      "Taste and adjust seasoning. Serve immediately or allow to cool for meal prep.",
    ],
  },
  {
    id: "9",
    slug: "greek-protein-grain-bowl",
    title: "Greek Protein Grain Bowl",
    description:
      "Grilled chicken, chickpeas, and quinoa layered with tzatziki, cucumber, tomatoes, and olives — a high-protein bowl built for the week.",
    imageUrl:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    categories: ["High Protein", "Vegetarian"],
    featured: true,
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 25,
    storageDays: 5,
    storageInstructions:
      "Store all components separately. Dress with tzatziki when serving to prevent sogginess. Refrigerate for up to 5 days.",
    reheatingInstructions:
      "Quinoa and chicken can be warmed in the microwave for 1–2 minutes. Toppings are served cold.",
    mealPrepNotes: [
      "Cook quinoa in a large batch on prep day.",
      "Grill all chicken at once and slice after cooling.",
      "Pre-portion bowls in meal-prep containers for the week.",
    ],
    substitutions: [
      "Replace chicken with roasted halloumi for a vegetarian version.",
      "Use brown rice, farro, or couscous in place of quinoa.",
      "Hummus works as a dressing if tzatziki is unavailable.",
    ],
    ingredients: [
      {
        name: "Chicken breast",
        normalizedName: "chicken",
        amount: "500g",
      },
      {
        name: "Quinoa",
        normalizedName: "quinoa",
        amount: "240g, uncooked",
      },
      {
        name: "Chickpeas",
        normalizedName: "chickpeas",
        amount: "1 × 400g tin, drained",
      },
      { name: "Tzatziki", normalizedName: "tzatziki", amount: "150g" },
      {
        name: "Cherry tomatoes",
        normalizedName: "tomato",
        amount: "150g, halved",
      },
      {
        name: "Cucumber",
        normalizedName: "cucumber",
        amount: "1, diced",
      },
      {
        name: "Kalamata olives",
        normalizedName: "olives",
        amount: "60g",
      },
      {
        name: "Feta cheese",
        normalizedName: "feta",
        amount: "80g, crumbled",
      },
      { name: "Olive oil", normalizedName: "olive oil", amount: "2 tbsp" },
      { name: "Lemon juice", normalizedName: "lemon", amount: "1 lemon" },
      {
        name: "Dried oregano",
        normalizedName: "oregano",
        amount: "1 tsp",
      },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
    ],
    instructions: [
      "Cook quinoa according to packet instructions. Fluff with a fork and season lightly with salt.",
      "Rub chicken breast with olive oil, oregano, lemon juice, salt, and pepper. Heat a grill pan over medium-high heat.",
      "Grill chicken for 6–7 minutes per side until cooked through. Rest for 5 minutes, then slice.",
      "Rinse and drain chickpeas. Optionally, warm in a pan with a little olive oil and a pinch of paprika for 3 minutes.",
      "Assemble bowls: start with a base of quinoa, then add sliced chicken, chickpeas, tomatoes, cucumber, and olives.",
      "Add crumbled feta and finish with a generous dollop of tzatziki.",
    ],
  },
  {
    id: "10",
    slug: "roasted-veg-and-lentils",
    title: "Roasted Veg & Lentils",
    description:
      "Herby lentils tossed with roasted aubergine, peppers, and olives — hearty, fully plant-based, and packed with flavour. Excellent warm or cold.",
    imageUrl:
      "https://images.unsplash.com/photo-1470338950318-40320a722782?w=800&q=80",
    categories: ["Vegetarian", "One Pot"],
    featured: true,
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 35,
    storageDays: 5,
    storageInstructions:
      "Store in an airtight container in the fridge for up to 5 days. Tastes great cold as a salad-style dish or warmed through.",
    reheatingInstructions:
      "Warm in a pan over medium heat for 4–5 minutes or microwave for 2 minutes. Add a drizzle of olive oil after reheating.",
    mealPrepNotes: [
      "Roast a large tray of vegetables to use across multiple meals.",
      "Cooked lentils store well for up to 5 days — cook a big batch.",
      "Works well as a base for a grain bowl with a dollop of hummus.",
    ],
    substitutions: [
      "Use courgette, sweet potato, or red onion in place of aubergine.",
      "Green or black lentils work instead of puy — adjust cooking time.",
      "Add crumbled feta or fresh herbs just before serving.",
    ],
    ingredients: [
      {
        name: "Puy lentils",
        normalizedName: "lentils",
        amount: "250g",
      },
      {
        name: "Aubergine",
        normalizedName: "eggplant",
        amount: "1 large, cubed",
      },
      {
        name: "Red bell pepper",
        normalizedName: "bell pepper",
        amount: "2, sliced",
      },
      {
        name: "Courgette",
        normalizedName: "courgette",
        amount: "1, sliced into half-moons",
      },
      {
        name: "Kalamata olives",
        normalizedName: "olives",
        amount: "80g",
      },
      {
        name: "Vegetable stock",
        normalizedName: "vegetable stock",
        amount: "600ml",
      },
      { name: "Garlic cloves", normalizedName: "garlic", amount: "3, minced" },
      { name: "Olive oil", normalizedName: "olive oil", amount: "4 tbsp" },
      {
        name: "Dried oregano",
        normalizedName: "oregano",
        amount: "1½ tsp",
      },
      {
        name: "Smoked paprika",
        normalizedName: "paprika",
        amount: "1 tsp",
      },
      { name: "Balsamic vinegar", normalizedName: "balsamic", amount: "1 tbsp" },
      {
        name: "Salt and pepper",
        normalizedName: "salt",
        amount: "to taste",
      },
      {
        name: "Fresh basil",
        normalizedName: "basil",
        amount: "small handful",
        optional: true,
      },
    ],
    instructions: [
      "Preheat the oven to 220°C (200°C fan / 425°F). Toss aubergine, peppers, and courgette with 3 tablespoons of olive oil, oregano, paprika, salt, and pepper.",
      "Spread vegetables on a large baking tray in a single layer. Roast for 25–30 minutes, turning once, until tender and slightly caramelised.",
      "Meanwhile, rinse lentils and add to a pot with vegetable stock. Bring to a boil, then simmer for 20–25 minutes until tender. Drain any excess liquid.",
      "Heat 1 tablespoon of olive oil in a pan over medium heat. Add garlic and cook for 1 minute.",
      "Add cooked lentils to the pan with garlic. Stir in balsamic vinegar and season to taste.",
      "Combine lentils with roasted vegetables and olives. Toss gently.",
      "Serve warm or at room temperature, scattered with fresh basil if desired.",
    ],
  },
];

export const CATEGORIES = [
  "Wraps",
  "One Pot",
  "Slow Cooker",
  "Vegetarian",
  "High Protein",
] as const;

export const POPULAR_INGREDIENTS = [
  "Chicken",
  "Chickpeas",
  "Spinach",
  "Feta",
  "Lemon",
  "Olives",
  "Tomato",
  "Garlic",
  "Quinoa",
  "Rice",
];
