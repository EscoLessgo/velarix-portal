import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TREE_DATA, TreeItem, TreeData } from './treeData';
import './SidebarTree.css';

// Icon components
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon">
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="external-link-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const VelarixLogo = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m3.98448 20.5882-1.17645 1.6174m-.22047-1.3969 1.61739 1.1764M22.144.730378 20.6832 2.09646m.0474-1.413417 1.366 1.460757" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="m3.90821 18.5526-.59559.0726c.03203.2626.23224.4732.49285.5185l.10274-.5911ZM20.601 4.22249l.3908.45525c.1679-.14415.2428-.36902.195-.58508-.0479-.21606-.2109-.38822-.424-.44793l-.1618.57776Zm.6023-.00906c-.0066-.33131-.2805-.59453-.6118-.58794-.3313.0066-.5945.28052-.5879.61183l1.1997-.02389Zm-.2556 17.30047-.1028.5911c.1766.0307.3576-.0191.4935-.1358.136-.1168.2127-.2881.2091-.4673l-.5998.012ZM3.03505 11.3945l-.39082-.4552c-.15222.1306-.22906.3287-.20477.5279l.59559-.0727ZM13.8216 1.69999c-.3191-.0894-.6502.0968-.7396.41588-.0894.31909.0968.65023.4159.73963l.3237-1.15551ZM4.29903 19.0078 20.9918 4.67774l-.7816-.91051L3.51739 18.0973l.78164.9105ZM20.0036 4.23732l.3442 17.28848 1.1997-.0239-.3442-17.28847-1.1997.02389ZM3.80547 19.1437 20.8449 22.105l.2055-1.1823-17.03946-2.9613-.20547 1.1823Zm-.3796-7.2939L14.0485 2.73064l-.7816-.91052L2.64423 10.9393l.78164.9105Zm1.07792 6.6301-.87316-7.158-1.19117.1453.87316 7.158 1.19117-.1453ZM20.7628 3.64473l-6.9412-1.94474-.3237 1.15551 6.9412 1.94474.3237-1.15551Z" fill="currentColor"></path>
        <path d="m15.7227 7.75 4.9996 13.5001M8.13672 14.2656 20.724 21.2521" stroke="currentColor" strokeWidth="1.2"></path>
        <path d="M7.0673 8.29748c-.11208-.31184-.45574-.47378-.76758-.36169-.31184.11208-.47377.45574-.36169.76758l1.12927-.40589Zm2.05515 5.71782L7.0673 8.29748l-1.12927.40589 2.05515 5.71783 1.12927-.4059Z" fill="currentColor"></path>
        <path d="m15.6133 8.16406-5.1156-2.66251" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"></path>
    </svg>
);

// Generate tree HTML markup
function generateTreeHTML(data: TreeData): string {
    const processItems = (items: TreeItem[], level = 1): string => {
        const setSize = items.length;
        const htmlParts: string[] = [];

        items.forEach((item, index) => {
            const posInSet = index + 1;
            const hasChildren = item.items && item.items.length > 0;
            const itemId = `tree-item-${item.id}`;
            const groupId = hasChildren ? `tree-group-${item.id}` : null;
            const isExternal = item.external === true;

            let html = `<li role="none">`;
            html += `<a
        id="${itemId}"
        role="treeitem"
        href="${item.href || '#'}"
        tabindex="${item.current ? '0' : '-1'}"
        aria-level="${level}"
        aria-setsize="${setSize}"
        aria-posinset="${posInSet}"
        ${item.current ? 'aria-current="page"' : ''}
        ${hasChildren ? `aria-expanded="false" aria-owns="${groupId}"` : ''}
        ${isExternal ? 'data-external="true" target="_blank" rel="noopener noreferrer"' : ''}
        ${item.description ? `data-description="${item.description}"` : ''}
      >`;

            html += `<span>${item.label}</span>`;

            if (isExternal && !hasChildren) {
                html += `<span class="external-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </span>`;
            }

            if (hasChildren) {
                html += `<span class="tree-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>`;
            }

            html += `</a>`;

            if (hasChildren && item.items) {
                html += `<div inert>`;
                html += `<ul id="${groupId}" role="group">`;
                html += processItems(item.items, level + 1);
                html += `</ul>`;
                html += `</div>`;
            }

            html += `</li>`;
            htmlParts.push(html);
        });

        return htmlParts.join('');
    };

    // Handle groups structure
    if (data.groups) {
        let treeHTML = `<ul role="tree" aria-label="${data.label}">`;

        data.groups.forEach((group, groupIndex) => {
            const groupId = `tree-group-toplevel-${groupIndex}`;
            treeHTML += `<li role="none" class="tree-group-container">`;
            treeHTML += `<ul role="group" id="${groupId}">`;
            treeHTML += processItems(group.items);
            treeHTML += `</ul>`;
            treeHTML += `</li>`;
        });

        treeHTML += `</ul>`;
        return treeHTML;
    }

    return '';
}

