
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ src, alt, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
    </div>
  );
};

export default BlurImage;
