const CHANNEL_ID = "UCoiYa1s9a9RBuIEEqugWIMA"; // @vinaykumarr9273

// Uses YouTube's public RSS feed instead of the YouTube Data API — no API
// key or Google Cloud project needed, and no usage quota to worry about.
// Cached for an hour (see `next: { revalidate }` below) so we're not
// re-fetching on every single page load.
export async function getLatestVideos(limit = 3) {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1); // first chunk is feed metadata, not a video

    return entries
      .slice(0, limit)
      .map((entry) => {
        const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1];
        const rawTitle = (entry.match(/<title>(.*?)<\/title>/) || [])[1];
        const title = rawTitle
          ? rawTitle.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
          : "Untitled";
        return videoId ? { videoId, title } : null;
      })
      .filter(Boolean);
  } catch {
    // If YouTube is unreachable or the feed shape changes, fail quietly —
    // the section that calls this just renders nothing rather than crashing
    // the whole page.
    return [];
  }
}

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@vinaykumarr9273";
