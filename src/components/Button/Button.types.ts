export interface GenericButton {
    text: string;
    bgColor: string;
    textColor: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
}

export interface AddButton {
    desktop: "desktop" | "mobile";
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}