export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { event_name, event_id, content_id, fbp, fbc } = req.body;

  const pixel_id = process.env.META_PIXEL_ID;
  const access_token = process.env.META_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v18.0/${pixel_id}/events?access_token=${access_token}`;

  const payload = {
    data: [
      {
        event_name: event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id,
        action_source: "website",
        user_data: {
          fbp: fbp,
          fbc: fbc
        },
        custom_data: {
          content_ids: [content_id],
          content_type: "music"
        }
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  res.status(200).json(result);
}
