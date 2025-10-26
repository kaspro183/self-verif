'use client';

import React, { useEffect, useState } from 'react';
import { getUniversalLink } from '@selfxyz/core';
import {
  SelfQRcodeWrapper,
  SelfAppBuilder,
  type SelfApp,
} from '@selfxyz/qrcode';
import { ethers } from 'ethers';

export default function Page() {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
  const [userId] = useState(ethers.ZeroAddress);

  useEffect(() => {
    try {
      const app = new SelfAppBuilder({
        version: 2,
        appName: process.env.NEXT_PUBLIC_SELF_APP_NAME || 'Self Demo',
        scope: process.env.NEXT_PUBLIC_SELF_SCOPE || 'self-demo-scope',
        endpoint: `${process.env.NEXT_PUBLIC_SELF_ENDPOINT}`, // ex: https://playground.self.xyz
        logoBase64: 'https://i.postimg.cc/mrmVf9hm/self.png',
        userId,
        endpointType: 'staging_https', // passe en prod plus tard
        userIdType: 'hex',
        userDefinedData: 'Hello World',
        disclosures: {
          minimumAge: 18,
          nationality: true,
          gender: true,
        }
      }).build();
      setSelfApp(app);
      getUniversalLink(app); // utile pour deeplinks mobile si besoin
    } catch (e) {
      console.error('Init Self app failed:', e);
    }
  }, [userId]);

  const onSuccess = () => {
    console.log('✅ Verification successful!');
    alert('Vérification réussie ✅');
  };

  return (
    <main style={{maxWidth: 560, margin: '48px auto', textAlign: 'center'}}>
      <h1>Vérifie ton identité (Self)</h1>
      <p>Scanne le QR code avec l’app Self</p>
      {selfApp ? (
        <SelfQRcodeWrapper
          selfApp={selfApp}
          onSuccess={onSuccess}
          onError={() => console.error('Verification error')}
        />
      ) : (
        <div>Chargement du QR code…</div>
      )}
    </main>
  );
}
