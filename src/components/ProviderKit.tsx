'use client'
import React, { ReactNode } from "react";
import { ImageKitProvider } from "imagekitio-next";
import axios, { AxiosError } from "axios";
import { SessionProvider } from "next-auth/react";
interface ProviderKitProps {
  children: ReactNode;
  session: any;
}
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGE_KIT_URL;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function ProviderKit({ children, session }: ProviderKitProps) {
  const authenticator = async () => {
    try {
      const response = await axios.get("/api/imagekit-auth");
    console.log(response)
      if (response.status == 500) {
        console.log(`error object ${response}`);

        const errorText = await response.data?.error;
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.data;
      console.log(`data object ${{data}}`);
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: AxiosError | unknown) {
      console.log(`error object ${error}`);
      console.log(`error object ${JSON.stringify(error)}`);
      if (error instanceof AxiosError) {
        throw new Error(`Authentication request failed: ${error.message}`);
      } else {
        throw new Error(`Authentication request failed: ${String(error)}`);
      }
    }
  };

  return (
    <SessionProvider session={session}>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
