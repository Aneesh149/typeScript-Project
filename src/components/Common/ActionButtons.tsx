import React from 'react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  viewLabel = 'View',
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  className = ''
}) => {
  return (
    <div className={`action-buttons ${className}`}>
      {onView && (
        <button
          className="view-button"
          onClick={onView}
        >
          {viewLabel}
        </button>
      )}
      {onEdit && (
        <button
          className="edit-button"
          onClick={onEdit}
        >
          {editLabel}
        </button>
      )}
      {onDelete && (
        <button
          className="delete-button"
          onClick={onDelete}
        >
          {deleteLabel}
        </button>
      )}
    </div>
  );
};

export default ActionButtons; 