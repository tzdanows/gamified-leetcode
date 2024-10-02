import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Menu, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    <Link to="/" className="ml-4 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">LeetCode Gamified</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
                    <Link to="/dailies" className="transition-colors hover:text-foreground/80 text-foreground/60">Dailies</Link>
                    <Link to="/profile" className="transition-colors hover:text-foreground/80 text-foreground/60">Profile</Link>
                </nav>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle Dark Mode"
                    className="mr-6"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                {isMenuOpen && (
                    <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
                        <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
                            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                                <span className="font-bold">LeetCode Gamified</span>
                            </Link>
                            <nav className="grid gap-2">
                                <Link to="/" className="flex w-full items-center py-2 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
                                    Home
                                </Link>
                                <Link to="/dailies" className="flex w-full items-center py-2 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
                                    Dailies
                                </Link>
                                <Link to="/profile" className="flex w-full items-center py-2 text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
                                    Profile
                                </Link>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;