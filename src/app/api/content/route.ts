import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'ar';

    if (locale !== 'ar' && locale !== 'en') {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const messages = JSON.parse(fileContent);

    return NextResponse.json({ success: true, locale, messages });
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json(
      { error: 'Failed to read translation messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { locale, messages, section, sectionData } = body;

    if (!locale || (locale !== 'ar' && locale !== 'en')) {
      return NextResponse.json({ error: 'Invalid or missing locale' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    let currentContent: any = {};

    try {
      const existing = await fs.readFile(filePath, 'utf-8');
      currentContent = JSON.parse(existing);
    } catch {
      currentContent = {};
    }

    let updatedContent = { ...currentContent };

    if (messages && typeof messages === 'object') {
      updatedContent = { ...currentContent, ...messages };
    } else if (section && sectionData && typeof sectionData === 'object') {
      updatedContent[section] = {
        ...(updatedContent[section] || {}),
        ...sectionData,
      };
    } else {
      return NextResponse.json(
        { error: 'Missing messages or section data to update' },
        { status: 400 }
      );
    }

    // 1. Create a safe backup before writing
    const backupsDir = path.join(process.cwd(), 'data', 'backups');
    await fs.mkdir(backupsDir, { recursive: true });
    const backupFileName = `messages-${locale}-${Date.now()}.json`;
    await fs.writeFile(
      path.join(backupsDir, backupFileName),
      JSON.stringify(currentContent, null, 2),
      'utf-8'
    );

    // 2. Write the updated messages file
    await fs.writeFile(filePath, JSON.stringify(updatedContent, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${locale.toUpperCase()} content to disk.`,
      backup: backupFileName,
    });
  } catch (error: any) {
    console.error('Error saving messages:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save translation messages' },
      { status: 500 }
    );
  }
}
