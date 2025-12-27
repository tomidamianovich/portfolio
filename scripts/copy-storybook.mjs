import { cpSync, rmSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '..', 'storybook-static');
const destDir = join(__dirname, '..', 'public', 'storybook-static');

// Remove destination if it exists
if (existsSync(destDir)) {
  rmSync(destDir, { recursive: true, force: true });
}

// Create public directory if it doesn't exist
const publicDir = join(__dirname, '..', 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Copy storybook-static to public/storybook-static
if (existsSync(sourceDir)) {
  cpSync(sourceDir, destDir, { recursive: true });
  console.log('✅ Storybook files copied to public/storybook-static');
} else {
  console.error('❌ storybook-static directory not found');
  process.exit(1);
}

