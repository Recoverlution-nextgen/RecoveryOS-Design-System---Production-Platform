import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Center, AutoFocus } from '../snapshots/snapshot-helpers';
import { mockPortalRooms, mockRails, mockToasts, mockReceipt } from '../snapshots/snapshot-mocks';
export const getServerSideProps = async (context) => {
    const { object, state, lens, band, rail, kind, variant, profile } = context.query;
    return {
        props: {
            object: object,
            state: state || 'default',
            lens: lens || 'individual',
            band: band || 'low',
            rail: rail,
            kind: kind,
            variant: variant,
            profile: profile,
        },
    };
};
function renderObject(object, state, lens, band, _rail, _kind, _variant, _profile) {
    const baseClasses = 'p-4 border rounded';
    switch (object) {
        case 'ReturnButton':
            return (_jsx("button", { className: `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`, "data-testid": "return-button", children: "Return" }));
        case 'RoomHeader':
            return (_jsxs("header", { className: `${baseClasses} bg-gray-100`, "data-testid": "room-header", children: [_jsx("h1", { className: "text-xl font-bold", children: "Room Title" }), _jsx("p", { className: "text-gray-600", children: "Room description" })] }));
        case 'RoomFrame':
            return (_jsx("div", { className: `${baseClasses} border-2 border-gray-300`, "data-testid": "room-frame", children: _jsx("div", { className: "p-4 bg-white", children: "Room Content" }) }));
        case 'PortalShell': {
            const rooms = mockPortalRooms(lens);
            return (_jsxs("div", { className: `${baseClasses} bg-gray-50`, "data-testid": "portal-shell", children: [_jsx("nav", { className: "mb-4", children: rooms.map((room) => (_jsx("div", { className: "p-2 border-b", children: room.name }, room.id))) }), _jsx("main", { className: "p-4 bg-white rounded", children: "Portal Content" })] }));
        }
        case 'Rails': {
            const rails = mockRails(_rail || 'primary');
            const railItems = rails[_rail] || rails.primary;
            return (_jsx("nav", { className: `${baseClasses} flex flex-col space-y-2`, "data-testid": "rails", children: railItems.map((item) => (_jsxs("button", { className: `p-2 text-left rounded ${item.active ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`, "data-testid": `rail-item-${item.id}`, children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }, item.id))) }));
        }
        case 'Toast': {
            const toasts = mockToasts(_kind || 'neutral');
            return (_jsx("div", { className: `${baseClasses} bg-yellow-100 border-yellow-300`, "data-testid": "toast", children: toasts.map((toast) => (_jsx("div", { className: "p-2", children: toast.message }, toast.id))) }));
        }
        case 'ReceiptCard': {
            const receipt = mockReceipt(state);
            return (_jsx("div", { className: `${baseClasses} bg-white shadow-md`, "data-testid": "receipt-card", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: receipt.title }), _jsx("div", { className: "space-y-1", children: receipt.items?.map((item, index) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: [item.label, ":"] }), _jsx("span", { children: item.value })] }, index))) })] }) }));
        }
        default:
            return (_jsxs("div", { className: `${baseClasses} bg-gray-100 text-gray-500`, "data-testid": "placeholder", children: ["Placeholder for ", object, " (", state, ", ", lens, ", ", band, ")"] }));
    }
}
export default function SnapshotPage({ object, state, lens, band, rail, kind, variant, profile }) {
    const needsFocus = state === 'focus';
    return (_jsx(Center, { children: _jsx("div", { className: "w-full max-w-md", children: _jsx(AutoFocus, { selector: "[data-testid]", enabled: needsFocus, children: renderObject(object, state, lens, band, rail, kind, variant, profile) }) }) }));
}
