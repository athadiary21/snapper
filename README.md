# Snapper - Modern Screenshot Tool

A beautiful screenshot application with automatic styling, OCR text extraction, and cloud storage integration.

## Features

- **Screenshot Capture**: Capture full screen or specific areas
- **Automatic Styling**: Apply beautiful backgrounds, padding, shadows, and borders
- **OCR Text Extraction**: Extract text from screenshots using Tesseract.js
- **Cloud Storage**: Save screenshots to Supabase with metadata
- **Preset Management**: Create and manage custom styling presets
- **Gallery View**: Browse and manage your screenshot collection
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **OCR**: Tesseract.js
- **Screenshot**: html2canvas
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/athadiary21/snapper.git
cd snapper
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `docs/database-schema.sql` in the SQL Editor
   - Create a storage bucket named "screenshots" with public access disabled
   - Copy your project URL and anon key

4. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/athadiary21/snapper)

## Usage

### Capturing Screenshots

1. Click on the "Capture" tab
2. Choose "Full Screen" or "Select Area"
3. The screenshot will be captured and opened in the editor

### Editing Screenshots

1. Adjust background color, padding, border radius, and shadow
2. Click "Extract Text (OCR)" to extract text from the screenshot
3. Download the edited screenshot or save it to the cloud

### Managing Presets

1. Go to the "Presets" tab
2. Click "New Preset" to create a custom styling preset
3. Select a preset to apply it when editing screenshots

### Viewing Gallery

1. Go to the "Gallery" tab
2. View all your saved screenshots
3. Download or delete screenshots as needed

## Project Structure

```
snapper/
├── app/
│   ├── api/
│   │   ├── screenshots/
│   │   │   ├── route.ts          # GET, DELETE screenshots
│   │   │   └── upload/
│   │   │       └── route.ts      # POST upload screenshot
│   │   └── presets/
│   │       └── route.ts          # GET, POST, DELETE presets
│   └── page.tsx                  # Main application page
├── components/
│   ├── ScreenshotCapture.tsx     # Capture component
│   ├── ScreenshotEditor.tsx      # Editor component
│   ├── ScreenshotGallery.tsx     # Gallery component
│   └── PresetManager.tsx         # Preset management
├── lib/
│   ├── supabase.ts               # Supabase client
│   └── store.ts                  # Zustand state management
├── docs/
│   └── database-schema.sql       # Database schema
└── README.md
```

## API Routes

### Screenshots

- `GET /api/screenshots?userId={userId}` - Get all screenshots for a user
- `POST /api/screenshots/upload` - Upload a new screenshot
- `DELETE /api/screenshots?id={id}&userId={userId}` - Delete a screenshot

### Presets

- `GET /api/presets?userId={userId}` - Get all presets for a user
- `POST /api/presets` - Create a new preset
- `DELETE /api/presets?id={id}&userId={userId}` - Delete a preset

## Database Schema

The application uses the following tables:

- **screenshots**: Stores screenshot metadata and URLs
- **presets**: Stores user-defined styling presets

See `docs/database-schema.sql` for the complete schema.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database by [Supabase](https://supabase.com/)
- OCR powered by [Tesseract.js](https://tesseract.projectnaptha.com/)

## Support

For issues or questions, please open an issue on GitHub.
