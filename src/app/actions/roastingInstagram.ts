// app/actions/roastInstagram.ts

interface InstagramProfile {
  title?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
}

async function getInstagramProfile(
  username: string
): Promise<InstagramProfile> {
  const response = await fetch(`/api/instagram-profile?username=${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Instagram profile");
  }
  return response.json();
}

export async function roastInstagram(username: string, jsonData?: string) {
  let datas: InstagramProfile | null = null;

  if (jsonData) {
    try {
      datas = JSON.parse(jsonData);
    } catch (error) {
      console.log("Failed to parse JSON");
    }
  }

  if (!datas) {
    datas = await getInstagramProfile(username);
  }

  return datas;
}
