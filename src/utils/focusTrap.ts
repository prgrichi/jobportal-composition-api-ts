/**
 * Erstellt einen Focus Trap für Modals, Menüs etc.
 * @param {Object} options - Konfiguration
 * @param {Function} options.getFocusableElements - Gibt Array von fokussierbaren Elementen zurück
 * @param {Function} options.onClose - Callback beim Schließen (Escape)
 * @returns {Object} Focus Trap Instanz mit activate/deactivate/destroy
 */

type FocusTrapOptions = {
  getFocusableElements?: () => HTMLElement[];
  onClose?: () => void;
};

export function createFocusTrap(options: FocusTrapOptions = {}) {
  let isActive = false;

  function handleKeydown(e: KeyboardEvent) {
    if (!isActive) return;

    const { getFocusableElements, onClose } = options;

    // Escape → Schließen
    if (e.key === 'Escape') {
      if (onClose) {
        onClose();
      }
      return;
    }

    // Tab → Focus Trap
    if (e.key === 'Tab') {
      const elements = getFocusableElements?.() || [];
      if (!elements.length) return;

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      // Shift+Tab auf erstem Element → zum letzten
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab auf letztem Element → zum ersten
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  return {
    /**
     * Aktiviert den Focus Trap
     */
    activate() {
      isActive = true;
      document.addEventListener('keydown', handleKeydown);
    },

    /**
     * Deaktiviert den Focus Trap
     */
    deactivate() {
      isActive = false;
      document.removeEventListener('keydown', handleKeydown);
    },

    /**
     * Zerstört den Focus Trap (cleanup)
     */
    destroy() {
      this.deactivate();
    },
  };
}
