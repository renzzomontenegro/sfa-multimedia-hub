import Image from "next/image";

type LocalPubmatImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  onError?: (src: string) => void;
};

export function LocalPubmatImage({ src, alt, sizes, className, onError }: LocalPubmatImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized
      className={className ?? "object-contain"}
      onError={() => onError?.(src)}
    />
  );
}
