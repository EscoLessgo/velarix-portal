import React from 'react';
import { SidebarTree } from '@/components/SidebarTree';
import { ConfigPanel } from '@/components/ConfigPanel';
import { AudioPlayer } from '@/components/AudioPlayer';
import './SidebarLayout.css';

// Bear link SVG component (from original CodePen - credit to Jhey)
const BearLink: React.FC = () => (
    <a
        aria-label="Follow Jhey"
        className="bear-link"
        href="https://twitter.com/intent/follow?screen_name=jh3yy"
        target="_blank"
        rel="noreferrer noopener"
    >
        <svg
            viewBox="0 0 969 955"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="161.191"
                cy="320.191"
                r="133.191"
                stroke="currentColor"
                strokeWidth="20"
            />
            <circle
                cx="806.809"
                cy="320.191"
                r="133.191"
                stroke="currentColor"
                strokeWidth="20"
            />
            <circle
                cx="695.019"
                cy="587.733"
                r="31.4016"
                fill="currentColor"
            />
            <circle
                cx="272.981"
                cy="587.733"
                r="31.4016"
                fill="currentColor"
            />
            <path
                d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
                fill="currentColor"
            />
            <rect
                x="310.42"
                y="448.31"
                width="343.468"
                height="51.4986"
                fill="#FF1E1E"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
                fill="currentColor"
            />
        </svg>
    </a>
);

// Main content area component
const MainContent: React.FC = () => {
    return (
        <div className="main-content">
            <div className="content-wrapper">
                <h1 className="content-title">
                    <span className="gradient-text">Esco's Digital Hub</span>
                </h1>
                <p className="content-subtitle">
                    Welcome to my portfolio! Navigate through my projects, games, and creative experiments using the sidebar. Click any external link to visit the site.
                </p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon discord">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </div>
                        <h3>Discord Games</h3>
                        <p>Install Farkle, AlphaBee, or SquareRoots directly to your Discord server!</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon music">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                            </svg>
                        </div>
                        <h3>Live Visualizer</h3>
                        <p>Check out what I'm listening to with the live Spotify audio visualizer.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon tools">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                            </svg>
                        </div>
                        <h3>Apps & Tools</h3>
                        <p>Spelling Bee, Find, Inlet, and more utility apps.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon creative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                            </svg>
                        </div>
                        <h3>Creative Projects</h3>
                        <p>Esco Signs, 404 Creative pages, Crypto Hub, and experiments.</p>
                    </div>
                </div>

                <div className="quick-links">
                    <h2>Quick Access</h2>
                    <div className="quick-links-grid">
                        <a href="https://velarixsolutions.nl" target="_blank" rel="noopener noreferrer" className="quick-link main">
                            <span className="quick-link-title">Velarix Solutions</span>
                            <span className="quick-link-desc">Main Hub</span>
                        </a>
                        <a href="https://more.velarixsolutions.nl" target="_blank" rel="noopener noreferrer" className="quick-link">
                            <span className="quick-link-title">EscosArchive</span>
                            <span className="quick-link-desc">All Projects</span>
                        </a>
                        <a href="https://spoti.velarixsolutions.nl" target="_blank" rel="noopener noreferrer" className="quick-link">
                            <span className="quick-link-title">Spotify Visualizer</span>
                            <span className="quick-link-desc">Live Audio</span>
                        </a>
                        <a href="https://pastebin.com/u/EscoBreakTings" target="_blank" rel="noopener noreferrer" className="quick-link">
                            <span className="quick-link-title">Escos Entries</span>
                            <span className="quick-link-desc">Thoughts & Notes</span>
                        </a>
                    </div>
                </div>

                <div className="keyboard-hints">
                    <h2>Navigation Tips</h2>
                    <div className="hints-grid">
                        <div className="hint">
                            <kbd>/</kbd>
                            <span>Focus search</span>
                        </div>
                        <div className="hint">
                            <kbd>↑</kbd> <kbd>↓</kbd>
                            <span>Navigate items</span>
                        </div>
                        <div className="hint">
                            <kbd>←</kbd> <kbd>→</kbd>
                            <span>Collapse / Expand</span>
                        </div>
                        <div className="hint">
                            <kbd>Esc</kbd>
                            <span>Clear search</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarLayout: React.FC = () => {
    return (
        <div className="sidebar-layout">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed inset-0 w-full h-full object-cover -z-50"
            >
                <source src="/background-new.mp4" type="video/mp4" />
            </video>

            {/* Grid background pattern */}
            <div className="grid-background" />

            {/* Bear link (original CodePen credit) - REMOVED */}
            {/* <BearLink /> */}

            {/* Config Panel */}
            <ConfigPanel />

            {/* Audio Player with Visualizer */}
            <AudioPlayer />

            {/* Main layout */}
            <div className="layout-container">
                {/* Sidebar */}
                <div className="sidebar-wrapper">
                    <SidebarTree />
                </div>

                {/* Main content area */}
                <MainContent />
            </div>
        </div>
    );
};

export default SidebarLayout;
