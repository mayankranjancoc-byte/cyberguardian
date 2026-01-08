import './globals.css'
import { LanguageProvider } from './context/LanguageContext'
import NavigationAndFooter from './NavigationAndFooter'
import FloatingChatButton from './components/FloatingChatButton'

export const metadata = {
    title: 'CyberRaksha - Your Cybersecurity Companion',
    description: 'All-in-one AI-powered cybersecurity assistant for threat detection, learning, and incident response',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <LanguageProvider>
                    <NavigationAndFooter>
                        {children}
                    </NavigationAndFooter>
                    <FloatingChatButton />
                </LanguageProvider>
            </body>
        </html>
    )
}
