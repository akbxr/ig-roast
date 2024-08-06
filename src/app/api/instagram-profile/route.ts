import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const profile = await getInstagramProfile(username);
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching Instagram profile:", error);
    return NextResponse.json(
      { message: "Error fetching Instagram profile" },
      { status: 500 }
    );
  }
}

async function getInstagramProfile(username: string) {
  const profileUrl = `https://www.instagram.com/${username}/`;
  const response = await axios.get(profileUrl);
  const $ = cheerio.load(response.data);

  const profile: any = {};

  const titleMeta = $('meta[property="og:title"]').attr("content");
  if (titleMeta) {
    const titleEnd = titleMeta.indexOf("•");
    profile.title = titleEnd !== -1 ? titleMeta.slice(0, titleEnd).trim() : "";
  }

  const bioMeta = $('meta[name="description"]').attr("content");
  if (bioMeta) {
    const bioMatch = bioMeta.match(/"([^"]+)"/);
    profile.bio = bioMatch ? bioMatch[1] : "";

    const statsEnd = bioMeta.indexOf("-");
    if (statsEnd !== -1) {
      const statsStr = bioMeta.slice(0, statsEnd).trim();
      const stats = parseFollowers(statsStr);
      Object.assign(profile, stats);
    }
  }

  return profile;
}

function parseFollowers(input: string) {
  const parts = input.split(", ");
  if (parts.length !== 3) {
    throw new Error("Input string does not have exactly 3 parts");
  }

  return {
    followers: parseNumber(parts[0]),
    following: parseNumber(parts[1]),
    posts: parseNumber(parts[2]),
  };
}

function parseNumber(part: string): number {
  const numberStr = part.split(" ")[0].replace(",", "");
  if (numberStr.endsWith("K")) {
    return Math.round(parseFloat(numberStr.slice(0, -1)) * 1000);
  }
  return parseInt(numberStr, 10);
}
