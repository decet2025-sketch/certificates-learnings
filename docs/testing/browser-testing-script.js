// Browser Testing Script for Responsive Design
// Run this in browser console to test responsive design

console.log('🧪 Starting Responsive Design Testing...');

// Test breakpoints
const breakpoints = {
  mobile: { width: 375, height: 667, name: 'iPhone SE' },
  mobileLarge: { width: 414, height: 896, name: 'iPhone 11 Pro Max' },
  tablet: { width: 768, height: 1024, name: 'iPad' },
  tabletLarge: { width: 1024, height: 1366, name: 'iPad Pro' },
  desktop: { width: 1366, height: 768, name: 'Laptop' },
  desktopLarge: { width: 1920, height: 1080, name: 'Desktop' }
};

// Test responsive elements
function testResponsiveElements() {
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };

  // Test touch targets
  const buttons = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
  buttons.forEach((button, index) => {
    const rect = button.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      results.failed++;
      results.issues.push(`Button ${index}: Touch target too small (${rect.width}x${rect.height}px)`);
    } else {
      results.passed++;
    }
  });

  // Test form inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    const rect = input.getBoundingClientRect();
    if (rect.height < 44) {
      results.failed++;
      results.issues.push(`Input ${index}: Height too small (${rect.height}px)`);
    } else {
      results.passed++;
    }
  });

  // Test for horizontal overflow
  const body = document.body;
  if (body.scrollWidth > window.innerWidth) {
    results.failed++;
    results.issues.push('Horizontal overflow detected');
  } else {
    results.passed++;
  }

  // Test for missing alt text
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      results.failed++;
      results.issues.push(`Image ${index}: Missing alt text or aria-label`);
    } else {
      results.passed++;
    }
  });

  return results;
}

// Test at different breakpoints
function testBreakpoint(breakpoint) {
  console.log(`\n📱 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
  
  // Resize viewport
  window.resizeTo(breakpoint.width, breakpoint.height);
  
  // Wait for resize
  setTimeout(() => {
    const results = testResponsiveElements();
    
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    
    if (results.issues.length > 0) {
      console.log('Issues found:');
      results.issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    // Test next breakpoint
    const currentIndex = Object.keys(breakpoints).indexOf(breakpoint.name.toLowerCase().replace(/\s+/g, ''));
    const nextBreakpoint = Object.values(breakpoints)[currentIndex + 1];
    
    if (nextBreakpoint) {
      setTimeout(() => testBreakpoint(nextBreakpoint), 1000);
    } else {
      console.log('\n🎉 Testing completed!');
    }
  }, 500);
}

// Test performance
function testPerformance() {
  console.log('\n⚡ Testing Performance...');
  
  // Test Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
        }
        if (entry.entryType === 'first-input') {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  }
  
  // Test page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page Load Time: ${loadTime.toFixed(2)}ms`);
  });
}

// Test accessibility
function testAccessibility() {
  console.log('\n♿ Testing Accessibility...');
  
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };
  
  // Test keyboard navigation
  const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
  let tabOrder = [];
  
  focusableElements.forEach((element, index) => {
    element.addEventListener('focus', () => {
      tabOrder.push(index);
    });
  });
  
  // Test ARIA labels
  const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby]');
  results.passed += elementsWithAria.length;
  
  // Test heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let headingLevels = [];
  headings.forEach(heading => {
    headingLevels.push(parseInt(heading.tagName.charAt(1)));
  });
  
  // Check for proper heading hierarchy
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i-1] + 1) {
      results.failed++;
      results.issues.push(`Heading hierarchy issue: h${headingLevels[i-1]} followed by h${headingLevels[i]}`);
    } else {
      results.passed++;
    }
  }
  
  console.log(`✅ Accessibility Passed: ${results.passed}`);
  console.log(`❌ Accessibility Failed: ${results.failed}`);
  
  if (results.issues.length > 0) {
    console.log('Accessibility Issues:');
    results.issues.forEach(issue => console.log(`  - ${issue}`));
  }
}

// Start testing
console.log('Starting comprehensive responsive design testing...');
testBreakpoint(breakpoints.mobile);
testPerformance();
testAccessibility();

// Export functions for manual testing
window.responsiveTesting = {
  testBreakpoint,
  testPerformance,
  testAccessibility,
  testResponsiveElements,
  breakpoints
};

console.log('\n🔧 Manual testing functions available:');
console.log('- responsiveTesting.testBreakpoint(breakpoint)');
console.log('- responsiveTesting.testPerformance()');
console.log('- responsiveTesting.testAccessibility()');
console.log('- responsiveTesting.testResponsiveElements()');
console.log('- responsiveTesting.breakpoints');
