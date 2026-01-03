import React from 'react';
import ActivityCheckbox from './ActivityCheckbox';
import ActivityInputForm from './ActivityInputForm';
import { INPUT_TYPES } from '../../utils/constants';

/**
 * ActivityRenderer Component
 * Dynamically renders the appropriate activity input based on configuration.
 */
const ActivityRenderer = ({
    activity,
    value,
    onToggle,
    onNoteChange,
    onFormChange,
    error,
    children
}) => {
    if (!activity) return null;

    const type = activity.type || INPUT_TYPES.CHECKBOX;

    switch (type) {
        case INPUT_TYPES.CHECKBOX:
        case 'additional':
            return (
                <ActivityCheckbox
                    id={activity.id}
                    label={activity.label}
                    Icon={activity.Icon}
                    points={activity.points}
                    isChecked={!!value}
                    onToggle={onToggle}
                    note={value && typeof value === 'object' ? value.note : ''}
                    onNoteChange={onNoteChange}
                    placeholder={activity.placeholder}
                    color={activity.color}
                />
            );

        case INPUT_TYPES.FORM:
        case INPUT_TYPES.TEXT:
        case 'tadarus':
        case 'literacy':
        case 'tafsir':
            return (
                <ActivityInputForm
                    id={activity.id}
                    title={activity.title || activity.label}
                    Icon={activity.Icon}
                    themeColor={activity.themeColor || activity.color}
                    points={activity.points}
                    error={error}
                >
                    {children}
                </ActivityInputForm>
            );

        default:
            console.warn(`Unknown activity type: ${type}`);
            return null;
    }
};

export default ActivityRenderer;
