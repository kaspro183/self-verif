import { NextResponse } from 'next/server';
import { SelfBackendVerifier, AllIds, DefaultConfigStore } from '@selfxyz/core';

// Single instance (cold start friendly on serverless)
const selfBackendVerifier = new SelfBackendVerifier(
  'self-playground',                               // scope (customize if needed)
  'https://playground.self.xyz/api/verify',        // staging endpoint
  true,                                            // mockPassport: true = staging/test
  AllIds,
  new DefaultConfigStore({
    minimumAge: 18,
    excludedCountries: ['IRN','PRK','RUS','SYR'],
    ofac: true,
  }),
  'uuid'                                           // userIdentifierType
);

export async function POST(req: Request) {
  try {
    const { attestationId, proof, publicSignals, userContextData } = await req.json();

    if (!proof || !publicSignals || !attestationId || !userContextData) {
      return NextResponse.json(
        { message: 'Proof, publicSignals, attestationId and userContextData are required' },
        { status: 200 }
      );
    }

    const result = await selfBackendVerifier.verify(
      attestationId,  // 1=passport, 2=EU ID, 3=Aadhaar
      proof,
      publicSignals,
      userContextData
    );

    if (result.isValidDetails.isValid) {
      return NextResponse.json({
        status: 'success',
        result: true,
        credentialSubject: result.discloseOutput,
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        result: false,
        reason: 'Verification failed',
        error_code: 'VERIFICATION_FAILED',
        details: result.isValidDetails
      },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { status: 'error', result: false, reason: error?.message || 'Unknown error', error_code: 'UNKNOWN_ERROR' },
      { status: 200 }
    );
  }
}
