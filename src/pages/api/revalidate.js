export default async function handler(req, res) {
  // Check for the post request
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'This endpoint only accepts POST requests' });
  }

  // Check for the token
  if (req.query.secret !== process.env.ONDEMAND_ISR_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // get the data from the request
  const {
    post: { post_type: postType },
    post: { post_name: slug },
  } = req.body;

  // Revalidate the post
  try {
    // Check that the request has a body
    if (!req.body) {
      return res.status(400).json({ error: 'No request body' });
    }

    // Check that the slug is valid
    if (!slug) {
      return res.status(400).json({ error: 'Invalid slug' });
    }

    switch (postType) {
      case 'post':
        console.log(`[ondemand] Revalidating /posts/${slug}/`);
        await res.revalidate(`/posts/${slug}/`);
        console.log(`[ondemand] Revalidated /posts/${slug}/`);
        return res.json({ revalidated: true });
      case 'page':
        console.log(`[ondemand] Revalidating /${slug}/`);
        await res.revalidate(`/${slug}/`);
        console.log(`[ondemand] Revalidated /${slug}/`);
        return res.json({ revalidated: true });
      case 'birds':
        console.log(`[ondemand] Revalidating /birds/${slug}/`);
        await res.revalidate(`/birds/${slug}/`);
        console.log(`[ondemand] Revalidated /${slug}/`);
        return res.json({ revalidated: true });
      case 'journeys':
        console.log(`[ondemand] Revalidating /journeys/${slug}/`);
        await res.revalidate(`/journeys/${slug}/`);
        console.log(`[ondemand] Revalidated /${slug}/`);
        return res.json({ revalidated: true });
      default:
        console.log(`[ondemand] Invalid post type ${slug}`);
        return res.status(400).json({ error: 'Invalid post type' });
    }
  } catch (err) {
    console.log(`[ondemand] Error revalidating ${slug}`);
    return res.status(500).send({ error: 'Error revalidating' });
  }
}
