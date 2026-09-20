/**
 * CareVault — Beta onboarding waiting list
 * Google Apps Script web app that appends submissions to a Google Sheet.
 *
 * SETUP
 * 1. Open the target Google Sheet → Extensions → Apps Script.
 * 2. Paste this file over the default Code.gs and Save.
 * 3. Run `setupSheet` once from the editor and accept the permission prompt.
 * 4. Deploy → Manage deployments → edit the existing deployment →
 *    Version: "New version" → Deploy. (Keeps the same /exec URL.)
 *      Execute as:        Me
 *      Who has access:    Anyone
 * 5. Copy the /exec URL into NEXT_PUBLIC_GOOGLE_SCRIPT_URL, in .env.local
 *    locally and in Vercel → Settings → Environment Variables.
 *
 * Open the /exec URL in a browser at any time: it reports which spreadsheet
 * and tab this script is actually writing to, plus current row counts.
 *
 * The web app receives this JSON body from app/action.js:
 *   { doctorName, email, hospitalName, submittedAt }
 */

// The spreadsheet to write to.
//
// Leave this blank. If the script was created from inside the target sheet
// (Extensions -> Apps Script) it is already bound to it and nothing is needed.
//
// Only if the script is standalone, or you want to target a different
// spreadsheet, set the id WITHOUT committing it: in the Apps Script editor go
// to Project Settings -> Script Properties and add
//   SPREADSHEET_ID = <the id from /spreadsheets/d/<THIS PART>/edit>
// It is read below. This repository is public, so the id does not belong in
// this file.

// The exact tab to write to, pinned by gid (the #gid= in the sheet URL).
// Set to null to fall back to SHEET_NAME instead.
var TARGET_GID = 1427530553;

// Used only when TARGET_GID is null or no tab matches it.
var SHEET_NAME = 'Beta Waiting List';

var HEADERS = [
  'Submitted at',
  "Doctor's name",
  'Email',
  'Hospital name',
];

/** The spreadsheet this script writes to. */
function getSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');

  if (id) {
    return SpreadsheetApp.openById(id.trim());
  }

  // Bound script: the spreadsheet this project lives inside.
  var active = SpreadsheetApp.getActiveSpreadsheet();

  if (!active) {
    throw new Error(
      'This script is not bound to a spreadsheet. Add a SPREADSHEET_ID script ' +
      'property (Project Settings -> Script Properties) with the target sheet id.'
    );
  }

  return active;
}

/** Returns the exact tab to append to. */
function getSheet_() {
  var ss = getSpreadsheet_();
  var sheets = ss.getSheets();

  // Prefer the tab pinned by gid — this is the tab in the URL you have open.
  if (TARGET_GID !== null && TARGET_GID !== undefined) {
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === TARGET_GID) {
        return sheets[i];
      }
    }
  }

  // Otherwise fall back to a tab by name, creating it if it does not exist.
  var named = ss.getSheetByName(SHEET_NAME);

  if (named) {
    return named;
  }

  return ss.insertSheet(SHEET_NAME);
}

/**
 * Writes the header row and formats the sheet.
 * Safe to run repeatedly: it only writes headers into an empty sheet, so it
 * will never overwrite rows that are already there.
 */
function setupSheet() {
  var sheet = getSheet_();

  if (sheet.getLastRow() === 0) {
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
  }

  return 'Writing to "' + sheet.getName() + '" (gid ' + sheet.getSheetId() +
    ') in "' + getSpreadsheet_().getName() + '"';
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Health check and diagnostics. Open the /exec URL in a browser to see which
 * spreadsheet and tab this script is actually writing to, and how many rows
 * each tab currently holds. This is the fastest way to answer "where did my
 * submission go?".
 */
function doGet() {
  try {
    var ss = getSpreadsheet_();
    var target = getSheet_();

    var tabs = ss.getSheets().map(function (sh) {
      return {
        name: sh.getName(),
        gid: sh.getSheetId(),
        rows: Math.max(0, sh.getLastRow() - 1),
        isTarget: sh.getSheetId() === target.getSheetId(),
      };
    });

    return json_({
      ok: true,
      service: 'CareVault beta waiting list',
      spreadsheet: { name: ss.getName(), id: ss.getId(), url: ss.getUrl() },
      writingTo: { name: target.getName(), gid: target.getSheetId() },
      rowsInTarget: Math.max(0, target.getLastRow() - 1),
      tabs: tabs,
    });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
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
