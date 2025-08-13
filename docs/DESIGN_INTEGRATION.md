# Design Integration Guide

This guide will help you integrate your existing design assets and Tailwind theme into the new portfolio structure.

## File Structure for Assets

```
public/
├── assets/
│   ├── images/          # Your project images, hero images, etc.
│   ├── icons/           # SVG icons, logos, etc.
│   └── fonts/           # Custom fonts (if any)
```

## Steps to Integrate Your Design

### 1. Copy Your Assets

Copy your existing images, icons, and other assets to the appropriate folders:
- Project screenshots → `public/assets/images/`
- Icons and logos → `public/assets/icons/`
- Any other media files → `public/assets/`

### 2. Update Tailwind Theme

Edit `tailwind.config.ts` to match your existing color scheme:

```typescript
colors: {
  // Replace with your actual brand colors
  primary: {
    50: '#your-color-50',
    100: '#your-color-100',
    // ... etc
  },
  secondary: {
    // Your secondary colors
  },
  accent: {
    // Your accent colors
  },
}
```

### 3. Customize Components

Update each component to use your design:

#### Hero Component (`app/components/Hero.tsx`)
- Replace placeholder text with your actual content
- Add your profile image
- Update colors to match your theme
- Add any custom animations or effects

#### AboutMe Component (`app/components/AboutMe.tsx`)
- Update skills and technologies to match your expertise
- Customize the layout and styling
- Add your actual project data

#### CallToAction Component (`app/components/CallToAction.tsx`)
- Update contact information
- Add your social media links
- Customize the styling

### 4. Update Navigation

Edit `app/components/Navigation.tsx`:
- Add your logo
- Update navigation links
- Customize the styling to match your theme

### 5. Customize Project Cards

Update `app/components/ProjectCard.tsx`:
- Adjust the card design to match your style
- Update hover effects and animations
- Customize the technology tags styling

## Example: Using Your Assets

```tsx
// In your Hero component
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Your profile image */}
        <div className="mb-8">
          <Image
            src="/assets/images/your-profile-photo.jpg"
            alt="Your Name"
            width={200}
            height={200}
            className="rounded-full mx-auto"
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6">
          Hi, I&apos;m <span className="text-primary-600">Your Name</span>
        </h1>
        {/* Rest of your content */}
      </div>
    </section>
  );
}
```

## Example: Using Custom Colors

```tsx
// Using your custom primary colors
<button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg">
  View My Work
</button>

// Using custom accent colors
<div className="bg-accent-100 text-accent-900 p-4 rounded-lg">
  Custom styled content
</div>
```

## Tips for Integration

1. **Start with colors**: Update the Tailwind config first, then update components
2. **Test incrementally**: Update one component at a time and test
3. **Use CSS variables**: For complex themes, consider using CSS custom properties
4. **Optimize images**: Use Next.js Image component for better performance
5. **Maintain consistency**: Keep your design tokens consistent across components

## Common Customizations

### Adding Custom Fonts
```typescript
// In tailwind.config.ts
fontFamily: {
  'sans': ['Your-Font', 'sans-serif'],
  'display': ['Your-Display-Font', 'serif'],
}
```

### Adding Custom Animations
```typescript
// In tailwind.config.ts
animation: {
  'your-animation': 'yourKeyframe 0.5s ease-out',
},
keyframes: {
  yourKeyframe: {
    '0%': { transform: 'scale(0.9)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
}
```

### Using CSS Variables
```css
/* In globals.css */
:root {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
}
```

Then use them in Tailwind:
```typescript
// In tailwind.config.ts
colors: {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
}
```

## Next Steps

1. Copy your assets to the appropriate folders
2. Update the Tailwind config with your colors
3. Customize each component one by one
4. Test the application to ensure everything works
5. Deploy and share your new portfolio!

Let me know if you need help with any specific part of the integration! 