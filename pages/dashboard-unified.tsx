// Unified Dashboard - Hope Recovery Network + POLR Integration
// Combines recovery management with POLR Network features

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// POLR Design Tokens
const POLR_COLORS = {
  navy: '#0c1a2e',
  navy2: '#1a2f4a', 
  navy3: '#243550',
  gold: '#c8913a',
  gold2: '#e8aa55',
  gold3: '#f5d48a',
  cream: '#faf7f2',
  cream2: '#f0ebe1',
  white: '#fff',
  text: '#1a1a2a',
  muted: '#5a6070',
  light: '#9aa0ae',
  border: '#e2ddd6',
  bg: '#060b14',
  bg2: '#0a1120',
  bg3: '#0f1929',
  bg4: '#142035'
};

export default function UnifiedDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    if (!token) {
      router.push('/api/auth/login');
      return;
    }
    setAuthToken(token);
  }, [router]);

  if (!mounted) return null;

  // POLR Network Features
  const polrFeatures = [
    { title: 'Member Management', icon: 'users', description: 'Complete member lifecycle management' },
    { title: 'Workforce Development', icon: 'briefcase', description: 'Job training and employment programs' },
    { title: 'Housing Management', icon: 'home', description: 'Recovery housing and facilities' },
    { title: 'Education Programs', icon: 'graduation-cap', description: 'Educational support and training' },
    { title: 'Spiritual Growth', icon: 'cross', description: 'Christ-centered recovery programs' },
    { title: 'Community Outreach', icon: 'hands-helping', description: 'Community service and outreach' }
  ];

  // Hope Recovery Features
  const hopeFeatures = [
    { title: 'Real-time Analytics', icon: 'chart-line', description: 'Live platform metrics and insights' },
    { title: 'Zero Trust Security', icon: 'shield-alt', description: 'Enterprise-grade security architecture' },
    { title: 'Self-Maintaining', icon: 'cogs', description: 'Automated platform maintenance' },
    { title: 'Mobile Responsive', icon: 'mobile-alt', description: 'Full mobile and desktop support' },
    { title: 'API Integration', icon: 'plug', description: 'Third-party service integration' },
    { title: 'Cloud Deployment', icon: 'cloud', description: 'Scalable cloud infrastructure' }
  ];

  return (
    <>
      <Head>
        <title>POLR Hope Network - Unified Recovery Platform</title>
        <meta name="description" content="Christ-centered recovery ministry platform with modern technology" />
        <style>{`
          :root {
            --navy: ${POLR_COLORS.navy};
            --navy2: ${POLR_COLORS.navy2};
            --navy3: ${POLR_COLORS.navy3};
            --gold: ${POLR_COLORS.gold};
            --gold2: ${POLR_COLORS.gold2};
            --gold3: ${POLR_COLORS.gold3};
            --cream: ${POLR_COLORS.cream};
            --cream2: ${POLR_COLORS.cream2};
            --white: ${POLR_COLORS.white};
            --text: ${POLR_COLORS.text};
            --muted: ${POLR_COLORS.muted};
            --light: ${POLR_COLORS.light};
            --border: ${POLR_COLORS.border};
            --bg: ${POLR_COLORS.bg};
            --bg2: ${POLR_COLORS.bg2};
            --bg3: ${POLR_COLORS.bg3};
            --bg4: ${POLR_COLORS.bg4};
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; 
            background: linear-gradient(135deg, var(--bg) 0%, var(--navy) 100%);
            color: var(--text);
            min-height: 100vh;
          }
          .dashboard-header {
            background: rgba(12, 26, 46, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 2px solid var(--gold);
            padding: 1.5rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
            font-family: 'Cinzel', serif;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--gold2);
            text-decoration: none;
          }
          .nav-tabs {
            display: flex;
            gap: 2rem;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.5rem;
            border-radius: 12px;
          }
          .nav-tab {
            padding: 0.75rem 1.5rem;
            background: transparent;
            border: none;
            color: var(--light);
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s;
            font-weight: 500;
          }
          .nav-tab.active {
            background: var(--gold);
            color: var(--white);
          }
          .nav-tab:hover:not(.active) {
            background: rgba(255, 255, 255, 0.1);
          }
          .dashboard-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
          }
          .section-title {
            font-family: 'Cinzel', serif;
            font-size: 2.5rem;
            font-weight: 600;
            color: var(--gold2);
            margin-bottom: 1rem;
            text-align: center;
          }
          .section-subtitle {
            font-family: 'Crimson Text', serif;
            font-style: italic;
            font-size: 1.2rem;
            color: var(--light);
            text-align: center;
            margin-bottom: 3rem;
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }
          .feature-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
          }
          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), var(--gold2));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.35s;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 48px rgba(200, 145, 58, 0.2);
          }
          .feature-card:hover::before {
            transform: scaleX(1);
          }
          .feature-icon {
            font-size: 2.5rem;
            color: var(--gold2);
            margin-bottom: 1rem;
          }
          .feature-title {
            font-family: 'Cinzel', serif;
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--white);
            margin-bottom: 0.75rem;
          }
          .feature-description {
            color: var(--light);
            line-height: 1.6;
            font-size: 1rem;
          }
          .stats-section {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 20px;
            padding: 3rem;
            margin-bottom: 3rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
          }
          .stat-item {
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: var(--gold2);
            margin-bottom: 0.5rem;
            font-family: 'Cinzel', serif;
          }
          .stat-label {
            color: var(--light);
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .action-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 3rem;
          }
          .btn-primary {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--gold), #8b5e2a);
            color: var(--white);
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 4px 20px rgba(200, 145, 58, 0.3);
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(200, 145, 58, 0.4);
          }
          .btn-secondary {
            padding: 1rem 2rem;
            background: transparent;
            color: var(--gold2);
            border: 2px solid var(--gold);
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
          }
          .btn-secondary:hover {
            background: var(--gold);
            color: var(--white);
          }
        `}</style>
      </Head>

      <div className="dashboard-header">
        <div className="header-content">
          <a href="/" className="logo">POLR Hope Network</a>
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`nav-tab ${activeTab === 'polr' ? 'active' : ''}`}
              onClick={() => setActiveTab('polr')}
            >
              POLR Network
            </button>
            <button 
              className={`nav-tab ${activeTab === 'hope' ? 'active' : ''}`}
              onClick={() => setActiveTab('hope')}
            >
              Hope Platform
            </button>
          </nav>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <>
            <h1 className="section-title">Unified Recovery Platform</h1>
            <p className="section-subtitle">
              Combining POLR Network's ministry expertise with Hope Platform's modern technology
            </p>

            <div className="stats-section">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">2</div>
                  <div className="stat-label">Platforms Integrated</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Core Features</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Mobile Responsive</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Available</div>
                </div>
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">church</div>
                <h3 className="feature-title">Christ-Centered Recovery</h3>
                <p className="feature-description">
                  Faith-based recovery programs combining spiritual growth with modern technology
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">shield-alt</div>
                <h3 className="feature-title">Zero Trust Security</h3>
                <p className="feature-description">
                  Enterprise-grade security protecting sensitive member data and ministry information
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">chart-line</div>
                <h3 className="feature-title">Real-Time Analytics</h3>
                <p className="feature-description">
                  Live insights into program effectiveness, member progress, and operational metrics
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'polr' && (
          <>
            <h1 className="section-title">POLR Network Features</h1>
            <p className="section-subtitle">
              Christ-centered recovery ministry platform with comprehensive member management
            </p>

            <div className="features-grid">
              {polrFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'hope' && (
          <>
            <h1 className="section-title">Hope Platform Technology</h1>
            <p className="section-subtitle">
              Modern self-maintaining platform architecture with enterprise features
            </p>

            <div className="features-grid">
              {hopeFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="action-buttons">
          <a href="/api/health" className="btn-primary">
            System Health
          </a>
          <a href="/landing" className="btn-secondary">
            Landing Page
          </a>
          <a href="/api/status" className="btn-secondary">
            Platform Status
          </a>
        </div>
      </div>
    </>
  );
}
