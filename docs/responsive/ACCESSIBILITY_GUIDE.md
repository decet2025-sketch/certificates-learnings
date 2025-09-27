# Responsive Design Accessibility Guide

This guide provides comprehensive strategies for ensuring accessibility in responsive web applications.

## ♿ Accessibility Fundamentals

### 1. WCAG 2.1 AA Compliance

#### Perceivable
**Guideline 1.1**: Text Alternatives
```tsx
// Provide text alternatives for images
function AccessibleImage() {
  return (
    <Image
      src="/chart.jpg"
      alt="Sales chart showing 25% increase in Q3 revenue"
      width={400}
      height={300}
      className="w-full h-auto"
    />
  );
}
```

**Guideline 1.2**: Time-based Media
```tsx
// Provide captions for videos
function AccessibleVideo() {
  return (
    <video controls>
      <source src="/video.mp4" type="video/mp4" />
      <track
        kind="captions"
        src="/captions.vtt"
        srcLang="en"
        label="English captions"
        default
      />
      Your browser does not support the video tag.
    </video>
  );
}
```

**Guideline 1.3**: Adaptable
```tsx
// Use semantic HTML for structure
function AccessibleContent() {
  return (
    <article>
      <header>
        <h1>Article Title</h1>
        <time dateTime="2024-01-15">January 15, 2024</time>
      </header>
      <main>
        <p>Article content...</p>
      </main>
      <footer>
        <p>Author: John Doe</p>
      </footer>
    </article>
  );
}
```

**Guideline 1.4**: Distinguishable
```tsx
// Ensure sufficient color contrast
function AccessibleButton() {
  return (
    <button
      className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
      style={{ minHeight: '44px' }} // Minimum touch target
    >
      Accessible Button
    </button>
  );
}
```

#### Operable
**Guideline 2.1**: Keyboard Accessible
```tsx
// Ensure keyboard navigation
function KeyboardAccessible() {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className="focus:ring-2 focus:ring-blue-500"
    >
      Keyboard accessible element
    </div>
  );
}
```

**Guideline 2.2**: Enough Time
```tsx
// Provide time controls for time-sensitive content
function TimeSensitiveContent() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div>
      <p>Time remaining: {timeLeft} seconds</p>
      <button onClick={() => setTimeLeft(300)}>
        Extend time
      </button>
    </div>
  );
}
```

**Guideline 2.3**: Seizures and Physical Reactions
```tsx
// Avoid flashing content
function SafeAnimation() {
  return (
    <div
      className="animate-pulse"
      style={{
        animationDuration: '2s', // Slow animation
        animationIterationCount: 'infinite'
      }}
    >
      Content with safe animation
    </div>
  );
}
```

**Guideline 2.4**: Navigable
```tsx
// Provide clear navigation
function AccessibleNavigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}
```

#### Understandable
**Guideline 3.1**: Readable
```tsx
// Use clear language
function ClearContent() {
  return (
    <div>
      <h1>Welcome to Our Service</h1>
      <p>
        Our service helps you manage your certificates easily.
        You can create, edit, and download certificates in just a few clicks.
      </p>
    </div>
  );
}
```

**Guideline 3.2**: Predictable
```tsx
// Consistent navigation
function ConsistentNavigation() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li><a href="/" className="nav-link">Home</a></li>
        <li><a href="/about" className="nav-link">About</a></li>
        <li><a href="/contact" className="nav-link">Contact</a></li>
      </ul>
    </nav>
  );
}
```

**Guideline 3.3**: Input Assistance
```tsx
// Provide input assistance
function FormWithAssistance() {
  const [errors, setErrors] = useState({});
  
  return (
    <form>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          required
          aria-describedby="email-error"
          className="border border-gray-300 rounded px-3 py-2"
        />
        {errors.email && (
          <div id="email-error" role="alert" className="text-red-600">
            Please enter a valid email address
          </div>
        )}
      </div>
    </form>
  );
}
```

#### Robust
**Guideline 4.1**: Compatible
```tsx
// Use semantic HTML
function SemanticHTML() {
  return (
    <main>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
        </ul>
      </section>
    </main>
  );
}
```

### 2. ARIA Implementation

#### ARIA Labels
```tsx
// Use ARIA labels
function AccessibleButton() {
  return (
    <button
      aria-label="Close dialog"
      onClick={handleClose}
      className="p-2"
    >
      <X className="h-5 w-5" />
    </button>
  );
}
```

#### ARIA Describedby
```tsx
// Use ARIA describedby
function AccessibleInput() {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        aria-describedby="password-help"
        className="border border-gray-300 rounded px-3 py-2"
      />
      <div id="password-help">
        Password must be at least 8 characters long
      </div>
    </div>
  );
}
```

#### ARIA Live Regions
```tsx
// Use ARIA live regions
function LiveRegion() {
  const [message, setMessage] = useState('');
  
  return (
    <div>
      <button onClick={() => setMessage('Action completed')}>
        Perform Action
      </button>
      <div aria-live="polite" aria-atomic="true">
        {message}
      </div>
    </div>
  );
}
```

## 📱 Mobile Accessibility

### 1. Touch Accessibility

#### Touch Targets
```tsx
// Ensure minimum touch target size
function TouchFriendlyButton() {
  return (
    <button
      className="p-4 min-h-[44px] min-w-[44px]"
      style={{ minHeight: '44px', minWidth: '44px' }}
    >
      Touch Friendly
    </button>
  );
}
```

