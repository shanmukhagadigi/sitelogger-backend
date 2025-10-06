const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const LOG_FILE = path.join(__dirname, '..', 'visited_sites.txt');
const SITE_TO_CHECK = 'chatgpt';

function logVisit(site) {
    if(site && site.toLowerCase().includes('chatgpt')){
        return {
            site: SITE_TO_CHECK,
            message: 'Please do not share sensitive information'
        }
    }
    return {
        site,
        message: 'Visit logged successfully'
    };
}

// POST /visited
router.post('/', async (req, res) => {
  try {
    const { site } = req.body;

    if (!site) {
      return res.status(400).json({ error: 'Site field is required' });
    }

    const visitInfo = {
      site,
      timestamp: new Date().toISOString(),
    };

    const logEntry = `${visitInfo.timestamp} - ${visitInfo.site}\n`;

    // Asynchronously append to file
    await fs.appendFile(LOG_FILE, logEntry, 'utf8');

    res.status(200).json({ message: logVisit(site) });
  } catch (err) {
    console.error('Error writing to file:', err);
    res.status(500).json({ error: 'Failed to log visit' });
  }
});

module.exports = router;
