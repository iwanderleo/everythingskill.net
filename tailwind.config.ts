/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        charcoal: '#242424',
        midnight: '#111111',
        'mid-gray': '#898989',
        'light-gray': '#f5f5f5',
        'link-blue': '#0099ff',
      },
      fontFamily: {
        display: ['"Cal Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      fontSize: {
        'display-hero': ['64px', { lineHeight: '1.10', fontWeight: '600', letterSpacing: '0px' }],
        'display-section': ['48px', { lineHeight: '1.10', fontWeight: '600', letterSpacing: '0px' }],
        'display-feature': ['24px', { lineHeight: '1.30', fontWeight: '600', letterSpacing: '0px' }],
        'display-sub': ['20px', { lineHeight: '1.20', fontWeight: '600', letterSpacing: '0.2px' }],
        'display-card': ['16px', { lineHeight: '1.10', fontWeight: '600', letterSpacing: '0px' }],
        'display-caption': ['12px', { lineHeight: '1.50', fontWeight: '600', letterSpacing: '0px' }],
      },
      boxShadow: {
        'card': 'rgba(19, 19, 22, 0.7) 0px 1px 5px -4px, rgba(34, 42, 53, 0.08) 0px 0px 0px 1px, rgba(34, 42, 53, 0.05) 0px 4px 8px 0px',
        'card-alt': 'rgba(36, 36, 36, 0.7) 0px 1px 5px -4px, rgba(36, 36, 36, 0.05) 0px 4px 8px',
        'inset-highlight': 'rgba(255, 255, 255, 0.15) 0px 2px 0px inset',
        'inset-pressed': 'rgba(0, 0, 0, 0.16) 0px 1px 1.9px 0px inset',
        'soft': 'rgba(34, 42, 53, 0.05) 0px 4px 8px',
        'ring': 'rgba(34, 42, 53, 0.08) 0px 0px 0px 1px',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '29px',
        'pill': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'section': '80px',
        'section-lg': '96px',
      },
      maxWidth: {
        'container': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
