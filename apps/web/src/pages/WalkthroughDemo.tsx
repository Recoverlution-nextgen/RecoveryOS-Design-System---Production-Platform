import { WalkthroughPresenter } from '@repo/ui';

export default function WalkthroughDemo() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <WalkthroughPresenter
        autoAdvance={false}
        onSceneChange={(sceneId) => {
          console.log('Scene changed to:', sceneId);
        }}
      />
    </div>
  );
}
