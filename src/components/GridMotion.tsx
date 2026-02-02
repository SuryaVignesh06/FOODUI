import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

interface GridMotionProps {
    items?: (string | ReactNode)[];
    gradientColor?: string;
    className?: string;
}

export default function GridMotion({
    items = [],
    gradientColor = '#050505',
    className = ''
}: GridMotionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Create 4 rows of items
    const totalItems = 28;
    const itemsPerRow = 7;

    // Fill items array to match totalItems
    const filledItems: (string | ReactNode)[] = [];
    for (let i = 0; i < totalItems; i++) {
        if (items[i] !== undefined) {
            filledItems.push(items[i]);
        } else if (items.length > 0) {
            filledItems.push(items[i % items.length]);
        } else {
            filledItems.push(`Item ${i + 1}`);
        }
    }

    // Split into rows
    const rows: (string | ReactNode)[][] = [];
    for (let i = 0; i < 4; i++) {
        rows.push(filledItems.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Animate each row with different speeds and directions
        const animations: gsap.core.Tween[] = [];

        rowsRef.current.forEach((row, index) => {
            if (!row) return;

            const direction = index % 2 === 0 ? 1 : -1;
            const speed = 20 + (index * 5); // Different speed per row
            const distance = 100 + (index * 20);

            // Initial position offset
            gsap.set(row, { x: direction * -50 });

            const anim = gsap.to(row, {
                x: direction * distance,
                duration: speed,
                ease: 'none',
                repeat: -1,
                yoyo: true,
            });

            animations.push(anim);
        });

        // Mouse movement effect
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            rowsRef.current.forEach((row, index) => {
                if (!row) return;
                const factor = (index + 1) * 15;
                gsap.to(row, {
                    x: `+=${x * factor}`,
                    y: y * factor * 0.5,
                    duration: 0.5,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            animations.forEach(anim => anim.kill());
        };
    }, []);

    const renderItem = (item: string | ReactNode, index: number) => {
        if (typeof item === 'string') {
            // Check if it's a URL (image)
            if (item.startsWith('http') || item.startsWith('/') || item.startsWith('./')) {
                return (
                    <div className="grid-motion-item" key={index}>
                        <img src={item} alt={`Grid item ${index}`} loading="lazy" />
                    </div>
                );
            }
            // Text content
            return (
                <div className="grid-motion-item" key={index}>
                    <div className="grid-motion-item-text">{item}</div>
                </div>
            );
        }
        // JSX content
        return (
            <div className="grid-motion-item" key={index}>
                {item}
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className={`grid-motion-container ${className}`}
            style={{ '--gradient-color': gradientColor } as React.CSSProperties}
        >
            <div className="grid-motion-inner">
                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        ref={el => { rowsRef.current[rowIndex] = el; }}
                        className="grid-motion-row"
                        style={{
                            justifyContent: rowIndex % 2 === 0 ? 'flex-start' : 'flex-end',
                            marginLeft: rowIndex % 2 === 0 ? '-50px' : '0',
                            marginRight: rowIndex % 2 === 0 ? '0' : '-50px'
                        }}
                    >
                        {row.map((item, itemIndex) => renderItem(item, rowIndex * itemsPerRow + itemIndex))}
                    </div>
                ))}
            </div>

            {/* Gradient overlays */}
            <div className="grid-motion-gradient-overlay grid-motion-gradient-top" />
            <div className="grid-motion-gradient-overlay grid-motion-gradient-bottom" />
            <div className="grid-motion-gradient-overlay grid-motion-gradient-left" />
            <div className="grid-motion-gradient-overlay grid-motion-gradient-right" />
        </div>
    );
}