interface NodeInfo {
    id: string;
    level: number;
    hasChildren: boolean;
    parentId: string | null;
    label: string;
}

const SidebarTree: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<HTMLElement | null>(null);
    const nodeMapRef = useRef<Map<string, NodeInfo>>(new Map());
    const [searchTerm, setSearchTerm] = useState('');

    // Helper to check if an item is expanded
    const isExpanded = useCallback((item: Element): boolean => {
        return item.getAttribute('aria-expanded') === 'true';
    }, []);

    // Helper to find parent tree item
    const findParentTreeItem = useCallback((childElement: Element): Element | null => {
        const parentGroup = childElement.closest('ul[role="group"][id]');
        if (parentGroup && parentGroup.id.startsWith('tree-group-') && !parentGroup.id.includes('toplevel')) {
            return containerRef.current?.querySelector(`[aria-owns="${parentGroup.id}"]`) || null;
        }
        return null;
    }, []);

    // Helper to get group element from tree item
    const getGroupFromItem = useCallback((item: Element): Element | null => {
        const groupId = item.getAttribute('aria-owns');
        return groupId ? document.getElementById(groupId) : null;
    }, []);

    // Reset tab indexes
    const resetTabIndexes = useCallback(() => {
        if (!treeRef.current) return;
        treeRef.current.querySelectorAll('[role="treeitem"]').forEach(el => {
            el.setAttribute('tabindex', '-1');
        });
    }, []);

    // Set focus to item
    const setFocusToItem = useCallback((item: Element, updateTabindex = true) => {
        if (!item) return;

        if (updateTabindex) {
            resetTabIndexes();
            item.setAttribute('tabindex', '0');
        }

        (item as HTMLElement).focus();
    }, [resetTabIndexes]);

    // Toggle expanded state
    const toggleExpanded = useCallback((item: Element) => {
        const wasExpanded = isExpanded(item);
        const group = getGroupFromItem(item);

        if (group) {
            const wrapper = group.parentElement;
            item.setAttribute('aria-expanded', String(!wasExpanded));

            if (wasExpanded) {
                wrapper?.setAttribute('inert', '');
            } else {
                wrapper?.removeAttribute('inert');
            }
        }
    }, [isExpanded, getGroupFromItem]);

    // Activate item (set current)
    const activateItem = useCallback((item: Element) => {
        if (!treeRef.current) return;

        treeRef.current.querySelectorAll('[aria-current="page"]').forEach(el => {
            el.removeAttribute('aria-current');
        });

        item.setAttribute('aria-current', 'page');
        resetTabIndexes();
        item.setAttribute('tabindex', '0');
    }, [resetTabIndexes]);

    // Get all visible items
    const getVisibleItems = useCallback((): Element[] => {
        if (!treeRef.current) return [];

        const items: Element[] = [];
        const walkTree = (element: Element) => {
            const directItems = element.querySelectorAll(':scope > li > [role="treeitem"]');
            const groupItems = element.querySelectorAll(':scope > li > ul[role="group"] > li > [role="treeitem"]');
            const treeItems = [...Array.from(directItems), ...Array.from(groupItems)];

            treeItems.forEach(item => {
                items.push(item);
                if (isExpanded(item)) {
                    const group = getGroupFromItem(item);
                    if (group) {
                        walkTree(group);
                    }
                }
            });
        };

        walkTree(treeRef.current);
        return items;
    }, [isExpanded, getGroupFromItem]);

    // Ensure item is visible
    const ensureItemVisible = useCallback((item: Element) => {
        if (!treeRef.current) return;

        let parent = item.parentElement;
        while (parent && parent !== treeRef.current) {
            if (parent.getAttribute('role') === 'group') {
                const wrapper = parent.parentElement;
                if (wrapper && wrapper.hasAttribute('inert')) {
                    const parentItem = treeRef.current.querySelector(`[aria-owns="${parent.id}"]`);
                    if (parentItem && !isExpanded(parentItem)) {
                        toggleExpanded(parentItem);
                    }
                }
            }
            parent = parent.parentElement;
        }
    }, [isExpanded, toggleExpanded]);

    // Filter function
    const filter = useCallback((searchTermValue: string): number => {
        if (!treeRef.current) return 0;

        const allItems = treeRef.current.querySelectorAll('[role="treeitem"]');

        if (!searchTermValue || searchTermValue.length < 3) {
            allItems.forEach(item => {
                item.removeAttribute('data-filtered');
                item.removeAttribute('data-search-match');
                item.removeAttribute('data-search-related');
            });
            treeRef.current.removeAttribute('data-filtering');

            const allExpandable = treeRef.current.querySelectorAll('[aria-expanded="true"]');
            allExpandable.forEach(item => {
                toggleExpanded(item);
            });

            const currentItem = treeRef.current.querySelector('[aria-current="page"]');
            if (currentItem) {
                ensureItemVisible(currentItem);
            }

            return 0;
        }

        treeRef.current.setAttribute('data-filtering', 'true');
        const term = searchTermValue.toLowerCase();
        const matches = new Set<Element>();
        const relatedItems = new Set<Element>();

        allItems.forEach(item => {
            const text = item.textContent?.toLowerCase() || '';
            if (text.includes(term)) {
                matches.add(item);
                item.setAttribute('data-search-match', 'true');

                let parent = item.parentElement;
                while (parent && parent !== treeRef.current) {
                    if (parent.getAttribute('role') === 'group') {
                        const parentItem = treeRef.current?.querySelector(`[aria-owns="${parent.id}"]`);
                        if (parentItem) {
                            relatedItems.add(parentItem);
                            if (!isExpanded(parentItem)) {
                                toggleExpanded(parentItem);
                            }
                        }
                    }
                    parent = parent.parentElement;
                }

                if (item.hasAttribute('aria-owns')) {
                    const group = getGroupFromItem(item);
                    if (group) {
                        const descendants = group.querySelectorAll('[role="treeitem"]');
                        descendants.forEach(desc => relatedItems.add(desc));
                        if (!isExpanded(item)) {
                            toggleExpanded(item);
                        }
                    }
                }
            }
        });

        allItems.forEach(item => {
            if (matches.has(item)) {
                item.removeAttribute('data-filtered');
                item.removeAttribute('data-search-related');
            } else if (relatedItems.has(item)) {
                item.removeAttribute('data-filtered');
                item.removeAttribute('data-search-match');
                item.setAttribute('data-search-related', 'true');
            } else {
                item.removeAttribute('data-search-match');
                item.removeAttribute('data-search-related');
                item.setAttribute('data-filtered', 'true');
            }
        });

        return matches.size;
    }, [isExpanded, toggleExpanded, getGroupFromItem, ensureItemVisible]);

    // Build node map
    const buildNodeMap = useCallback(() => {
        if (!containerRef.current) return;

        const allTreeItems = containerRef.current.querySelectorAll('[role="treeitem"]');

        allTreeItems.forEach(item => {
            const parentItem = findParentTreeItem(item);

            nodeMapRef.current.set(item.id, {
                id: item.id,
                level: parseInt(item.getAttribute('aria-level') || '1'),
                hasChildren: item.hasAttribute('aria-expanded'),
                parentId: parentItem?.id || null,
                label: item.textContent?.trim() || ''
            });
        });
    }, [findParentTreeItem]);

    // Handle click
    const handleClick = useCallback((event: React.MouseEvent) => {
        const target = event.target as Element;
        const treeItem = target.closest('[role="treeitem"]') as HTMLAnchorElement | null;
        if (!treeItem) return;

        const icon = target.closest('.tree-icon');
        const isExternal = treeItem.getAttribute('data-external') === 'true';

        if (icon && treeItem.hasAttribute('aria-expanded')) {
            event.preventDefault();
            toggleExpanded(treeItem);
        } else if (!icon && !isExternal) {
            // For internal links, prevent default and just activate
            event.preventDefault();
            activateItem(treeItem);
        } else if (isExternal) {
            // For external links, activate and let the link open naturally
            activateItem(treeItem);
            // Link will open in new tab due to target="_blank" attribute
        }
    }, [toggleExpanded, activateItem]);

    // Handle keydown
    const handleKeydown = useCallback((event: React.KeyboardEvent) => {
        const target = event.target as Element;
        const treeItem = target.closest('[role="treeitem"]');
        if (!treeItem) return;

        const nodeInfo = nodeMapRef.current.get(treeItem.id);
        const allVisible = getVisibleItems();
        const currentIndex = allVisible.indexOf(treeItem);

        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                activateItem(treeItem);
                (treeItem as HTMLElement).click();
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (currentIndex < allVisible.length - 1) {
                    setFocusToItem(allVisible[currentIndex + 1]);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (currentIndex > 0) {
                    setFocusToItem(allVisible[currentIndex - 1]);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (treeItem.hasAttribute('aria-expanded')) {
                    if (!isExpanded(treeItem)) {
                        toggleExpanded(treeItem);
                    } else {
                        const group = getGroupFromItem(treeItem);
                        const firstChild = group?.querySelector('[role="treeitem"]');
                        if (firstChild) {
                            setFocusToItem(firstChild);
                        }
                    }
                }
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (treeItem.hasAttribute('aria-expanded') && isExpanded(treeItem)) {
                    toggleExpanded(treeItem);
                } else if (nodeInfo?.parentId) {
                    const parent = document.getElementById(nodeInfo.parentId);
                    if (parent) {
                        setFocusToItem(parent);
                    }
                }
                break;
            case 'Home':
                event.preventDefault();
                if (treeRef.current) {
                    const firstItem = treeRef.current.querySelector('[role="treeitem"]');
                    if (firstItem) setFocusToItem(firstItem);
                }
                break;
            case 'End':
                event.preventDefault();
                if (allVisible.length > 0) {
                    setFocusToItem(allVisible[allVisible.length - 1]);
                }
                break;
            default:
                if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
                    event.preventDefault();
                    const char = event.key.toLowerCase();
                    for (let i = currentIndex + 1; i < allVisible.length; i++) {
                        if (allVisible[i].textContent?.toLowerCase().trim().startsWith(char)) {
                            setFocusToItem(allVisible[i]);
                            return;
                        }
                    }
                    for (let i = 0; i <= currentIndex; i++) {
                        if (allVisible[i].textContent?.toLowerCase().trim().startsWith(char)) {
                            setFocusToItem(allVisible[i]);
                            return;
                        }
                    }
                }
        }
    }, [activateItem, isExpanded, toggleExpanded, getGroupFromItem, setFocusToItem, getVisibleItems]);

    // Handle search input
    const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSearchTerm(value);
        filter(value);
    }, [filter]);

    // Handle search keydown
    const handleSearchKeydown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setSearchTerm('');
            filter('');
        }
    }, [filter]);

    // Global "/" key handler
    useEffect(() => {
        const handleGlobalKeydown = (e: KeyboardEvent) => {
            const tagName = (e.target as Element).tagName.toLowerCase();
            const isEditable = (e.target as HTMLElement).isContentEditable;
            const isInput = tagName === 'input' || tagName === 'textarea' || tagName === 'select';

            if (e.key === '/' && !isInput && !isEditable) {
                e.preventDefault();
                const searchInput = containerRef.current?.querySelector('#tree-search') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        };

        document.addEventListener('keydown', handleGlobalKeydown);
        return () => document.removeEventListener('keydown', handleGlobalKeydown);
    }, []);

    // Initialize tree
    useEffect(() => {
        if (!containerRef.current) return;

        const sidebarTreeEl = containerRef.current.querySelector('.sidebar-tree-content');
        if (sidebarTreeEl) {
            sidebarTreeEl.innerHTML = generateTreeHTML(TREE_DATA);
            treeRef.current = sidebarTreeEl.querySelector('[role="tree"]');
            buildNodeMap();

            // Set initial focus
            const currentItem = treeRef.current?.querySelector('[aria-current="page"]');
            if (currentItem) {
                ensureItemVisible(currentItem);
            }
        }
    }, [buildNodeMap, ensureItemVisible]);

    return (
        <div className="sidebar-tree-container" ref={containerRef}>
            <aside className="sidebar-aside">
                <header className="sidebar-header">
                    <h1>
                        <a href="#">
                            <VelarixLogo />
                            <span>velarix portal</span>
                        </a>
                    </h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="tree-search-input-container">
                            <SearchIcon />
                            <input
                                type="text"
                                id="tree-search"
                                placeholder="search..."
                                aria-label="Filter navigation tree"
                                className="tree-search-input"
                                value={searchTerm}
                                onChange={handleSearchInput}
                                onKeyDown={handleSearchKeydown}
                            />
                            <kbd>/</kbd>
                        </div>
                    </form>
                </header>
                <nav
                    aria-label="Velarix Portal"
                    onClick={handleClick}
                    onKeyDown={handleKeydown}
                >
                    <div className="sidebar-tree-content">
                        {/* Tree content will be generated by useEffect */}
                    </div>
                </nav>
            </aside>
        </div>
    );
};

export default SidebarTree;
