/**
 * CampusDash Notifications System
 * Browser notifications + Supabase Realtime integration
 */

class NotificationManager {
    constructor() {
        this.permission = Notification.permission;
        this.subscriptions = [];
        this.init();
    }

    async init() {
        // Request permission if not already granted
        if (this.permission === 'default') {
            this.permission = await Notification.requestPermission();
        }

        console.log('🔔 Notification permission:', this.permission);

        // Setup Supabase Realtime if user is logged in
        if (window.Auth && window.Auth.isLoggedIn()) {
            this.setupRealtimeSubscriptions();
        }
    }

    /**
     * Show browser notification
     */
    async show(title, body, options = {}) {
        if (this.permission !== 'granted') {
            console.warn('Notification permission not granted');
            return;
        }

        const notification = new Notification(title, {
            body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: options.tag || 'campusdash',
            requireInteraction: options.urgent || false,
            data: options.data || {},
            ...options
        });

        notification.onclick = () => {
            window.focus();
            if (options.url) {
                window.location.href = options.url;
            }
            notification.close();
        };

        // Auto-close after 5 seconds unless urgent
        if (!options.urgent) {
            setTimeout(() => notification.close(), 5000);
        }

        return notification;
    }

    /**
     * Setup Supabase Realtime subscriptions
     */
    setupRealtimeSubscriptions() {
        if (!window.supabaseClient) {
            console.warn('Supabase client not available');
            return;
        }

        const user = window.Auth.getUser();
        if (!user) return;

        // Subscribe to request updates for students
        this.subscribeToUserRequests(user.email);

        // Subscribe to new requests for dashers
        if (user.role === 'dasher') {
            this.subscribeToDasherRequests();
        }
    }

    /**
     * Subscribe to user's own requests (for students)
     */
    subscribeToUserRequests(userEmail) {
        // Note: This is a mock implementation
        // In production, use Supabase Realtime:
        /*
        const subscription = supabaseClient
            .channel('user-requests')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'requests',
                filter: `buyer_email=eq.${userEmail}`
            }, (payload) => {
                this.handleRequestUpdate(payload);
            })
            .subscribe();
        
        this.subscriptions.push(subscription);
        */

        // Mock: Listen to localStorage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentRequest') {
                const request = JSON.parse(e.newValue);
                if (request && request.status) {
                    this.handleRequestUpdate({ new: request });
                }
            }
        });

        console.log('✅ Subscribed to user requests');
    }

    /**
     * Subscribe to new requests (for dashers)
     */
    subscribeToDasherRequests() {
        // Note: This is a mock implementation
        // In production, use Supabase Realtime:
        /*
        const subscription = supabaseClient
            .channel('dasher-requests')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'requests',
                filter: 'status=eq.pending'
            }, (payload) => {
                this.handleNewRequest(payload.new);
            })
            .subscribe();
        
        this.subscriptions.push(subscription);
        */

        console.log('✅ Subscribed to dasher requests');
    }

    /**
     * Handle request status updates
     */
    handleRequestUpdate(payload) {
        const request = payload.new;
        const oldRequest = payload.old || {};

        // Only notify if status changed
        if (oldRequest.status === request.status) return;

        switch (request.status) {
            case 'accepted':
                this.show(
                    '✅ Request Accepted!',
                    'A dasher has accepted your request',
                    {
                        tag: `request-${request.id}`,
                        url: `/tracking.html?id=${request.id}`,
                        data: { requestId: request.id }
                    }
                );
                break;

            case 'picked_up':
                this.show(
                    '📦 Item Picked Up',
                    'Your item has been collected',
                    {
                        tag: `request-${request.id}`,
                        url: `/tracking.html?id=${request.id}`,
                        data: { requestId: request.id }
                    }
                );
                break;

            case 'on_the_way':
                this.show(
                    '🚀 On The Way!',
                    'Your dasher is heading to you now',
                    {
                        tag: `request-${request.id}`,
                        url: `/tracking.html?id=${request.id}`,
                        urgent: true,
                        data: { requestId: request.id }
                    }
                );
                break;

            case 'delivered':
                this.show(
                    '🎉 Delivered!',
                    'Your request has been completed',
                    {
                        tag: `request-${request.id}`,
                        url: `/success.html?id=${request.id}`,
                        data: { requestId: request.id }
                    }
                );
                break;
        }
    }

    /**
     * Handle new request (for dashers)
     */
    handleNewRequest(request) {
        const isUrgent = request.mode === 'urgent';

        this.show(
            isUrgent ? '🚨 Urgent Request!' : '📬 New Request Available',
            `${request.category} pickup - Tip: ₹${request.tip}`,
            {
                tag: `new-request-${request.id}`,
                url: `/dasher.html`,
                urgent: isUrgent,
                data: { requestId: request.id }
            }
        );
    }

    /**
     * Cleanup subscriptions
     */
    cleanup() {
        this.subscriptions.forEach(sub => {
            if (sub && sub.unsubscribe) {
                sub.unsubscribe();
            }
        });
        this.subscriptions = [];
    }
}

// Create global instance
window.Notifications = new NotificationManager();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.Notifications) {
        window.Notifications.cleanup();
    }
});
