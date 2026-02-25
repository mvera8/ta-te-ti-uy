export const revalidate = 300; // re-chequea cada 60 segundos

export async function GET() {
    return Response.json({ ok: true });
}