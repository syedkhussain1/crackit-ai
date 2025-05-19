// Import Puppeteer and types from Next.js
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import type { Browser } from 'puppeteer-core';

// Define a type for the request body
type RequestBody = {
  url: string;
};

// This function handles the POST request
export async function POST(req: NextRequest) {
  // Parse the request body to get the URL
  const body: RequestBody = await req.json();
  const { url } = body;

  if (!url) {
    return new NextResponse(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const textContent = await scrapeAllTextWithPuppeteer(url);

    if (textContent) {
      return new NextResponse(JSON.stringify({ textContent }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Failed to scrape the text content' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Scraping error:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred during scraping' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

async function scrapeAllTextWithPuppeteer(url: string): Promise<string | null> {
  let browser: Browser | null = null;

  try {
    // Launch browser with proper configuration
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
    });

    const page = await browser.newPage();
    
    // Set viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Navigate to the URL with proper timeout
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract text content
    const textContent = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.getElementsByTagName('script');
      const styles = document.getElementsByTagName('style');
      while (scripts.length > 0) scripts[0].remove();
      while (styles.length > 0) styles[0].remove();

      // Get the main content
      const mainContent = document.querySelector('main') || document.body;
      return mainContent.innerText;
    });

    // Clean up the text content
    const cleanedText = textContent
      .replace(/\s+/g, ' ')
      .replace(/[^\S\r\n]+/g, ' ')
      .trim();

    return cleanedText;
  } catch (error) {
    console.error("Error scraping with Puppeteer:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
