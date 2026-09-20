/**
 * CareVault — Beta onboarding waiting list
 * Google Apps Script web app that appends submissions to a Google Sheet.
 *
 * SETUP
 * 1. Open the target Google Sheet → Extensions → Apps Script.
 * 2. Paste this file over the default Code.gs and Save.
 * 3. Run `setupSheet` once from the editor and accept the permission prompt.
 *    This writes/repairs the header row.
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as:        Me
 *      Who has access:    Anyone
 * 5. Copy the /exec URL into the app's environment as
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL.
 *
 * The web app receives this JSON body from app/action.js:
 *   { doctorName, email, hospitalName, submittedAt }
 */

var SHEET_NAME = 'Beta Waiting List';

var HEADERS = [
  'Submitted at',
  "Doctor's name",
  'Email',
  'Hospital name',
];

/** Returns the target sheet, creating and titling it if necessary. */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.getSheets()[0];
    // Only rename an untouched default sheet; never clobber a named one.
    if (sheet.getName() === 'Sheet1' && sheet.getLastRow() === 0) {
      sheet.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }

  return sheet;
}

/** Writes the header row and formats the sheet. Safe to run more than once. */
function setupSheet() {
  var sheet = getSheet_();

  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight('bold')
    .setBackground('#0f172b')
    .setFontColor('#ffffff');

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 260);
  sheet.setColumnWidth(4, 280);

  return 'Sheet ready: ' + sheet.getName();
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Health check — opening the /exec URL in a browser should show this. */
function doGet() {
  return json_({ ok: true, service: 'CareVault beta waiting list' });
}

function doPost(e) {
  // One writer at a time, so two simultaneous submissions can't claim the same row.
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(20000);

    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      body = e.parameter; // form-encoded fallback
    }

    var doctorName = String(body.doctorName || '').trim();
    var email = String(body.email || '').trim();
    var hospitalName = String(body.hospitalName || '').trim();

    if (!doctorName || !email || !hospitalName) {
      return json_({ ok: false, error: 'Missing doctorName, email or hospitalName' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: 'Invalid email address' });
    }

    var sheet = getSheet_();

    if (sheet.getLastRow() === 0) {
      setupSheet();
    }

    // Skip duplicates: the same email should not occupy two places in the cohort.
    if (sheet.getLastRow() > 1) {
      var existing = sheet
        .getRange(2, 3, sheet.getLastRow() - 1, 1)
        .getValues()
        .map(function (row) {
          return String(row[0]).trim().toLowerCase();
        });

      if (existing.indexOf(email.toLowerCase()) !== -1) {
        return json_({ ok: true, duplicate: true });
      }
    }

    var submittedAt = body.submittedAt ? new Date(body.submittedAt) : new Date();

    sheet.appendRow([submittedAt, doctorName, email, hospitalName]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
