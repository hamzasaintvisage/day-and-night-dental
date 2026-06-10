<?php
// Day Night Dental — secrets for the enquiry endpoint.
// Copy to _config.php and fill in the real values. _config.php is NEVER committed and is
// denied to the web (.htaccess) + is a .php file so PHP executes it (the key is never
// served as source). send-enquiry.php require()s it.
//
// The real _config.php is generated at deploy time from environment values.

define('DND_RESEND_KEY', 're_XXXXXXXXXXXXXXXXXXXX');                          // Resend API key
define('DND_SEND_FROM',  'Day Night Dental <bookings@daynightdental.co.uk>'); // verified sender
define('DND_ENQUIRY_TO', 'reception@daynightdental.co.uk');                   // where enquiries land (comma-separated for >1)
define('DND_SITE',       'https://www.daynightdental.co.uk');                 // canonical site URL
