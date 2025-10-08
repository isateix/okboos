import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + '-' + file.name;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'proof_of_payment');
  const filePath = path.join(uploadDir, filename);

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }

  const publicPath = path.join('/uploads', 'proof_of_payment', filename);

  return NextResponse.json({ filePath: publicPath }, { status: 201 });
}
