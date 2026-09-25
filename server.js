import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets from root directory and src/assets
app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));
app.use(express.static(__dirname, { extensions: ['html'] }));

// Handle contact form submission gracefully if POSTed
app.post(['/contact', '/contact.html'], (req, res) => {
  const { name, email, service_requested } = req.body;
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Received | MAKS IT Solutions</title>
    <meta property="og:title" content="Inquiry Received | MAKS IT Solutions">
    <link rel="stylesheet" href="style.css">
    <script src="theme.js"></script>
</head>
<body>
    <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="brand-wordmark">
                <span class="brand-dot"></span>
                <span>MAKS IT Solutions</span>
            </a>
            <nav class="site-nav">
                <a href="index.html" class="nav-link">Home</a>
                <a href="it-consulting.html" class="nav-link">IT Consulting</a>
                <a href="recruitment.html" class="nav-link">Recruitment</a>
                <a href="services.html" class="nav-link">All Services</a>
                <a href="contact.html" class="nav-link active">Contact</a>
            </nav>
            <div class="header-actions">
                <button class="theme-toggle-btn" id="themeToggleBtn" type="button" aria-label="Toggle Psychological Blue Mode">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    <span>Deep Navy</span>
                </button>
                <a href="contact.html" class="btn btn-primary btn-sm">Request Proposal</a>
            </div>
        </div>
    </header>
    <main class="section-spacing text-center">
        <div class="container" style="max-width: 640px; margin: 0 auto; background: var(--bg-surface); padding: 48px; border-radius: var(--radius-xl); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-lg);">
            <div style="width: 56px; height: 56px; background: var(--accent-emerald-subtle); color: var(--accent-emerald); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 class="section-title" style="font-size: 1.85rem;">Thank You${name ? ', ' + escapeHtml(name) : ''}!</h1>
            <p style="font-size: 1.05rem; color: var(--text-secondary); margin: 16px 0 32px 0; line-height: 1.6;">
                We have received your inquiry${service_requested ? ` regarding <strong>${escapeHtml(service_requested)}</strong>` : ''}. A senior technical advisor will review your specifications and contact you shortly at <strong>${escapeHtml(email || 'your email')}</strong>.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <a href="index.html" class="btn btn-primary">Return to Homepage</a>
                <a href="it-consulting.html" class="btn btn-outline">Explore IT Plans</a>
            </div>
        </div>
    </main>
    <footer class="site-footer">
        <div class="container text-center">
            <p>&copy; 2026 MAKS IT Solutions &middot; Kumar IT &amp; Infra Solutions. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`);
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Fallback to index.html for root or unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
