import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import './ConfigPanel.css';

// Register GSAP plugin
gsap.registerPlugin(Draggable);

interface ConfigValues {
    theme: 'system' | 'light' | 'dark';
    duration: number;
    opacity: number;
    blur: number;
    translate: number;
}

const ConfigPanel: React.FC = () => {
    const panelRef = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<Draggable[] | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const [config, setConfig] = useState<ConfigValues>({
        theme: 'dark',
        duration: 0.26,
        opacity: 0.4,
        blur: 10,
        translate: 12,
    });

    // Update CSS custom properties
    const updateStyles = () => {
        document.documentElement.dataset.theme = config.theme;
        document.documentElement.style.setProperty('--duration', String(config.duration));
        document.documentElement.style.setProperty('--opacity', String(config.opacity));
        document.documentElement.style.setProperty('--blur', String(config.blur));
        document.documentElement.style.setProperty('--translate', String(config.translate));
    };

    useEffect(() => {
        updateStyles();
    }, [config]);

    // Initialize Draggable
    useEffect(() => {
        if (!panelRef.current) return;

        draggableRef.current = Draggable.create(panelRef.current, {
            type: 'x,y',
            allowEventDefault: true,
            trigger: panelRef.current.querySelector('.config-panel-header'),
            bounds: document.body,
        });

        // Double-click to reset position
        const handleDoubleClick = () => {
            if (draggableRef.current && draggableRef.current[0]) {
                gsap.to(panelRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.set(panelRef.current, { clearProps: 'x,y' });
                    },
                });
            }
        };

        panelRef.current.addEventListener('dblclick', handleDoubleClick);

        return () => {
            panelRef.current?.removeEventListener('dblclick', handleDoubleClick);
            draggableRef.current?.forEach(d => d.kill());
        };
    }, []);

    const handleConfigChange = (key: keyof ConfigValues, value: number | string) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="config-panel" ref={panelRef}>
            <button
                className="config-panel-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>config</span>
                <svg
                    className={`config-panel-chevron ${isExpanded ? 'expanded' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>

            {isExpanded && (
                <div className="config-panel-content">
                    {/* Duration */}
                    <div className="config-row">
                        <label htmlFor="config-duration">duration(s)</label>
                        <div className="config-input-group">
                            <input
                                id="config-duration"
                                type="range"
                                min="0.1"
                                max="2"
                                step="0.01"
                                value={config.duration}
                                onChange={(e) => handleConfigChange('duration', parseFloat(e.target.value))}
                            />
                            <span className="config-value">{config.duration.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Opacity */}
                    <div className="config-row">
                        <label htmlFor="config-opacity">opacity</label>
                        <div className="config-input-group">
                            <input
                                id="config-opacity"
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={config.opacity}
                                onChange={(e) => handleConfigChange('opacity', parseFloat(e.target.value))}
                            />
                            <span className="config-value">{config.opacity.toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Blur */}
                    <div className="config-row">
                        <label htmlFor="config-blur">blur(px)</label>
                        <div className="config-input-group">
                            <input
                                id="config-blur"
                                type="range"
                                min="0"
                                max="20"
                                step="1"
                                value={config.blur}
                                onChange={(e) => handleConfigChange('blur', parseInt(e.target.value))}
                            />
                            <span className="config-value">{config.blur}</span>
                        </div>
                    </div>

                    {/* Translate */}
                    <div className="config-row">
                        <label htmlFor="config-translate">translate(px)</label>
                        <div className="config-input-group">
                            <input
                                id="config-translate"
                                type="range"
                                min="0"
                                max="40"
                                step="1"
                                value={config.translate}
                                onChange={(e) => handleConfigChange('translate', parseInt(e.target.value))}
                            />
                            <span className="config-value">{config.translate}</span>
                        </div>
                    </div>

                    {/* Theme */}
                    <div className="config-row">
                        <label htmlFor="config-theme">theme</label>
                        <select
                            id="config-theme"
                            value={config.theme}
                            onChange={(e) => handleConfigChange('theme', e.target.value)}
                        >
                            <option value="system">system</option>
                            <option value="light">light</option>
                            <option value="dark">dark</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfigPanel;
