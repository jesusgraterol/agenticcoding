// theme preferences exposed by the global selector.
export type IThemePreference = 'system' | 'light' | 'dark';

// concrete themes applied to the document root.
export type IResolvedTheme = Exclude<IThemePreference, 'system'>;
