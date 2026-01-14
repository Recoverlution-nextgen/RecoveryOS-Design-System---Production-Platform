export function mockPortalRooms(lens) {
    const baseRooms = [
        { id: '1', name: 'Welcome', description: 'Getting started', type: 'individual' },
        { id: '2', name: 'Dashboard', description: 'Overview and metrics', type: 'professional' },
        { id: '3', name: 'Team Hub', description: 'Collaboration space', type: 'organisation' },
    ];
    return baseRooms.filter(room => room.type === lens || lens === 'all');
}
export function mockRails(state) {
    const primaryItems = [
        { id: 'home', label: 'Home', icon: 'home', active: state === 'primary' },
        { id: 'search', label: 'Search', icon: 'search' },
        { id: 'profile', label: 'Profile', icon: 'user' },
    ];
    const contextItems = [
        { id: 'settings', label: 'Settings', icon: 'settings', active: state === 'context' },
        { id: 'help', label: 'Help', icon: 'help' },
    ];
    const artifactItems = [
        { id: 'documents', label: 'Documents', icon: 'file', active: state === 'artifact' },
        { id: 'images', label: 'Images', icon: 'image' },
        { id: 'videos', label: 'Videos', icon: 'video' },
    ];
    return {
        primary: primaryItems,
        context: contextItems,
        artifact: artifactItems,
    };
}
export function mockToasts(type) {
    const toasts = {
        neutral: [
            { id: '1', message: 'Operation completed successfully', type: 'neutral' },
        ],
        confirm: [
            { id: '2', message: 'Changes saved successfully', type: 'confirm' },
        ],
        error: [
            { id: '3', message: 'An error occurred', type: 'error' },
        ],
    };
    return toasts[type] || toasts.neutral;
}
export function mockReceipt(state) {
    const baseReceipt = {
        id: 'receipt-123',
        title: 'Service Payment',
        amount: 99.99,
        date: '2024-01-13',
        status: 'default',
        items: [
            { label: 'Service Fee', value: '$99.99' },
            { label: 'Tax', value: '$8.99' },
            { label: 'Total', value: '$108.98' },
        ],
    };
    if (state === 'redacted') {
        return {
            ...baseReceipt,
            status: 'redacted',
            items: baseReceipt.items?.map(item => ({
                label: item.label,
                value: '••••••••',
            })),
        };
    }
    return baseReceipt;
}
