// ╔══════════════════════════════════════════════════════════════════╗
// ║  FIRE SKY FARMS — Google Sheets Backend                         ║
// ║  Paste this entire file into Apps Script, then Deploy as        ║
// ║  a Web App (Anyone can access). Copy the URL into config.js     ║
// ╚══════════════════════════════════════════════════════════════════╝

function doPost(e) {
  const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  try {
    // Supports both URLSearchParams (e.parameter) and JSON (e.postData)
    let data;
    if (e.parameter && e.parameter.worker) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No data received');
    }
    const workerName = data.worker || "Unknown";

    // Get or create a sheet tab for this worker
    const sheetName = workerName.replace(' ', '_');
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // Add header row with formatting
      const headers = [
        'Date', 'Worker', 'Time In', 'Time Out', 'Break (hrs)',
        'Reg Hours', 'OT Hours', 'Hourly Rate',
        'Gross Pay', 'Fed Tax', 'CA State Tax', 'CA SDI',
        'Soc Security', 'Medicare', 'Total Deductions', 'Net Pay', 'Notes', 'Submitted At'
      ];
      sheet.appendRow(headers);

      // Style header
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#0d2414');
      headerRange.setFontColor('#f0fdf4');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(10);

      // Freeze header row
      sheet.setFrozenRows(1);

      // Column widths
      sheet.setColumnWidth(1, 100);  // Date
      sheet.setColumnWidth(2, 130);  // Worker
      sheet.setColumnWidth(3, 80);   // Time In
      sheet.setColumnWidth(4, 80);   // Time Out
      sheet.setColumnWidths(5, 13, 90); // numeric cols
      sheet.setColumnWidth(17, 160); // Notes
      sheet.setColumnWidth(18, 160); // Submitted At
    }

    // Append the data row
    const row = [
      data.date,
      data.worker,
      data.timeIn,
      data.timeOut,
      parseFloat(data.breakHrs) || 0,
      parseFloat(data.regHrs) || 0,
      parseFloat(data.otHrs) || 0,
      parseFloat(data.hourlyRate) || 0,
      parseFloat(data.grossPay) || 0,
      parseFloat(data.fedTax) || 0,
      parseFloat(data.caTax) || 0,
      parseFloat(data.caSDI) || 0,
      parseFloat(data.socSec) || 0,
      parseFloat(data.medicare) || 0,
      parseFloat(data.totalDed) || 0,
      parseFloat(data.netPay) || 0,
      data.notes || '',
      new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    ];

    sheet.appendRow(row);

    // Format currency columns (I through P = columns 9-16)
    const lastRow = sheet.getLastRow();
    const currencyRange = sheet.getRange(lastRow, 9, 1, 8);
    currencyRange.setNumberFormat('$#,##0.00');

    // Format hours columns (E-H = columns 5-8)
    sheet.getRange(lastRow, 5, 1, 4).setNumberFormat('0.00');

    // Alternate row shading
    const rowBg = (lastRow % 2 === 0) ? '#d5f5e3' : '#eafaf1';
    sheet.getRange(lastRow, 1, 1, row.length).setBackground(rowBg);

    // Also write to a master "All Entries" sheet
    let masterSheet = ss.getSheetByName('All Entries');
    if (!masterSheet) {
      masterSheet = ss.insertSheet('All Entries', 0);
      const mHeaders = [
        'Date', 'Worker', 'Time In', 'Time Out', 'Break (hrs)',
        'Reg Hours', 'OT Hours', 'Hourly Rate',
        'Gross Pay', 'Fed Tax', 'CA State Tax', 'CA SDI',
        'Soc Security', 'Medicare', 'Total Deductions', 'Net Pay', 'Notes', 'Submitted At'
      ];
      masterSheet.appendRow(mHeaders);
      const mHeaderRange = masterSheet.getRange(1, 1, 1, mHeaders.length);
      mHeaderRange.setBackground('#1f5c30');
      mHeaderRange.setFontColor('#fbbf24');
      mHeaderRange.setFontWeight('bold');
      masterSheet.setFrozenRows(1);
    }

    masterSheet.appendRow(row);
    const mLastRow = masterSheet.getLastRow();
    masterSheet.getRange(mLastRow, 9, 1, 8).setNumberFormat('$#,##0.00');
    masterSheet.getRange(mLastRow, 5, 1, 4).setNumberFormat('0.00');
    const mRowBg = (mLastRow % 2 === 0) ? '#d5f5e3' : '#eafaf1';
    masterSheet.getRange(mLastRow, 1, 1, row.length).setBackground(mRowBg);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Entry saved' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Fire Sky Farms Timesheet API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
