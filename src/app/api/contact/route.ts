import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ContactEnquiryInput, StoredContactEnquiry } from '@/lib/enquiry-schema';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'contact-messages.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(FILE_PATH);
    } catch {
      await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactEnquiryInput = await req.json();

    if (!body.fullName || (!body.phone && !body.email) || !body.enquiryType || !body.message || !body.privacyConsent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const message: StoredContactEnquiry = {
      ...body,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      source: 'website',
      status: 'new',
    };

    await ensureDataFile();

    const fileContent = await fs.readFile(FILE_PATH, 'utf8');
    const messages: StoredContactEnquiry[] = JSON.parse(fileContent || '[]');
    messages.unshift(message);

    await fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2), 'utf8');

    return NextResponse.json(
      {
        success: true,
        id: message.id,
        message: body.locale === 'ar' ? 'تم استلام رسالتك بنجاح' : 'Message received successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact message error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing message' },
      { status: 500 }
    );
  }
}
