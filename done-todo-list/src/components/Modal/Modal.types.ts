export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (content: string) => void;
    bgColor?: string;
};