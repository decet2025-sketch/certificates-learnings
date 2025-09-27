# Responsive Design Performance Guide

This guide provides comprehensive strategies for optimizing performance in responsive web applications.

## 🚀 Performance Fundamentals

### 1. Core Web Vitals

#### Largest Contentful Paint (LCP)
**Target**: < 2.5 seconds

```tsx
// Optimize LCP with Next.js Image
import Image from 'next/image';

function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority // Load immediately
      className="w-full h-auto"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
```

#### First Input Delay (FID)
**Target**: < 100 milliseconds

```tsx
// Optimize FID with code splitting
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

#### Cumulative Layout Shift (CLS)
**Target**: < 0.1

```tsx
// Prevent CLS with proper sizing
function ResponsiveImage() {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <Image
        src="/image.jpg"
        alt="Description"
        fill
        className="object-cover"
      />
    </div>
  );
}
```

### 2. Performance Metrics

#### First Contentful Paint (FCP)
**Target**: < 1.8 seconds

```tsx
// Optimize FCP with critical CSS
import { useEffect } from 'react';

function CriticalCSS() {
  useEffect(() => {
    // Load critical CSS inline
    const criticalCSS = `
      .hero { display: block; }
      .navigation { position: fixed; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }, []);
}
```

#### Time to Interactive (TTI)
**Target**: < 3.8 seconds

```tsx
// Optimize TTI with progressive loading
function ProgressiveApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load critical features first
    loadCriticalFeatures().then(() => {
      setIsLoaded(true);
    });
  }, []);
  
  return (
    <div>
      {isLoaded ? <FullApp /> : <SkeletonLoader />}
    </div>
  );
}
```

## 📱 Mobile Performance

### 1. Network Optimization

#### 3G Performance
**Target**: < 5 seconds load time

```tsx
// Optimize for 3G networks
function MobileOptimized() {
  return (
    <div>
      {/* Critical content first */}
      <Header />
      <MainContent />
      
      {/* Non-critical content lazy loaded */}
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
```

#### Bundle Size Optimization
**Target**: < 250KB initial bundle

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### 2. Image Optimization

#### Responsive Images
```tsx
// Optimize images for different screen sizes
function ResponsiveImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={800}
      height={600}
      className="w-full h-auto"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

#### WebP Support
```tsx
// Use WebP for better compression
function OptimizedImage() {
  return (
    <picture>
      <source srcSet="/image.webp" type="image/webp" />
      <Image
        src="/image.jpg"
        alt="Description"
        width={800}
        height={600}
        className="w-full h-auto"
      />
    </picture>
  );
}
```

### 3. Touch Performance

#### Touch Event Optimization
```tsx
// Optimize touch events
function TouchOptimized() {
  const [isTouching, setIsTouching] = useState(false);
  
  const handleTouchStart = useCallback((e) => {
    setIsTouching(true);
    // Handle touch start
  }, []);
  
  const handleTouchEnd = useCallback((e) => {
    setIsTouching(false);
    // Handle touch end
  }, []);
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="touch-manipulation"
    >
      Touch content
    </div>
  );
}
```

#### Gesture Support
```tsx
// Add gesture support
function GestureComponent() {
  const [scale, setScale] = useState(1);
  
  const handleGesture = useCallback((e) => {
    if (e.scale !== 1) {
      setScale(e.scale);
    }
  }, []);
  
  return (
    <div
      onGestureChange={handleGesture}
      style={{ transform: `scale(${scale})` }}
    >
      Gesture content
    </div>
  );
}
```

## 🎨 CSS Performance

### 1. Critical CSS

#### Inline Critical CSS
```tsx
// Inline critical CSS
function CriticalCSS() {
  return (
    <>
      <style jsx>{`
        .hero {
          display: block;
          background: #000;
          color: #fff;
        }
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
      `}</style>
      <div className="hero">Hero content</div>
    </>
  );
}
```

#### CSS Loading Strategy
```tsx
// Load CSS efficiently
function CSSLoader() {
  useEffect(() => {
    // Load non-critical CSS after page load
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/non-critical.css';
    document.head.appendChild(link);
  }, []);
}
```

### 2. CSS Optimization

#### Responsive CSS
```css
/* Optimize responsive CSS */
.responsive {
  /* Mobile first */
  display: block;
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .responsive {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .responsive {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 3rem;
  }
}
```

#### CSS Custom Properties
```css
/* Use CSS custom properties for theming */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}

.responsive {
  color: var(--primary-color);
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .responsive {
    padding: var(--spacing-lg);
  }
}
```

## ⚡ JavaScript Performance

### 1. Code Splitting

#### Route-based Splitting
```tsx
// Split by routes
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

#### Component-based Splitting
```tsx
// Split by components
const HeavyChart = lazy(() => import('./HeavyChart'));
const DataTable = lazy(() => import('./DataTable'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### 2. Bundle Optimization

#### Tree Shaking
```javascript
// Optimize imports for tree shaking
import { debounce } from 'lodash-es';
import { format } from 'date-fns';

// Instead of
import _ from 'lodash';
import * as dateFns from 'date-fns';
```

#### Dynamic Imports
```tsx
// Use dynamic imports
function LazyComponent() {
  const [Component, setComponent] = useState(null);
  
  const loadComponent = async () => {
    const { default: LazyComp } = await import('./LazyComp');
    setComponent(LazyComp);
  };
  
  return (
    <div>
      <button onClick={loadComponent}>Load Component</button>
      {Component && <Component />}
    </div>
  );
}
```

### 3. Memory Management

#### Cleanup Effects
```tsx
// Clean up effects to prevent memory leaks
function DataComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch('/api/data', { signal: controller.signal })
      .then(res => res.json())
      .then(setData);
    
    return () => controller.abort();
  }, []);
  
  return <div>{data && <DataDisplay data={data} />}</div>;
}
```

#### Event Listener Cleanup
```tsx
// Clean up event listeners
function ScrollComponent() {
  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
```

## 🔧 Performance Monitoring

### 1. Real User Monitoring

#### Performance Observer
```tsx
// Monitor performance metrics
function PerformanceMonitor() {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    
    return () => observer.disconnect();
  }, []);
}
```

#### Web Vitals
```tsx
// Track Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function WebVitalsTracker() {
  useEffect(() => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }, []);
}
```

### 2. Performance Budgets

#### Bundle Size Budget
```javascript
// webpack.config.js
module.exports = {
  performance: {
    maxAssetSize: 250000, // 250KB
    maxEntrypointSize: 250000, // 250KB
    hints: 'warning',
  },
};
```

#### Performance Budget
```json
// performance-budget.json
{
  "budget": [
    {
      "resourceType": "script",
      "budget": 250
    },
    {
      "resourceType": "image",
      "budget": 100
    },
    {
      "resourceType": "total",
      "budget": 500
    }
  ]
}
```

## 🧪 Performance Testing

### 1. Automated Testing

#### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run start &
      - uses: treosh/lighthouse-ci-action@v7
        with:
          configPath: './lighthouse.config.js'
```

