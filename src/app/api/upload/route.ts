import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const targetFolder = (formData.get('folder') as string) || 'projects';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Clean and sanitize filename
    const originalName = file.name || 'uploaded-image.jpg';
    const cleanName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-');

    const destinationDir = path.join(process.cwd(), 'public', targetFolder);
    await fs.mkdir(destinationDir, { recursive: true });

    const finalPath = path.join(destinationDir, cleanName);
    await fs.writeFile(finalPath, buffer);

    const publicUrl = `/${targetFolder}/${cleanName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: cleanName,
      size: buffer.length,
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
