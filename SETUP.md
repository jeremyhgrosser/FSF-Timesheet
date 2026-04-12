# 🔥 Fire Sky Farms Timesheet — Setup Guide
## Total time: ~5 minutes

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a **new blank spreadsheet**
2. Name it: `Fire Sky Farms Timesheets`
3. Leave it open

---

## Step 2 — Add the Script

1. In the spreadsheet, click **Extensions → Apps Script**
2. Delete all the placeholder code in the editor
3. Open the file `Code.gs` from this zip and **paste the entire contents**
4. Click the 💾 **Save** icon (or Ctrl+S)
5. Name the project: `FireSkyFarms`

---

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web app**
3. Fill in:
   - Description: `Timesheet API`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → Allow
6. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/ABC.../exec`)

---

## Step 4 — Paste the URL into config.js

Open `config.js` and replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your URL:

```js
googleScriptUrl: "https://script.google.com/macros/s/YOUR_ID/exec",
```

You can also update hourly rates here:
```js
workers: [
  { name: "Tyler Grosser", rate: 15.00 },
  { name: "Aaron Grosser", rate: 15.00 },
],
```

---

## Step 5 — Publish to GitHub Pages

1. Create a new GitHub repo: `fireskyFarms-timesheet`
2. Upload all files from this folder (drag & drop on GitHub)
3. Go to repo **Settings → Pages**
4. Source: **Deploy from a branch** → `main` → `/ (root)` → Save
5. Your app will be live at:
   `https://YOUR-USERNAME.github.io/fireskyFarms-timesheet/`

Share that URL with Tyler and Aaron — they can open it on iPhone and tap
**"Add to Home Screen"** for a full app-like experience.

---

## What happens when they submit

Each submission adds a row to the Google Sheet:
- A tab per worker (`Tyler_Grosser`, `Aaron_Grosser`)
- A master **"All Entries"** tab with everyone combined
- Columns: Date, Worker, Times, Hours, Gross Pay, all 5 tax deductions, Net Pay, Notes

You can open the spreadsheet anytime to view, filter, or export to Excel.

---

## Updating tax rates

Edit `config.js` → `taxRates` section, then re-upload to GitHub.
The Apps Script `Code.gs` doesn't need to change — all tax math happens in the browser.
