const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a write stream for the ZIP file
const output = fs.createWriteStream('archive-chat-logs-nextjs.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('ZIP file created successfully!');
  console.log('Total bytes: ' + archive.pointer());
});

// Handle errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
const filesToInclude = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'src/lib/utils.ts',
  'src/contexts/ThemeContext.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Input.tsx',
  'src/components/ui/Select.tsx',
  'src/components/ui/Switch.tsx',
  'src/components/ui/Loading.tsx',
  'src/components/Navbar.tsx',
  'src/components/NavbarMobile.tsx',
  'src/components/DarkModeToggle.tsx',
  'src/components/SearchForm.tsx',
  'src/components/SearchResults.tsx',
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/about/page.tsx'
];

filesToInclude.forEach(file => {
  if (fs.existsSync(file)) {
    archive.file(file, { name: file });
  }
});

// Finalize the archive
archive.finalize();