import React from 'react';
import { useDrop, useDrag } from 'react-dnd'; 
import { FaTrash, FaTimes } from 'react-icons/fa';

// Component for a single item in the favourites list
const DraggableFavItem = ({ prop, onRemove }) => {
    // Make this item draggable using React DnD
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FAV_ITEM', // Unique ID so the trash can knows to accept this
        item: { id: prop.id }, // Pass the ID so we know what to delete
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(), // Check if currently being dragged
        }),
    }));

    return (
        <div 
            ref={drag} 
            className="fav-item" 
            // Lower opacity while dragging to give visual feedback
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
        >
            <img src={prop.picture} alt={prop.type} />
            <div className="fav-info">
                <h4>{prop.type}</h4>
                <p>£{prop.price.toLocaleString()}</p>
            </div>
            {/* Delete button (alternative to dragging) */}
            <button className="remove-btn" onClick={() => onRemove(prop.id)}>
                <FaTimes />
            </button>
        </div>
    );
};

// Main Component: The side panel for saved properties
const Favourites = ({ favs, onRemove, onClear, onDropProperty }) => {
    
    // Drop Zone 1: Main Panel (Accepts houses from the Gallery)
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'PROPERTY', 
        drop: (item) => onDropProperty(item.property),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(), // Returns true if user is hovering over the box
        }),
    }), [onDropProperty]); // Dependency ensures we don't get stuck with old data

    // Drop Zone 2: Trash Can (Only accepts items from the Favourites list)
    const [{ isOverTrash }, dropTrash] = useDrop(() => ({
        accept: 'FAV_ITEM', 
        drop: (item) => onRemove(item.id),
        collect: (monitor) => ({
            isOverTrash: !!monitor.isOver(),
        }),
    }), [onRemove]);

    return (
        <aside 
            ref={drop} 
            className="favourites-panel"
            // Change border color to green when hovering to show it's active
            style={{ borderColor: isOver ? '#00d775' : 'transparent' }} 
        >
            <div className="fav-header">
                <h2>My Favourites ({favs.length})</h2>
                {/* Only show Clear button if list is not empty */}
                {favs.length > 0 && (
                    <button className="clear-btn" onClick={onClear}>
                        Clear All
                    </button>
                )}
            </div>

            {/* Show instructions if the list is empty, otherwise show the items */}
            {favs.length === 0 ? (
                <div className="empty-fav-zone">
                    <p>Drag properties here to save them!</p>
                </div>
            ) : (
                <>
                    <div className="fav-list">
                        {favs.map(prop => (
                            <DraggableFavItem 
                                key={prop.id} 
                                prop={prop} 
                                onRemove={onRemove} 
                            />
                        ))}
                    </div>

                    {/* Trash Can Area at the bottom */}
                    <div 
                        ref={dropTrash} 
                        className="trash-zone"
                        style={{ 
                            // Turn red when dragging over it to show "Delete" action
                            backgroundColor: isOverTrash ? '#ffebee' : '#f9f9f9',
                            border: isOverTrash ? '2px dashed #dc3545' : '2px dashed #ccc',
                            marginTop: '20px', padding: '15px', borderRadius: '8px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            gap: '5px', color: '#999', fontSize: '0.8rem'
                        }}
                    >
                        <FaTrash style={{ color: isOverTrash ? '#dc3545' : '#999', fontSize: '1.2rem' }}/>
                        <span>Drag here to remove</span>
                    </div>
                </>
            )}
        </aside>
    );
};

export default Favourites;