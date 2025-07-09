const webpush = require('web-push');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:support@travelapp.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// Endpoint to get VAPID public key
router.get('/vapidPublicKey', (req, res) => {
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// Endpoint to save push subscription for a user
router.post('/subscribe', async (req, res) => {
  const { email, subscription } = req.body;
  // Save subscription to user in DB (pseudo code)
  await User.updateOne({ email }, { $set: { pushSubscription: subscription } });
  res.json({ success: true });
}); 