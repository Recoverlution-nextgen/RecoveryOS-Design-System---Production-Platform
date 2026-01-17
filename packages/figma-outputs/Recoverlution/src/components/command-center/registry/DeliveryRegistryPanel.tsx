// DELIVERY REGISTRY PANEL
import { useDeliveryRegistry } from '@/lib/hooks/useRegistry';
import type { ContentKind } from '@/lib/types/constitution';
import { Package, ExternalLink, Plus } from 'lucide-react';

interface Props {
  contentRef: string | null;
  contentKind?: ContentKind;
}

export function DeliveryRegistryPanel({ contentRef, contentKind }: Props) {
  const { data: deliveries, isLoading } = useDeliveryRegistry(contentRef);
  
  if (!contentRef) {
    return (
      <div className="w-80 flex items-center justify-center bg-white/[0.02]">
        <p className="text-sm text-white/50">Select content to view deliveries</p>
      </div>
    );
  }
  
  return (
    <div className="w-80 flex flex-col bg-white/[0.02]">
      <div className="flex-shrink-0 p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white/90">Deliveries</h3>
          <button className="p-1 hover:bg-white/5 rounded transition-colors">
            <Plus className="w-4 h-4 text-white/70" />
          </button>
        </div>
        <p className="text-xs text-white/50">
          {deliveries?.length || 0} delivery format{(deliveries?.length || 0) !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-white/50">Loading...</p>
        ) : deliveries && deliveries.length > 0 ? (
          deliveries.map(delivery => (
            <div
              key={delivery.id}
              className="p-3 bg-white/5 border border-white/10 rounded hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-white/90">
                  {delivery.delivery_kind}
                </span>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/50">Channel:</span>
                  <span className="text-white/80">{delivery.channel}</span>
                </div>
                
                {delivery.estimated_seconds && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Duration:</span>
                    <span className="text-white/80">{delivery.estimated_seconds}s</span>
                  </div>
                )}
                
                {delivery.variant_key && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Variant:</span>
                    <span className="text-white/80">{delivery.variant_key}</span>
                  </div>
                )}
              </div>
              
              {delivery.cta_label && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <span className="text-xs text-white/50">CTA:</span>
                  <p className="text-sm text-[#5739FB] mt-0.5">{delivery.cta_label}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Package className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-sm text-white/50 mb-3">No deliveries yet</p>
            <button className="px-3 py-1.5 bg-[#5739FB] text-white text-sm rounded hover:bg-[#4628EA] transition-colors">
              Create Delivery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
