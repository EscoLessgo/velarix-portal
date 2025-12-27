// Tree navigation data structure
export interface TreeItem {
    id: string;
    label: string;
    href: string;
    current?: boolean;
    items?: TreeItem[];
    external?: boolean; // For external links that should open in new tab
    description?: string;
}

export interface TreeGroup {
    items: TreeItem[];
}

export interface TreeData {
    label: string;
    groups: TreeGroup[];
}

export const TREE_DATA: TreeData = {
    label: "Velarix Portal",
    groups: [
        {
            // First group - main navigation
            items: [
                {
                    id: "home",
                    label: "Home",
                    href: "#home",
                    current: true
                },
                {
                    id: "about",
                    label: "About Esco",
                    href: "#about",
                }
            ]
        },
        {
            // Second group - Portfolio websites
            items: [
                {
                    id: "main-sites",
                    label: "Main Sites",
                    href: "#main-sites",
                    items: [
                        {
                            id: "velarix-solutions",
                            label: "Velarix Solutions",
                            href: "https://velarixsolutions.nl",
                            external: true,
                            description: "Main hub for digital solutions and creative development services"
                        },
                        {
                            id: "escos-archive",
                            label: "EscosArchive",
                            href: "https://more.velarixsolutions.nl",
                            external: true,
                            description: "My Games / Projects"
                        },
                        {
                            id: "escos-entries",
                            label: "Escos Entries",
                            href: "https://idump.velarixsolutions.nl/",
                            external: true,
                            description: "Privately Hosted Pastebin"
                        }
                    ]
                },
                {
                    id: "discord-games",
                    label: "Discord Games",
                    href: "#discord-games",
                    items: [
                        {
                            id: "farkle",
                            label: "Farkle",
                            href: "https://discord.com/oauth2/authorize?client_id=1448243957715959898",
                            external: true,
                            description: "Classic dice game for Discord"
                        },
                        {
                            id: "alphabee",
                            label: "AlphaBee",
                            href: "https://discord.com/oauth2/authorize?client_id=1451743881854062685",
                            external: true,
                            description: "Word game for Discord"
                        },
                        {
                            id: "LetterLitter (Scattergories)",
                            label: "ScatteGories",
                            href: "https://discord.com/oauth2/authorize?client_id=1452087558057230437",
                            external: true,
                            description: "Word game for Discord"
                        },
                        {
                            id: "squareroots",
                            label: "SquareRoots (DotsNBoxes)",
                            href: "https://discord.com/oauth2/authorize?client_id=1449456536710811770",
                            external: true,
                            description: "Classic game for Discord"
                        }
                    ]
                },
                {
                    id: "apps-tools",
                    label: "Apps & Tools",
                    href: "#apps-tools",
                    items: [
                        {
                            id: "spelling-bee",
                            label: "Spelling Bee",
                            href: "https://spell.velarixsolutions.nl",
                            external: true,
                            description: "Better NYT daily challenge"
                        },
                        {
                            id: "spotify-visualizer",
                            label: "What I'm Listening To",
                            href: "https://spoti.velarixsolutions.nl",
                            external: true,
                            description: "Escos Live Audio Visualizer"
                        },
                        {
                            id: "find",
                            label: "Find",
                            href: "https://find.velarixsolutions.nl",
                            external: true,
                            description: "Search and discovery platform"
                        },
                        {
                            id: "inlet",
                            label: "Inlet",
                            href: "https://inlet.velarixsolutions.nl",
                            external: true,
                            description: "Data streaming and content aggregation"
                        }
                    ]
                },
                {
                    id: "creative",
                    label: "Creative Projects",
                    href: "#creative",
                    items: [
                        {
                            id: "esco-signs",
                            label: "Esco Signs",
                            href: "https://escosigns.velarixsolutions.nl",
                            external: true,
                            description: "Professional signage and branding solutions"
                        },
                        {
                            id: "404-creative",
                            label: "404 Creative",
                            href: "https://404.velarixsolutions.nl",
                            external: true,
                            description: "Creative error pages and web experiments"
                        },
                        {
                            id: "crypto-hub",
                            label: "Crypto Hub",
                            href: "https://crypto.velarixsolutions.nl",
                            external: true,
                            description: "Cryptocurrency insights and blockchain resources"
                        }
                    ]
                }
            ]
        }
    ]
};
