import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const folders = ['projects', 'images'];
    const imageList: Array<{ name: string; url: string; folder: string; size: number }> = [];

    for (const folder of folders) {
      const folderPath = path.join(process.cwd(), 'public', folder);
      try {
        const files = await fs.readdir(folderPath);
        for (const file of files) {
          if (/\.(jpg|jpeg|png|webp|svg)$/i.test(file)) {
            const stat = await fs.stat(path.join(folderPath, file));
            imageList.push({
              name: file,
              url: `/${folder}/${file}`,
              folder,
              size: stat.size,
            });
          }
        }
      } catch (err) {
        console.warn(`Could not read folder public/${folder}`, err);
      }
    }

    return NextResponse.json({ success: true, images: imageList });
  } catch (error: any) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to list images' },
      { status: 500 }
    );
  }
}
