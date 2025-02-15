import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL!,
});

export async function GET() {
  try {
    const authParam = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParam,{status:200});
  } catch (e) {
    return NextResponse.json(
      { error: e, messsage: "Image Auth Failed" },
      { status: 500 }
    );
  }
}
