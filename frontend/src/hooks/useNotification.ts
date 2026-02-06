import { useUIStore } from '../stores/uiStore';

/**
 * Notification helper hook for showing toast messages
 * @returns Object with notification helper functions
 */
export const useNotification = () => {
  const addNotification = useUIStore((state) => state.addNotification);

  return {
    /**
     * Show success notification
     * @param message - Success message to display
     */
    showSuccess: (message: string) => {
      addNotification({
        type: 'success',
        message,
      });
    },

    /**
     * Show error notification
     * @param message - Error message to display
     */
    showError: (message: string) => {
      addNotification({
        type: 'error',
        message,
      });
    },

    /**
     * Show warning notification
     * @param message - Warning message to display
     */
    showWarning: (message: string) => {
      addNotification({
        type: 'warning',
        message,
      });
    },

    /**
     * Show info notification
     * @param message - Info message to display
     */
    showInfo: (message: string) => {
      addNotification({
        type: 'info',
        message,
      });
    },
  };
};
