import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: 'video' | 'square' | '4/3' | '3/2' | 'auto';
  placeholderColor?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  fallback = '/images/placeholder.jpg', 
  priority = false,
  className,
  aspectRatio = 'auto',
  placeholderColor = 'bg-gray-200',
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before element comes into view
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // Update imageSrc when src changes
  useEffect(() => {
    if (isInView) {
      setImageSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, isInView]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const aspectRatioClass = {
    'video': 'aspect-video',
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    'auto': '',
  }[aspectRatio];

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden",
        aspectRatioClass,
        className
      )}
    >
      {/* Placeholder/Loading State */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            placeholderColor
          )}
        >
          {/* Animated skeleton pulse */}
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" 
               style={{ 
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 1.5s infinite'
               }} 
          />
        </div>
      )}
      
      {/* Actual Image - only render when in view */}
      {imageSrc && (
        <img
          src={hasError ? fallback : imageSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      )}
    </div>
  );
}

// Add shimmer animation to global styles
const shimmerStyles = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

// Inject styles if not already present
if (typeof document !== 'undefined') {
  const styleId = 'optimized-image-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = shimmerStyles;
    document.head.appendChild(style);
  }
}
