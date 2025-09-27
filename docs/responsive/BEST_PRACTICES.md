# Responsive Design Best Practices

This guide outlines the best practices for implementing responsive design in the Sharon Decet Certificate Management System.

## 🎯 Core Principles

### 1. Mobile-First Design
Start with mobile design and progressively enhance for larger screens.

```css
/* Mobile-first approach */
.component {
  /* Mobile styles (default) */
  padding: 1rem;
  font-size: 0.875rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .component {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}
```

### 2. Progressive Enhancement
Build core functionality first, then add enhancements.

```tsx
// Base functionality works without JavaScript
<button onClick={handleClick}>
  Click me
</button>

// Enhanced functionality with JavaScript
<button 
  onClick={handleClick}
  onMouseEnter={handleHover}
  className="hover:bg-blue-100 transition-colors"
>
  Click me
</button>
```

### 3. Accessibility First
Ensure your design is accessible from the start.

```tsx
// Semantic HTML with proper ARIA labels
<button
  onClick={handleClick}
  aria-label="Close modal"
  aria-expanded={isOpen}
  className="p-2 rounded-md hover:bg-gray-100"
>
  <X className="h-5 w-5" />
</button>
```

## 📱 Layout Patterns

### 1. Flexible Grid System
Use CSS Grid and Flexbox for responsive layouts.

```css
/* Responsive grid */
.grid-responsive {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### 2. Container Queries
Use container queries for component-based responsive design.

```css
/* Container query example */
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card-content {
    display: flex;
    flex-direction: row;
  }
}
```

### 3. Flexible Typography
Implement responsive typography that scales with screen size.

```css
/* Responsive typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

.text {
  font-size: clamp(0.875rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}
```

## 🎨 Component Patterns

### 1. Responsive Cards
Create cards that adapt to different screen sizes.

```tsx
// Responsive card component
<Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
  <CardHeader>
    <CardTitle className="text-lg sm:text-xl">
      {title}
    </CardTitle>
    <CardDescription className="text-sm sm:text-base">
      {description}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {/* Card content */}
    </div>
  </CardContent>
</Card>
```

### 2. Responsive Tables
Implement tables that work on all screen sizes.

```tsx
// Responsive table with mobile cards
<div className="space-y-4">
  {/* Desktop table */}
  <div className="hidden lg:block">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* Mobile cards */}
  <div className="lg:hidden space-y-4">
    {data.map((item) => (
      <Card key={item.id} className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.email}</p>
          <Badge>{item.status}</Badge>
        </div>
      </Card>
    ))}
  </div>
</div>
```

### 3. Responsive Modals
Create modals that work on all screen sizes.

```tsx
// Responsive modal
<Dialog>
  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl">
        {title}
      </DialogTitle>
      <DialogDescription className="text-sm sm:text-base">
        {description}
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      {/* Modal content */}
    </div>
    <DialogFooter className="flex flex-col sm:flex-row gap-2">
      <Button variant="outline" className="w-full sm:w-auto">
        Cancel
      </Button>
      <Button className="w-full sm:w-auto">
        Confirm
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 🎯 Performance Best Practices

### 1. Optimize Images
Use responsive images with proper sizing.

```tsx
// Responsive image component
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold}
/>
```

### 2. Lazy Loading
Implement lazy loading for non-critical content.

```tsx
// Lazy loading component
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 3. Code Splitting
Split code by routes and components.

```tsx
// Route-based code splitting
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

## 🎨 Styling Best Practices

### 1. Use CSS Custom Properties
Create consistent design tokens.

```css
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}

.component {
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
}
```

### 2. Responsive Utilities
Create reusable responsive utility classes.

```css
/* Responsive utilities */
.text-responsive {
  font-size: var(--font-size-sm);
}

@media (min-width: 640px) {
  .text-responsive {
    font-size: var(--font-size-base);
  }
}

@media (min-width: 1024px) {
  .text-responsive {
    font-size: var(--font-size-lg);
  }
}
```

### 3. Consistent Spacing
Use a consistent spacing scale.

```css
/* Spacing scale */
.space-xs { margin: 0.25rem; }
.space-sm { margin: 0.5rem; }
.space-md { margin: 1rem; }
.space-lg { margin: 1.5rem; }
.space-xl { margin: 2rem; }

/* Responsive spacing */
.space-responsive {
  margin: 0.5rem;
}

@media (min-width: 640px) {
  .space-responsive {
    margin: 1rem;
  }
}

@media (min-width: 1024px) {
  .space-responsive {
    margin: 1.5rem;
  }
}
```

## 🎯 Interaction Best Practices

### 1. Touch-Friendly Design
Ensure all interactive elements are touch-friendly.

```css
/* Touch-friendly button */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
}

/* Touch-friendly input */
.input {
  min-height: 44px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
}
```

### 2. Hover States
Handle hover states appropriately for different devices.

