import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Dynamic params
    const title = searchParams.has('title') 
      ? searchParams.get('title')?.slice(0, 100) 
      : 'B Anish Portfolio';
    
    const type = searchParams.has('type')
      ? searchParams.get('type')
      : 'Product Manager';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '80px',
            backgroundColor: '#0f0f14',
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(200,240,96,0.15) 0%, transparent 50%)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span
              style={{
                color: '#c8f060',
                fontSize: 32,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {type}
            </span>
            <h1
              style={{
                fontSize: 80,
                color: '#f0ede6',
                lineHeight: 1.1,
                fontWeight: 700,
                fontFamily: 'sans-serif',
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '30px',
                  backgroundColor: '#c8f060',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#0f0f14',
                }}
              >
                BA
              </div>
              <span style={{ fontSize: 32, color: '#f0ede6', fontWeight: 500 }}>
                B Anish (Bonagiri Anish)
              </span>
            </div>
            <span style={{ fontSize: 28, color: '#c8f060' }}>
              anish.works
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(e instanceof Error ? e.message : String(e));
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
