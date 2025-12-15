# Theme System Guide - Al-Aziz Motor House

## Overview
The Al-Aziz Motor House website now features a comprehensive dark/light theme system with smooth transitions and proper accessibility support.

## Features

### 🌓 Theme Toggle
- **Location**: Header navigation (top-right)
- **Functionality**: Toggle between light and dark modes
- **Persistence**: Theme preference saved in localStorage
- **System Integration**: Respects user's system preference on first visit

### 🎨 Theme Components

#### ThemeProvider (`src/contexts/ThemeContext.js`)
- React context for theme state management
- Provides theme toggle functionality
- Handles localStorage persistence
- Listens to system preference changes

#### ThemeToggle (`src/components/ThemeToggle.js`)
- Interactive toggle button component
- Animated switch with icons (🌙/☀️)
- Accessible with proper ARIA labels
- Responsive design for mobile

### 🎯 Theme Variables

#### CSS Custom Properties
```css
/* Light Theme (Default) */
--bg-primary: #f9fafb;
--bg-secondary: #ffffff;
--text-primary: #111827;
--text-secondary: #374151;

/* Dark Theme */
--bg-primary: #111827;
--bg-secondary: #1f2937;
--text-primary: #f9fafb;
--text-secondary: #e5e7eb;
```

#### Theme-Aware Colors
- All components use semantic color variables
- Automatic color inversion for dark theme
- Consistent brand colors (red/blue) across themes
- Enhanced contrast for accessibility

### 🚀 Implementation

#### 1. Theme Context Setup
```jsx
// App.js
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

#### 2. Using Theme in Components
```jsx
// Any component
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div className={`component ${isDark ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};
```

#### 3. CSS Theme Styling
```css
/* Component styles */
.component {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

/* Dark theme overrides */
[data-theme="dark"] .component {
  /* Additional dark-specific styles if needed */
}
```

### 📱 Responsive Design
- Theme toggle adapts to mobile screens
- Smaller toggle size on mobile devices
- Touch-friendly interaction areas
- Maintains accessibility on all screen sizes

### ♿ Accessibility Features
- **ARIA Labels**: Proper screen reader support
- **Focus Management**: Visible focus indicators
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences
- **Keyboard Navigation**: Full keyboard accessibility

### 🎨 Visual Enhancements

#### Glassmorphism Effects
- Translucent backgrounds with blur effects
- Enhanced for both light and dark themes
- Smooth transitions between theme states

#### Advanced Shadows
- Theme-appropriate shadow colors
- Depth and elevation maintained across themes
- Subtle adjustments for dark mode visibility

#### Brand Consistency
- Toyota red (#dc2626) maintained across themes
- Secondary blue colors for accents
- Consistent gradient applications

### 🔧 Customization

#### Adding New Theme-Aware Components
1. Use semantic CSS variables instead of hardcoded colors
2. Test in both light and dark modes
3. Add specific dark theme overrides if needed
4. Ensure proper contrast ratios

#### Extending Theme Variables
```css
:root {
  /* Add new semantic colors */
  --accent-success: #16a34a;
  --accent-warning: #ea580c;
}

[data-theme="dark"] {
  /* Dark theme variants */
  --accent-success: #22c55e;
  --accent-warning: #f97316;
}
```

### 🧪 Testing
- Test all components in both themes
- Verify localStorage persistence
- Check system preference detection
- Validate accessibility with screen readers
- Test on various devices and browsers

### 📦 Files Structure
```
src/
├── contexts/
│   └── ThemeContext.js          # Theme state management
├── components/
│   ├── ThemeToggle.js           # Toggle button component
│   └── ThemeToggle.css          # Toggle button styles
├── styles/
│   └── theme.css                # Global theme variables
└── pages/
    ├── Home.css                 # Theme-aware home styles
    └── CarDetails.css           # Theme-aware detail styles
```

### 🚀 Performance
- Minimal JavaScript overhead
- CSS-based theme switching
- Smooth 300ms transitions
- Optimized for 60fps animations
- Lazy loading of theme assets

### 🌟 Best Practices
1. Always use semantic color variables
2. Test accessibility in both themes
3. Maintain brand color consistency
4. Provide smooth transitions
5. Respect user preferences
6. Keep theme toggle easily accessible

## Browser Support
- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements
- [ ] Auto theme switching based on time of day
- [ ] Multiple theme variants (blue, green, etc.)
- [ ] Theme customization panel
- [ ] Advanced color blind support
- [ ] Theme preview mode