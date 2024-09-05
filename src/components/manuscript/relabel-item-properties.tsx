import React, { useState } from 'react';

interface RelabelItemPropertiesProps {
    setRelabelledProperty: (item: string) => void;
}

interface Property {
    id: number;
    satisfactoryLevel: number;
    label: string;
}

const RelabelItemProperties = ({ setRelabelledProperty }: RelabelItemPropertiesProps) => {
    const [properties, setProperties] = useState<Property[]>([
        { id: 1, satisfactoryLevel: 1, label: 'Very Satisfied' },
        { id: 2, satisfactoryLevel: 2, label: 'Satisfied' },
        { id: 3, satisfactoryLevel: 3, label: 'Neutral' },
        { id: 4, satisfactoryLevel: 4, label: 'Unsatisfied' },
        { id: 5, satisfactoryLevel: 5, label: 'Very Unsatisfied' },
    ]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedLabel, setEditedLabel] = useState<string>('');

    // Handle editing label
    const handleEditLabel = (property: Property) => {
        setEditingId(property.id); // Set the id of the label being edited
        setEditedLabel(property.label); // Set the current label as the initial value
    };

    // Handle saving the edited label
    const handleSaveLabel = (id: number) => {
        setProperties((prevProperties) =>
            prevProperties.map((property) =>
                property.id === id ? { ...property, label: editedLabel } : property
            )
        );
        setRelabelledProperty(editedLabel); // Trigger any external update
        setEditingId(null); // Exit edit mode
    };

    // Handle when user clicks outside the input (blur event)
    const handleBlur = (id: number) => {
        handleSaveLabel(id);
    };

    return (
        <div className='flex flex-col px-2 mt-5'>
            <div className='flex bg-[#F8FAFC] items-center justify-between font-semibold text-sm p-2'>
                <div className='text-[#475569]'>Satisfactory Level</div>
                <div className='text-[#475569] mr-20'>Label</div>
                <div>Actions</div>
            </div>

            {properties.map((property, index) => (
                <div
                    key={property.id}
                    className={`flex items-center justify-between p-2 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                        }`}
                >
                    <div className='text-sm font-normal text-[#64748B]'>{property.satisfactoryLevel}</div>

                    {/* Editable Label */}
                    <div className='text-sm font-normal text-[#64748B]'>
                        {editingId === property.id ? (
                            <input
                                type="text"
                                value={editedLabel}
                                onChange={(e) => setEditedLabel(e.target.value)}
                                onBlur={() => handleBlur(property.id)} // Save when input loses focus
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveLabel(property.id)} // Save on Enter
                                autoFocus
                                className='border border-[#94A3B8] rounded-lg p-2 text-[#475569] outline-none'
                            />
                        ) : (
                            <span onClick={() => handleEditLabel(property)} className="cursor-pointer">
                                {property.label}
                            </span>
                        )}
                    </div>

                    <div className='text-sm font-normal text-[#64748B]'>Actions</div>
                </div>
            ))}
        </div>
    );
};

export default RelabelItemProperties;