#### Touch Gestures
```tsx
// Support touch gestures
function TouchGesture() {
  const [scale, setScale] = useState(1);
  
  const handleTouchStart = (e) => {
    e.preventDefault();
    // Handle touch start
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    // Handle touch move
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ transform: `scale(${scale})` }}
    >
      Touch content
    </div>
  );
}
```

### 2. Screen Reader Support

#### Screen Reader Announcements
```tsx
// Announce changes to screen readers
function ScreenReaderAnnouncement() {
  const [announcement, setAnnouncement] = useState('');
  
  return (
    <div>
      <button onClick={() => setAnnouncement('New content loaded')}>
        Load Content
      </button>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </div>
  );
}
```

#### Screen Reader Navigation
```tsx
// Provide screen reader navigation
function ScreenReaderNavigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
        </li>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}
```

## 🎨 Visual Accessibility

### 1. Color and Contrast

#### Color Contrast
```tsx
// Ensure sufficient color contrast
function HighContrastButton() {
  return (
    <button
      className="bg-blue-600 text-white"
      style={{
        backgroundColor: '#2563eb', // Blue-600
        color: '#ffffff',
        // Contrast ratio: 4.5:1 (AA compliant)
      }}
    >
      High Contrast Button
    </button>
  );
}
```

#### Color Blindness Support
```tsx
// Support color blindness
function ColorBlindFriendly() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <span>Error</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <span>Success</span>
      </div>
    </div>
  );
}
```

### 2. Typography

#### Readable Typography
```tsx
// Use readable typography
function ReadableText() {
  return (
    <div className="text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Heading</h1>
      <p className="text-gray-700">
        This text is easy to read with proper line height and font size.
      </p>
    </div>
  );
}
```

#### Font Scaling
```tsx
// Support font scaling
function ScalableText() {
  return (
    <div className="text-base sm:text-lg lg:text-xl">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Scalable Heading
      </h1>
      <p className="text-sm sm:text-base lg:text-lg">
        Scalable paragraph text
      </p>
    </div>
  );
}
```

## ⌨️ Keyboard Accessibility

### 1. Keyboard Navigation

#### Tab Order
```tsx
// Ensure logical tab order
function KeyboardNavigation() {
  return (
    <div>
      <button tabIndex={1}>First Button</button>
      <button tabIndex={2}>Second Button</button>
      <button tabIndex={3}>Third Button</button>
    </div>
  );
}
```

#### Focus Management
```tsx
// Manage focus properly
function FocusManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          tabIndex={-1}
          className="modal"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          Modal content
        </div>
      )}
    </div>
  );
}
```

### 2. Keyboard Shortcuts

#### Custom Shortcuts
```tsx
// Implement custom keyboard shortcuts
function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return <div>Content with keyboard shortcuts</div>;
}
```

## 🧪 Accessibility Testing

### 1. Automated Testing

#### Jest Testing
```tsx
// Test accessibility with Jest
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### Playwright Testing
```tsx
// Test accessibility with Playwright
import { test, expect } from '@playwright/test';

test('should be accessible', async ({ page }) => {
  await page.goto('/');
  
  // Check for accessibility issues
  const accessibilityScanResults = await page.accessibility.snapshot();
  expect(accessibilityScanResults).toBeDefined();
});
```

### 2. Manual Testing

#### Screen Reader Testing
```bash
# Test with screen readers
# NVDA (Windows)
# JAWS (Windows)
# VoiceOver (macOS)
# TalkBack (Android)
```

#### Keyboard Testing
```bash
# Test keyboard navigation
# Tab through all interactive elements
# Test all keyboard shortcuts
# Verify focus indicators
```

## 📊 Accessibility Metrics

### 1. WCAG Compliance

#### Level A Compliance
- All images have alt text
- All videos have captions
- All audio has transcripts
- All forms have labels
- All links have descriptive text

#### Level AA Compliance
- Color contrast ratio of 4.5:1
- Text can be resized to 200%
- All functionality is keyboard accessible
- All content is screen reader accessible
- All interactive elements are focusable

#### Level AAA Compliance
- Color contrast ratio of 7:1
- Text can be resized to 300%
- All content is understandable at 9th grade level
- All content is available in multiple formats
- All content is available in multiple languages

### 2. Performance Metrics

#### Accessibility Performance
- Screen reader performance
- Keyboard navigation speed
- Voice control accuracy
- Switch control efficiency
- Eye tracking accuracy

## 🚀 Best Practices

### 1. Development Guidelines

#### Semantic HTML
- Use proper HTML elements
- Maintain logical document structure
- Provide meaningful headings
- Use lists for related items

#### ARIA Implementation
- Use ARIA labels appropriately
- Provide ARIA descriptions
- Use ARIA live regions
- Implement ARIA landmarks

### 2. Testing Guidelines

#### Regular Testing
- Test with screen readers
- Test with keyboard only
- Test with voice control
- Test with switch control
- Test with different zoom levels

#### User Testing
- Test with real users
- Test with different abilities
- Test with different devices
- Test with different browsers
- Test with different assistive technologies

---

This accessibility guide provides comprehensive strategies for ensuring your responsive web application is accessible to all users, regardless of their abilities or the devices they use.
