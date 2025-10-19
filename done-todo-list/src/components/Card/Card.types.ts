export interface Card {
    description: string;
    id: number;
    checked: boolean;
}

export type CardItemProps = {
    id: number;
    description: string;
    checked?: boolean;
    onToggle?: () => void;
    onDelete?: () => void;
};