import { useState, type ReactNode } from 'react';
import { PHOTO_LIBRARY, imageAsset, assetUrl, type PhotoId } from '../lib/siteAssets';
export { PHOTO_LIBRARY };
export type { PhotoId };

export function FotonPhoto({
  id, priority=false, className='', caption, showCaption=true, fallback,
}: {
  id:PhotoId; priority?:boolean; className?:string; caption?:string;
  showCaption?:boolean; fallback?:ReactNode;
}) {
  const [format,setFormat]=useState<'webp'|'png'|'unavailable'>('webp');
  const asset=imageAsset(id);
  const mobile=asset.mobileId?imageAsset(asset.mobileId):null;
  const notice=caption||'Imagem ilustrativa gerada por IA · pessoas fictícias';
  return (
    <figure className={'foton-photo '+className}
      role={className.includes('human-mosaic')?undefined:'button'}
      tabIndex={className.includes('human-mosaic')?undefined:0}
      aria-label={className.includes('human-mosaic')?undefined:'Ampliar imagem: '+asset.alt}
      data-asset-id={id} data-media-kind="ai-illustration"
      data-photo-status={format==='unavailable'?'unavailable':'illustrative'}>
      {format==='unavailable' ? (fallback || (
        <div className="foton-photo-placeholder" role="status">
          <strong>Ciência. Pessoas. Possibilidades.</strong>
          <small>Imagem ilustrativa indisponível.</small>
        </div>
      )) : (
        <picture>
          {mobile && <source media="(max-width: 700px)"
            srcSet={assetUrl(format==='png'?mobile.pngPath:mobile.webpPath)}
            type={format==='png'?'image/png':'image/webp'} />}
          <img
            src={assetUrl(format==='png'?asset.pngPath:asset.webpPath)}
            data-full-image={assetUrl(asset.pngPath)}
            data-mobile-full-image={mobile?assetUrl(mobile.pngPath):undefined}
            alt={'Imagem fictícia gerada por IA. '+asset.alt}
            width={asset.width} height={asset.height}
            loading={priority?'eager':'lazy'}
            decoding="async" fetchPriority={priority?'high':'low'}
            onError={()=>setFormat(v=>v==='webp'?'png':'unavailable')}
          />
        </picture>
      )}
      {showCaption && format!=='unavailable' && (
        <figcaption><span className="photo-caption-mark" aria-hidden="true" />{notice}</figcaption>
      )}
    </figure>
  );
}
