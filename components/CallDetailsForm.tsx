import React, { useState } from 'react';
import { CallMetadata, Participant } from '../types';
import { User, Briefcase, Play, Plus, Trash2, Users } from 'lucide-react';

interface CallDetailsFormProps {
    initialMetadata: CallMetadata;
    initialParticipants: Participant[];
    onConfirm: (metadata: CallMetadata, participants: Participant[]) => void;
    onCancel: () => void;
}

const CallDetailsForm: React.FC<CallDetailsFormProps> = ({
    initialMetadata,
    initialParticipants,
    onConfirm,
    onCancel
}) => {
    const [metadata, setMetadata] = useState<CallMetadata>(initialMetadata);
    const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
    const [newProspectName, setNewProspectName] = useState('');
    const [newProspectTitle, setNewProspectTitle] = useState('');

    // Extract all unique names from the initial detected participants for the dropdowns
    // We filter out empty names and duplicate entries
    const uniqueNames = Array.from(new Set(initialParticipants.map(p => p.name).filter(n => n)));

    const handleMetadataChange = (field: keyof CallMetadata, value: string) => {
        setMetadata(prev => ({ ...prev, [field]: value }));
    };

    const handleParticipantChange = (index: number, field: keyof Participant, value: any) => {
        const updated = [...participants];
        updated[index] = { ...updated[index], [field]: value };
        setParticipants(updated);
    };

    const addProspect = () => {
        if (newProspectName.trim()) {
            setParticipants([
                ...participants,
                {
                    name: newProspectName,
                    role: 'Prospect',
                    title: newProspectTitle,
                    isDecisionMaker: false
                }
            ]);
            setNewProspectName('');
            setNewProspectTitle('');
        }
    };

    const removeParticipant = (index: number) => {
        setParticipants(participants.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 animate-fade-in">
            <h1 className="text-3xl font-light mb-2 tracking-tight">Confirm Call Details</h1>
            <p className="text-gray-500 mb-8">Verify the information below to improve the analysis accuracy.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Metadata & Sales Team */}
                <div className="space-y-8">

                    <section>
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                            <Briefcase size={16} /> Call Info
                        </h3>
                        <div className="space-y-4 bg-gray-50 p-6 border border-gray-100">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Demo Title</label>
                                <input
                                    type="text"
                                    value={metadata.title}
                                    onChange={(e) => handleMetadataChange('title', e.target.value)}
                                    className="w-full p-2 border border-gray-200 focus:border-black outline-none transition-colors"
                                    placeholder="e.g. Datadog <> Customer Demo"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    value={metadata.customerName}
                                    onChange={(e) => handleMetadataChange('customerName', e.target.value)}
                                    className="w-full p-2 border border-gray-200 focus:border-black outline-none transition-colors"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Duration / Date</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={metadata.duration || ''}
                                        onChange={(e) => handleMetadataChange('duration', e.target.value)}
                                        className="w-1/2 p-2 border border-gray-200 focus:border-black outline-none transition-colors"
                                        placeholder="Duration"
                                    />
                                    <input
                                        type="text"
                                        value={metadata.date || ''}
                                        onChange={(e) => handleMetadataChange('date', e.target.value)}
                                        className="w-1/2 p-2 border border-gray-200 focus:border-black outline-none transition-colors"
                                        placeholder="Date"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                            <User size={16} /> Sales Team
                        </h3>
                        <div className="space-y-3">
                            {/* Sales Engineer */}
                            <div className="bg-white p-4 border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 text-gray-600">SE</span>
                                </div>
                                <select
                                    className="w-full p-2 border border-gray-200 focus:border-black outline-none bg-white"
                                    value={participants.find(p => p.role === 'SE')?.name || ''}
                                    onChange={(e) => {
                                        const newName = e.target.value;
                                        const updated = [...participants];
                                        // Remove old SE
                                        const oldSeIndex = updated.findIndex(p => p.role === 'SE');
                                        if (oldSeIndex >= 0) updated.splice(oldSeIndex, 1);

                                        // If user selected valid name (not empty), add/update
                                        if (newName) {
                                            // Check if this person was already something else, if so, update their role
                                            const existingIndex = updated.findIndex(p => p.name === newName);
                                            if (existingIndex >= 0) {
                                                updated[existingIndex].role = 'SE';
                                            } else {
                                                updated.push({ name: newName, role: 'SE' });
                                            }
                                        }
                                        setParticipants(updated);
                                    }}
                                >
                                    <option value="">Select Sales Engineer...</option>
                                    {uniqueNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Account Executive */}
                            <div className="bg-white p-4 border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 text-gray-600">AE</span>
                                </div>
                                <select
                                    className="w-full p-2 border border-gray-200 focus:border-black outline-none bg-white"
                                    value={participants.find(p => p.role === 'AE')?.name || ''}
                                    onChange={(e) => {
                                        const newName = e.target.value;
                                        const updated = [...participants];
                                        const oldAeIndex = updated.findIndex(p => p.role === 'AE');
                                        if (oldAeIndex >= 0) updated.splice(oldAeIndex, 1);

                                        if (newName) {
                                            const existingIndex = updated.findIndex(p => p.name === newName);
                                            if (existingIndex >= 0) {
                                                updated[existingIndex].role = 'AE';
                                            } else {
                                                updated.push({ name: newName, role: 'AE' });
                                            }
                                        }
                                        setParticipants(updated);
                                    }}
                                >
                                    <option value="">Select Account Executive...</option>
                                    {uniqueNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column: Prospects */}
                <div className="space-y-8">
                    <section className="h-full flex flex-col">
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                            <Users size={16} /> Prospects
                        </h3>

                        <div className="flex-1 space-y-3 mb-6">
                            {participants.filter(p => p.role === 'Prospect').map((p, idx) => {
                                const realIndex = participants.indexOf(p);
                                return (
                                    <div key={realIndex} className="bg-white p-4 border border-gray-200 shadow-sm group relative">
                                        <button
                                            onClick={() => removeParticipant(realIndex)}
                                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="flex gap-3 mb-2">
                                            <input
                                                type="text"
                                                value={p.name}
                                                onChange={(e) => handleParticipantChange(realIndex, 'name', e.target.value)}
                                                className="flex-1 p-2 border border-gray-200 focus:border-black outline-none font-medium"
                                                placeholder="Prospect Name"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={p.title || ''}
                                            onChange={(e) => handleParticipantChange(realIndex, 'title', e.target.value)}
                                            className="w-full p-2 border border-gray-200 focus:border-black outline-none text-sm text-gray-600"
                                            placeholder="Job Title (e.g. VP Engineering)"
                                        />
                                        <div className="mt-2 flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`dm-${realIndex}`}
                                                checked={p.isDecisionMaker || false}
                                                onChange={(e) => handleParticipantChange(realIndex, 'isDecisionMaker', e.target.checked)}
                                                className="border-gray-300 text-black focus:ring-black"
                                            />
                                            <label htmlFor={`dm-${realIndex}`} className="text-xs text-gray-500">Decision Maker</label>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Add New Prospect Input */}
                            <div className="bg-gray-50 p-4 border border-dashed border-gray-300 flex flex-col gap-3">
                                <input
                                    type="text"
                                    value={newProspectName}
                                    onChange={(e) => setNewProspectName(e.target.value)}
                                    className="w-full bg-white p-2 border border-gray-200 outline-none text-sm"
                                    placeholder="New Prospect Name"
                                    onKeyDown={(e) => e.key === 'Enter' && addProspect()}
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newProspectTitle}
                                        onChange={(e) => setNewProspectTitle(e.target.value)}
                                        className="flex-1 bg-white p-2 border border-gray-200 outline-none text-sm"
                                        placeholder="Title"
                                        onKeyDown={(e) => e.key === 'Enter' && addProspect()}
                                    />
                                    <button
                                        onClick={addProspect}
                                        disabled={!newProspectName}
                                        className="bg-gray-200 text-gray-600 p-2 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

            <div className="mt-12 flex justify-end gap-4 border-t border-gray-100 pt-8">
                <button
                    onClick={onCancel}
                    className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(metadata, participants)}
                    className="bg-black text-white px-8 py-3 font-medium text-sm hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                    <Play size={16} fill="currentColor" /> Start Analysis
                </button>
            </div>
        </div>
    );
};

export default CallDetailsForm;
