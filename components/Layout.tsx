import React, { ReactNode } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { motion } from 'framer-motion';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 relative overflow-hidden text-light">
            <LanguageSwitcher />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-accent/10 rounded-full blur-[200px] pointer-events-none"></div>
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="z-10 flex flex-col items-center w-full max-w-4xl px-4 py-8"
            >
                {children}
            </motion.main>
        </div>
    );
};

export default Layout;
