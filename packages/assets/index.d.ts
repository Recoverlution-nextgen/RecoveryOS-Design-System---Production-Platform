export interface AssetMetadata {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export function getAsset(key: string): AssetMetadata | null;
export function getAssetKeys(): string[];
