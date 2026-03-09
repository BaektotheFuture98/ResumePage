# Resume Frontend (Next.js)

Windows 98 styled resume portfolio built with React, Next.js, and Framer Motion.

## Features

- ✨ Modern retro Windows 98 UI theme
- 🎬 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎨 Tailwind CSS for styling
- 🖨️ Print-friendly layout
- 📸 Profile photo upload
- 👁️ View counter
- ⚡ Server-side API integration

## Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Axios** - HTTP client

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## API Integration

Frontend communicates with FastAPI backend at `http://localhost:8000`:
- `GET /api/resume` - Fetch resume data
- `POST /api/resume/photo` - Upload profile photo
- `GET /api/views` - Get view count
- `POST /api/views` - Increment view count

## Project Structure

```
frontend/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── TitleBar.tsx
│   ├── MenuBar.tsx
│   ├── ToolBar.tsx
│   ├── AddressBar.tsx
│   ├── StatusBar.tsx
│   ├── ResumeContent.tsx
│   ├── ViewCounter.tsx
│   └── Marquee.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Animations & Motion

- Window entrance animation
- Component stagger animations
- Interactive button feedback
- Marquee scrolling text
- Smooth transitions
- Hover effects on interactive elements

## Print Support

Print-friendly CSS ensures the resume looks professional when printed:
- Hides UI chrome (title bar, toolbar, etc.)
- Preserves colors and styling
- Optimizes for paper output
- Page break control for multi-page resumes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT
