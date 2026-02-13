export default async function handler(req, res) {
  const { event_name, content_id } = req.query;

  const PIXEL_ID = "1717286162315562"; // Meta Pixel ID
  const ACCESS_TOKEN = "DIN_META_ACCESS_TOKEN"; // Meta Business Manager Access Token

  const body = {
    data: [
      {
        event_name: event_name || "PageView",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: "lk_" + Date.now(),
        user_data: {},
        custom_data: { content_ids: [content_id || "unknown"] }
      }
    ]
  };

  try {
    await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    res.status(200).json({ status: "ok", event_name, content_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.toString() });
  }
}
Add meta-capi.js for CAPI endpoint
