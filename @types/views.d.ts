declare type View = 'list' | 'grid';

declare type ProductViewProps = ProductDataProps & {
    view?: View;
    List?: React.ComponentType<ProductProps>;
    Grid?: React.ComponentType<ProductProps>;
}