#### Performance Testing
```tsx
// Performance test
import { test, expect } from '@playwright/test';

test('performance metrics', async ({ page }) => {
  await page.goto('/');
  
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(entries);
      }).observe({ entryTypes: ['navigation'] });
    });
  });
  
  expect(metrics).toBeDefined();
});
```

### 2. Load Testing

#### Load Testing with Artillery
```yaml
# artillery.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Load test"
    requests:
      - get:
          url: "/"
```

#### Stress Testing
```yaml
# stress-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 120
      arrivalRate: 50
scenarios:
  - name: "Stress test"
    requests:
      - get:
          url: "/"
```

## 📊 Performance Metrics

### 1. Core Web Vitals

#### LCP Optimization
```tsx
// Optimize LCP
function OptimizedHero() {
  return (
    <div className="hero">
      <Image
        src="/hero.jpg"
        alt="Hero"
        priority
        width={1200}
        height={600}
        className="w-full h-auto"
      />
      <h1>Hero Title</h1>
    </div>
  );
}
```

#### FID Optimization
```tsx
// Optimize FID
function OptimizedButton() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

#### CLS Optimization
```tsx
// Optimize CLS
function StableLayout() {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <Image
        src="/image.jpg"
        alt="Description"
        fill
        className="object-cover"
      />
    </div>
  );
}
```

### 2. Additional Metrics

#### FCP Optimization
```tsx
// Optimize FCP
function CriticalContent() {
  return (
    <div className="critical-content">
      <h1>Critical Title</h1>
      <p>Critical content</p>
    </div>
  );
}
```

#### TTI Optimization
```tsx
// Optimize TTI
function InteractiveApp() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Load critical features
    loadCriticalFeatures().then(() => {
      setIsReady(true);
    });
  }, []);
  
  return (
    <div>
      {isReady ? <InteractiveContent /> : <LoadingSpinner />}
    </div>
  );
}
```

## 🚀 Performance Best Practices

### 1. General Guidelines

#### Mobile-First Performance
- Start with mobile performance
- Optimize for 3G networks
- Use progressive enhancement
- Minimize initial bundle size

#### Performance Budgets
- Set performance budgets
- Monitor performance metrics
- Optimize based on budgets
- Regular performance audits

### 2. Implementation Tips

#### Code Splitting
- Split by routes
- Split by features
- Use dynamic imports
- Lazy load components

#### Image Optimization
- Use Next.js Image component
- Optimize image formats
- Use responsive images
- Implement lazy loading

#### CSS Optimization
- Inline critical CSS
- Load non-critical CSS asynchronously
- Use CSS custom properties
- Optimize responsive CSS

### 3. Monitoring and Testing

#### Performance Monitoring
- Use Performance Observer
- Track Web Vitals
- Monitor real user metrics
- Set up alerts

#### Performance Testing
- Automated performance tests
- Load testing
- Stress testing
- Regular performance audits

---

This performance guide provides comprehensive strategies for optimizing responsive web applications for speed, efficiency, and user experience.
