const fs = require('fs');

async function buildSite() {
    // 1. Read the newly refactored JSON file
    console.log("Reading prompts_seed_v2.json...");
    const rawData = fs.readFileSync('prompts_seed_v2.json', 'utf8');
    const prompts = JSON.parse(rawData);

    // 2. Read the current index.html
    console.log("Reading index.html...");
    let htmlContent = fs.readFileSync('index.html', 'utf8');

    // Keep track of which category arrays we need to update
    const categories = {
        'Semiconductor': 'SEMICONDUCTOR_PROMPTS',
        'Automotive': 'AUTOMOTIVE_PROMPTS',
        'Hospital': 'HOSPITAL_PROMPTS',
        'Oriental': 'ORIENTAL_PROMPTS',
        'Pharmacy': 'PHARMACY_PROMPTS',
        'Bank': 'BANK_PROMPTS',
        'Securities': 'SECURITIES_PROMPTS',
        'Software': 'SOFTWARE_PROMPTS',
        'Appdev': 'APPDEV_PROMPTS',
        'Ai': 'Artificial_Intelligence_PROMPTS', // Handle the exact variable name
        'Fashion': 'FASHION_PROMPTS',
        'Cosmetics': 'COSMETICS_PROMPTS',
        'Salon': 'SALON_PROMPTS',
        'Nonghyup': 'NONGHYUP_PROMPTS',
        'Smartfarm': 'SMARTFARM_PROMPTS',
        'Localg': 'LOCALG_PROMPTS',
        'Pubcorp': 'PUBCORP_PROMPTS',
        'Travel': 'TRAVEL_PROMPTS',
        'Hotel': 'HOTEL_PROMPTS',
        'Attraction': 'ATTRACTION_PROMPTS',
        'Airline': 'AIRLINE_PROMPTS',
        'Welfare': 'WELFARE_PROMPTS',
        'Fishmarket': 'FISHMARKET_PROMPTS',
        'Nail': 'NAIL_PROMPTS',
        'Game': 'GAME_PROMPTS',
        'Construction': 'CONSTRUCTION_PROMPTS',
        'Realtor': 'REALTOR_PROMPTS',
        'Interior': 'INTERIOR_PROMPTS',
        'Restaurant': 'RESTAURANT_PROMPTS',
        'Cafe': 'CAFE_PROMPTS',
        'Catering': 'CATERING_PROMPTS',
        'Foodmfg': 'FOODMFG_PROMPTS',
        'Cvs': 'CVS_PROMPTS',
        'Department': 'DEPARTMENT_PROMPTS',
        'Ecommerce': 'ECOMMERCE_PROMPTS',
        'Franchise': 'FRANCHISE_PROMPTS',
        'Insurance': 'INSURANCE_PROMPTS',
        'Fintech': 'FINTECH_PROMPTS',
        'Academy': 'ACADEMY_PROMPTS',
        'Kindergarten': 'KINDERGARTEN_PROMPTS',
        'University': 'UNIVERSITY_PROMPTS',
        'Vocational': 'VOCATIONAL_PROMPTS',
        'Meddevice': 'MEDDEVICE_PROMPTS',
        'Steel': 'STEEL_PROMPTS',
        'Shipbuilding': 'SHIPBUILDING_PROMPTS'
    };

    // Group the JSON prompts by their underlying category variable
    const groupedPrompts = {};
    for (const key of Object.values(categories)) {
        groupedPrompts[key] = [];
    }

    prompts.forEach(p => {
        let catVar = categories[p.industry] || categories[p.industry.replace(' ', '')];

        // Edge cases for exact matching from JSON to the HTML variable names
        if (p.industry === 'Semiconductors') catVar = 'SEMICONDUCTOR_PROMPTS';
        if (p.industry === 'Bank / Finance') catVar = 'BANK_PROMPTS';
        if (p.industry === 'Securities / Finance') catVar = 'SECURITIES_PROMPTS';
        if (p.industry === 'SaaS & SW') catVar = 'SOFTWARE_PROMPTS';
        if (p.industry === 'SaaS & Software') catVar = 'SOFTWARE_PROMPTS';
        if (p.industry === 'App Development') catVar = 'APPDEV_PROMPTS';
        if (p.industry === 'Artificial Intelligence') catVar = 'Artificial_Intelligence_PROMPTS';
        if (p.industry === 'Beauty Salon') catVar = 'SALON_PROMPTS';
        if (p.industry === 'Smart Farm') catVar = 'SMARTFARM_PROMPTS';
        if (p.industry === 'Local Government') catVar = 'LOCALG_PROMPTS';
        if (p.industry === 'Public Corporation') catVar = 'PUBCORP_PROMPTS';
        if (p.industry === 'Travel Agency') catVar = 'TRAVEL_PROMPTS';
        if (p.industry === 'Hotel & Resort') catVar = 'HOTEL_PROMPTS';
        if (p.industry === 'Tourist Attraction') catVar = 'ATTRACTION_PROMPTS';
        if (p.industry === 'Welfare Center') catVar = 'WELFARE_PROMPTS';
        if (p.industry === 'Fish Market') catVar = 'FISHMARKET_PROMPTS';
        if (p.industry === 'Nail Art') catVar = 'NAIL_PROMPTS';

        if (catVar && groupedPrompts[catVar]) {
            groupedPrompts[catVar].push(p);
        } else {
            console.warn(`Warning: Could not map industry '${p.industry}' for prompt '${p.title}'`);
        }
    });

    // 3. Inject the grouped prompts back into the HTML String
    console.log("Injecting new arrays into HTML...");

    for (const [varName, promptsArray] of Object.entries(groupedPrompts)) {
        if (promptsArray.length === 0) continue;

        // Build the JS array string exactly as it appears in the HTML
        const arrayString = `const ${varName} = [\n` + promptsArray.map(p => {
            return `      {
        name: ` + JSON.stringify(p.title) + `,
        type: ` + JSON.stringify(p.type) + `,
        colors: ` + JSON.stringify(p.colors) + `,
        cardBg: ` + JSON.stringify(p.cardBg) + (p.numBg ? `,
        numBg: ` + JSON.stringify(p.numBg) + `, numColor: ` + JSON.stringify(p.numColor) : '') + `,
        prompt: \`${p.template.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`
      } `;
        }).join(',\n') + `\n    ];`;

        // Use a regex to find and replace the entire const ARRAY_NAME = [ ... ]; block in the HTML
        const regex = new RegExp(`const \\s*${varName}\\s*=\\s*\\[[\\s\\S]*?\\];\\n?`, 'g');
        htmlContent = htmlContent.replace(regex, arrayString + '\n');
    }

    // 4. Save the finalized HTML file
    fs.writeFileSync('index.html', htmlContent);
    console.log("Successfully rebuilt index.html with new prompts!");
}

buildSite();
