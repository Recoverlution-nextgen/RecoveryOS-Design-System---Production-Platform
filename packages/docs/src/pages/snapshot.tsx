import React from 'react';
import { GetServerSideProps } from 'next';
import { Center, AutoFocus } from '../snapshots/snapshot-helpers';
import {
  mockPortalRooms,
  mockRails,
  mockToasts,
  mockReceipt,
  type PortalRoom,
  type RailItem,
  type ToastData
} from '../snapshots/snapshot-mocks';

interface SnapshotPageProps {
  object: string;
  state: string;
  lens: string;
  band: string;
  rail?: string;
  kind?: string;
  variant?: string;
  profile?: string;
}

export const getServerSideProps: GetServerSideProps<SnapshotPageProps> = async (context) => {
  const { object, state, lens, band, rail, kind, variant, profile } = context.query;

  return {
    props: {
      object: object as string,
      state: (state as string) || 'default',
      lens: (lens as string) || 'individual',
      band: (band as string) || 'low',
      rail: rail as string,
      kind: kind as string,
      variant: variant as string,
      profile: profile as string,
    },
  };
};

function renderObject(
  object: string,
  state: string,
  lens: string,
  band: string,
  _rail?: string,
  _kind?: string,
  _variant?: string,
  _profile?: string
): React.ReactElement {
  const baseClasses = 'p-4 border rounded';

  switch (object) {
    case 'ReturnButton':
      return (
        <button
          className={`${baseClasses} bg-blue-500 text-white hover:bg-blue-600`}
          data-testid="return-button"
        >
          Return
        </button>
      );

    case 'RoomHeader':
      return (
        <header className={`${baseClasses} bg-gray-100`} data-testid="room-header">
          <h1 className="text-xl font-bold">Room Title</h1>
          <p className="text-gray-600">Room description</p>
        </header>
      );

    case 'RoomFrame':
      return (
        <div className={`${baseClasses} border-2 border-gray-300`} data-testid="room-frame">
          <div className="p-4 bg-white">
            Room Content
          </div>
        </div>
      );

    case 'PortalShell': {
      const rooms = mockPortalRooms(lens);
      return (
        <div className={`${baseClasses} bg-gray-50`} data-testid="portal-shell">
          <nav className="mb-4">
            {rooms.map((room: PortalRoom) => (
              <div key={room.id} className="p-2 border-b">
                {room.name}
              </div>
            ))}
          </nav>
          <main className="p-4 bg-white rounded">
            Portal Content
          </main>
        </div>
      );
    }

    case 'Rails': {
      const rails = mockRails(_rail || 'primary');
      const railItems = rails[_rail as keyof typeof rails] || rails.primary;
      return (
        <nav className={`${baseClasses} flex flex-col space-y-2`} data-testid="rails">
          {railItems.map((item: RailItem) => (
            <button
              key={item.id}
              className={`p-2 text-left rounded ${item.active ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
              data-testid={`rail-item-${item.id}`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </nav>
      );
    }

    case 'Toast': {
      const toasts = mockToasts(_kind || 'neutral');
      return (
        <div className={`${baseClasses} bg-yellow-100 border-yellow-300`} data-testid="toast">
          {toasts.map((toast: ToastData) => (
            <div key={toast.id} className="p-2">
              {toast.message}
            </div>
          ))}
        </div>
      );
    }

    case 'ReceiptCard': {
      const receipt = mockReceipt(state);
      return (
        <div className={`${baseClasses} bg-white shadow-md`} data-testid="receipt-card">
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{receipt.title}</h3>
            <div className="space-y-1">
              {receipt.items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    default:
      return (
        <div className={`${baseClasses} bg-gray-100 text-gray-500`} data-testid="placeholder">
          Placeholder for {object} ({state}, {lens}, {band})
        </div>
      );
  }
}

export default function SnapshotPage({ object, state, lens, band, rail, kind, variant, profile }: SnapshotPageProps) {
  const needsFocus = state === 'focus';

  return (
    <Center>
      <div className="w-full max-w-md">
        <AutoFocus selector="[data-testid]" enabled={needsFocus}>
          {renderObject(object, state, lens, band, rail, kind, variant, profile)}
        </AutoFocus>
      </div>
    </Center>
  );
}