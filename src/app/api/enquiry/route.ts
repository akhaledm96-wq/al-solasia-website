import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ProjectEnquiryInput, StoredProjectEnquiry } from '@/lib/enquiry-schema';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'project-enquiries.json');

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
    const body: ProjectEnquiryInput = await req.json();

    // Validation
    if (!body.fullName || !body.phone || !body.projectType || !body.location || !body.currentStage || !body.description || !body.privacyConsent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const enquiry: StoredProjectEnquiry = {
      ...body,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      source: 'website',
      status: 'new',
    };

    await ensureDataFile();

    const fileContent = await fs.readFile(FILE_PATH, 'utf8');
    const enquiries: StoredProjectEnquiry[] = JSON.parse(fileContent || '[]');
    enquiries.unshift(enquiry);

    await fs.writeFile(FILE_PATH, JSON.stringify(enquiries, null, 2), 'utf8');

    return NextResponse.json(
      {
        success: true,
        id: enquiry.id,
        message: body.locale === 'ar' ? 'تم استلام استفسارك بنجاح' : 'Enquiry received successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Project enquiry error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}
