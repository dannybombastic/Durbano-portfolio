/**
 * Production SSR Server Wrapper
 * This wrapper manually loads Angular manifests before starting the server
 * Workaround for Angular 20 manifest loading issue in production
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Manually load and set manifests
async function loadManifests() {
  try {
    const serverDir = join(__dirname, 'dist', 'daniel-urbano-portfolio', 'server');
    
    // Import manifest files
    const appEngineManifest = await import(join(serverDir, 'angular-app-engine-manifest.mjs'));
    const appManifest = await import(join(serverDir, 'angular-app-manifest.mjs'));
    
    console.log('✅ Manifests loaded successfully');
    
    // Import and start the server
    const { default: serverModule } = await import(join(serverDir, 'server.mjs'));
    
    console.log('🚀 SSR Server started successfully');
    
  } catch (error) {
    console.error('❌ Failed to start SSR server:', error);
    process.exit(1);
  }
}

loadManifests();
