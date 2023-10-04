import React from 'react';
interface TileProps {
    value: number;
    onClick: () => void;
}

const Tile: React.FC<TileProps> = ({value, onClick}) => {
    const isEmpty = value === 0;
    return (
        <div
            className={ `tile ${isEmpty ? 'empty' : ''}` }
            onClick = {() => {
                if (!isEmpty) {
                    onClick();
                }
            }}
        >
            <span className="tile-text">{isEmpty ? '' : value}</span>
            
        </div>
    );
};

export default Tile;