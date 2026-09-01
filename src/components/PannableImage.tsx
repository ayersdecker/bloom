import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface PannableImageProps {
  alt: string;
  src: string;
}

export function PannableImage({ alt, src }: PannableImageProps) {
  return (
    <TransformWrapper minScale={1} maxScale={4} doubleClick={{ disabled: true }} pinch={{ step: 5 }}>
      <TransformComponent wrapperClass="!w-full overflow-hidden rounded-3xl" contentClass="!w-full">
        <img src={src} alt={alt} className="w-full rounded-3xl border border-brass/30 object-cover" />
      </TransformComponent>
    </TransformWrapper>
  );
}
