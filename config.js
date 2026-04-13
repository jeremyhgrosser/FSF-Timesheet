// ╔══════════════════════════════════════════════════════════════╗
// ║  FIRE SKY FARMS — CONFIG                                    ║
// ║  Step 1: Paste your Google Apps Script Web App URL below    ║
// ╚══════════════════════════════════════════════════════════════╝

const CONFIG = {

  // Paste your Google Apps Script deployment URL here
  // (From: Extensions → Apps Script → Deploy → New deployment → Web app)
  googleScriptUrl: "YOUR_GOOGLE_SCRIPT_URL_HERE",

  // Workers
  workers: [
    { name: "Tyler Grosser",  rate: 25.00 },
    { name: "Aaron Grosser",  rate: 25.00 },
  ],

  // CA Tax Rates 2024 — update if rates change
  taxRates: {
    federalIncome:  0.22,    // ~22% bracket (estimated)
    caStateIncome:  0.093,   // CA FTB ~9.3%
    caSDI:          0.009,   // CA SDI 2024
    socialSecurity: 0.062,   // OASDI 6.2%
    medicare:       0.0145,  // Medicare 1.45%
  },

  // OT kicks in after this many hours/day (CA law = 8)
  overtimeThreshold: 8,
};