```css
/* Hover states for desktop */
.button:hover {
  background-color: var(--color-primary-hover);
}

/* Disable hover on touch devices */
@media (hover: none) {
  .button:hover {
    background-color: initial;
  }
}
```

### 3. Focus Management
Implement proper focus management for accessibility.

```css
/* Focus styles */
.button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## 🎨 Animation Best Practices

### 1. Respect User Preferences
Honor user preferences for reduced motion.

```css
/* Reduced motion support */
.animate {
  transition: all 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .animate {
    transition: none;
  }
}
```

### 2. Performance-Optimized Animations
Use transform and opacity for smooth animations.

```css
/* Good: Uses transform */
.slide-in {
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.slide-in.active {
  transform: translateX(0);
}

/* Bad: Uses layout properties */
.slide-in {
  left: 100%;
  transition: left 0.3s ease;
}
```

### 3. Appropriate Animation Timing
Use appropriate timing for different interactions.

```css
/* Quick interactions */
.button {
  transition: background-color 0.15s ease;
}

/* Page transitions */
.page-transition {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Loading states */
.loading {
  animation: pulse 2s infinite;
}
```

## 🎯 Testing Best Practices

### 1. Test on Real Devices
Always test on real devices when possible.

```bash
# Test on real devices
# Use Chrome DevTools device emulation
# Test on actual mobile devices
# Test on different screen sizes
```

### 2. Automated Testing
Implement automated responsive testing.

```javascript
// Responsive testing with Playwright
import { test, expect } from '@playwright/test';

test('responsive layout', async ({ page }) => {
  // Test mobile layout
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('.mobile-only')).toBeVisible();
  
  // Test desktop layout
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('.desktop-only')).toBeVisible();
});
```

### 3. Performance Testing
Monitor performance across different devices.

```javascript
// Performance testing
const performanceMetrics = {
  lcp: 2.5, // Largest Contentful Paint
  fid: 100, // First Input Delay
  cls: 0.1, // Cumulative Layout Shift
};

// Test performance on different devices
const testPerformance = async (device) => {
  const metrics = await getPerformanceMetrics(device);
  expect(metrics.lcp).toBeLessThan(performanceMetrics.lcp);
  expect(metrics.fid).toBeLessThan(performanceMetrics.fid);
  expect(metrics.cls).toBeLessThan(performanceMetrics.cls);
};
```

## 🎨 Accessibility Best Practices

### 1. Semantic HTML
Use semantic HTML elements.

```tsx
// Good: Semantic HTML
<main>
  <section>
    <h1>Page Title</h1>
    <p>Page description</p>
  </section>
</main>

// Bad: Non-semantic HTML
<div>
  <div>
    <div>Page Title</div>
    <div>Page description</div>
  </div>
</div>
```

### 2. ARIA Labels
Provide proper ARIA labels for screen readers.

```tsx
// ARIA labels for accessibility
<button
  onClick={handleClick}
  aria-label="Close modal"
  aria-expanded={isOpen}
  className="p-2 rounded-md"
>
  <X className="h-5 w-5" />
</button>
```

### 3. Keyboard Navigation
Ensure all interactive elements are keyboard accessible.

```tsx
// Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Clickable div
</div>
```

## 🎯 Common Pitfalls

### 1. Fixed Widths
Avoid fixed widths that break on small screens.

```css
/* ❌ Bad: Fixed width */
.container {
  width: 1200px;
}

/* ✅ Good: Flexible width */
.container {
  width: 100%;
  max-width: 1200px;
}
```

### 2. Hover-Only Interactions
Don't rely on hover states for essential functionality.

```css
/* ❌ Bad: Hover-only content */
.tooltip {
  opacity: 0;
}

.tooltip:hover {
  opacity: 1;
}

/* ✅ Good: Accessible tooltip */
.tooltip {
  opacity: 0;
  pointer-events: none;
}

.tooltip:hover,
.tooltip:focus-within {
  opacity: 1;
  pointer-events: auto;
}
```

### 3. Small Touch Targets
Ensure touch targets are large enough.

```css
/* ❌ Bad: Small touch target */
.button {
  width: 20px;
  height: 20px;
}

/* ✅ Good: Touch-friendly target */
.button {
  min-width: 44px;
  min-height: 44px;
}
```

## 📚 Resources

### Documentation
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [CSS-Tricks Responsive Design](https://css-tricks.com/snippets/css/complete-guide-grid/)

### Tools
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Firefox DevTools](https://developer.mozilla.org/en-US/docs/Tools)
- [Safari Web Inspector](https://developer.apple.com/safari/tools/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Testing
- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)
- [CrossBrowserTesting](https://crossbrowsertesting.com/)
- [Responsive Design Checker](https://responsivedesignchecker.com/)

---

Follow these best practices to create responsive designs that are accessible, performant, and user-friendly across all devices and screen sizes.
