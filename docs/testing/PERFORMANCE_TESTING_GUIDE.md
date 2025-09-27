# Performance Testing Guide

## 🚀 Core Web Vitals Testing

### Largest Contentful Paint (LCP)
**Target**: < 2.5 seconds

#### Testing Methods:
1. **Chrome DevTools**:
   - Open DevTools → Lighthouse
   - Run Performance audit
   - Check LCP score

2. **WebPageTest**:
   - Visit webpagetest.org
   - Enter your URL
   - Run test on 3G connection
   - Check LCP timing

3. **Browser Console**:
   ```javascript
   // Test LCP
   new PerformanceObserver((list) => {
     list.getEntries().forEach((entry) => {
       if (entry.entryType === 'largest-contentful-paint') {
         console.log('LCP:', entry.startTime + 'ms');
       }
     });
   }).observe({ entryTypes: ['largest-contentful-paint'] });
   ```

### First Input Delay (FID)
**Target**: < 100 milliseconds

#### Testing Methods:
1. **Chrome DevTools**:
   - Performance tab
   - Record interaction
   - Check FID in timeline

2. **Browser Console**:
   ```javascript
   // Test FID
   new PerformanceObserver((list) => {
     list.getEntries().forEach((entry) => {
       if (entry.entryType === 'first-input') {
         console.log('FID:', entry.processingStart - entry.startTime + 'ms');
       }
     });
   }).observe({ entryTypes: ['first-input'] });
   ```

### Cumulative Layout Shift (CLS)
**Target**: < 0.1

#### Testing Methods:
1. **Chrome DevTools**:
   - Lighthouse audit
   - Check CLS score

2. **Browser Console**:
   ```javascript
   // Test CLS
   let clsValue = 0;
   new PerformanceObserver((list) => {
     list.getEntries().forEach((entry) => {
       if (!entry.hadRecentInput) {
         clsValue += entry.value;
       }
     });
     console.log('CLS:', clsValue);
   }).observe({ entryTypes: ['layout-shift'] });
   ```

## 📱 Mobile Performance Testing

### Network Conditions
- **Slow 3G**: 500 Kbps down, 500 Kbps up
- **Fast 3G**: 1.6 Mbps down, 750 Kbps up
- **4G**: 4 Mbps down, 3 Mbps up

### Testing Tools:
1. **Chrome DevTools**:
   - Network tab → Throttling
   - Select "Slow 3G" or "Fast 3G"
   - Reload page and measure

2. **Lighthouse**:
   - Run mobile audit
   - Check performance score
   - Review recommendations

### Performance Metrics:
- **First Contentful Paint (FCP)**: < 1.8s
- **Time to Interactive (TTI)**: < 3.8s
- **Speed Index**: < 3.4s
- **Total Blocking Time (TBT)**: < 200ms

## 🔧 Performance Optimization Checklist

### Images
- [ ] **WebP Format**: Using WebP for better compression
- [ ] **Responsive Images**: Proper sizing for different screens
- [ ] **Lazy Loading**: Images load only when needed
- [ ] **Alt Text**: All images have descriptive alt text

### JavaScript
- [ ] **Code Splitting**: Large bundles split into smaller chunks
- [ ] **Tree Shaking**: Unused code removed
- [ ] **Minification**: Code compressed for production
- [ ] **Async Loading**: Non-critical scripts loaded asynchronously

### CSS
- [ ] **Critical CSS**: Above-the-fold styles inlined
- [ ] **Unused CSS**: Remove unused styles
- [ ] **Minification**: CSS compressed
- [ ] **Media Queries**: Efficient responsive design

### Fonts
- [ ] **Font Display**: Using font-display: swap
- [ ] **Preload**: Critical fonts preloaded
- [ ] **Subset**: Only necessary characters included
- [ ] **Format**: Using WOFF2 for better compression

## 📊 Performance Monitoring

### Real User Monitoring (RUM)
- **Google Analytics**: Core Web Vitals tracking
- **New Relic**: Performance monitoring
- **DataDog**: Real-time performance data

### Synthetic Monitoring
- **Pingdom**: Uptime and performance monitoring
- **GTmetrix**: Performance analysis
- **WebPageTest**: Detailed performance testing

### Browser Performance APIs
```javascript
// Navigation Timing API
const navigation = performance.getEntriesByType('navigation')[0];
console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);

// Resource Timing API
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(resource.name, resource.duration + 'ms');
});

// User Timing API
performance.mark('custom-start');
// ... custom code ...
performance.mark('custom-end');
performance.measure('custom-duration', 'custom-start', 'custom-end');
```

## 🎯 Performance Budget

### Bundle Size Limits
- **Initial JavaScript**: < 250KB
- **Initial CSS**: < 100KB
- **Images**: < 100KB per image
- **Fonts**: < 50KB per font

### Load Time Targets
- **3G Mobile**: < 5 seconds
- **4G Mobile**: < 3 seconds
- **Desktop**: < 2 seconds
- **Repeat Visit**: < 1 second

### Core Web Vitals Targets
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1

## 🚨 Performance Issues to Watch

### Common Problems
1. **Large Images**: Unoptimized images causing slow LCP
2. **Render-Blocking CSS**: CSS blocking page rendering
3. **JavaScript Bundle Size**: Large JS files delaying interactivity
4. **Third-Party Scripts**: External scripts impacting performance
5. **Layout Shifts**: Content jumping during load

### Solutions
1. **Image Optimization**: Use WebP, proper sizing, lazy loading
2. **Critical CSS**: Inline critical styles, defer non-critical
3. **Code Splitting**: Split large bundles, lazy load components
4. **Script Optimization**: Minimize third-party scripts, use async/defer
5. **Layout Stability**: Reserve space for dynamic content

## 📈 Performance Testing Workflow

### 1. Baseline Testing
- Run Lighthouse audit on current implementation
- Document current performance metrics
- Identify major performance bottlenecks

### 2. Optimization Implementation
- Implement performance optimizations
- Test each optimization individually
- Measure impact of each change

### 3. Validation Testing
- Run comprehensive performance tests
- Validate Core Web Vitals improvements
- Test on different devices and networks

### 4. Monitoring Setup
- Set up performance monitoring
- Create performance budgets
- Establish alerting for performance regressions

## 🔍 Performance Testing Tools

### Browser DevTools
- **Chrome DevTools**: Lighthouse, Performance tab
- **Firefox DevTools**: Performance tab, Network tab
- **Safari Web Inspector**: Timeline, Network tab

### Online Tools
- **Google PageSpeed Insights**: Core Web Vitals testing
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Performance monitoring
- **Pingdom**: Uptime and performance

### Command Line Tools
- **Lighthouse CLI**: Automated performance testing
- **WebPageTest CLI**: Command line testing
- **Bundle Analyzer**: Bundle size analysis

---

This performance testing guide ensures optimal performance across all devices and network conditions.
