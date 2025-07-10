"use client";

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = null;
              if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
              }
              if (!theme) theme = 'light';
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            } catch(e) {}
          })();
        `,
      }}
    />
  );
} 