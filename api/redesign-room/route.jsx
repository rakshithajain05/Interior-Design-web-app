import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
  try {
    const { imageUrl, roomType, designType, additionalReq } = await req.json();

    const input = {
      style: "coastal_beachy",
      room_type: roomType.toLowerCase().replace(/ /g, "_") || "living_room",
      room_image: imageUrl, // use uploaded image
    };


    const output = await replicate.run("adirik/interior-design-v2", { input });

    let redesignedUrl;
    if (Array.isArray(output)) {
      redesignedUrl = output[0];
    } else if (output?.href) {
      redesignedUrl = output.href;
    } else {
      redesignedUrl = String(output);
    }

    return NextResponse.json({ result: redesignedUrl });


  } catch (e) {
    console.error("error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
