import React from 'react'
import aiOptionsData from './ai-options-data'
interface AIOptionsProps {
    setViewHistory: (value: boolean) => void;
    activeForm: string;
    setActiveForm: (value: string) => void;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    toggleModalViews: (value: string) => void;
}

const AIOptions = ({ setViewHistory, toggleModalViews}: AIOptionsProps) => {
    return (
        <div>
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-2 justify-between'>
                <div className='text-[#475569] text-lg font-semibold'>Choose a section that suit your expected outcome</div>
                <div className='flex justify-end'>
                    <button onClick={() => setViewHistory(true)} className='text-[#03CDAA] px-3 py-2 text-sm font-medium rounded-md border border-[#03CDAA]'>View History</button>
                </div>
            </div>

            <div className="grid grid-rows-2 grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 mt-5">
                {aiOptionsData.map((data) => (
                    <button onClick={() => toggleModalViews(data?.title)} key={data.id} className='bg-white flex flex-col border border-[#CBD5E1] rounded-lg space-y-4 p-4'>
                        
                            <img src={data.icon} alt={data.title} className='' />
                        
                        <div className='text-base font-medium text-[#1E293B]'>{data.title}</div>
                        <div className='text-xs text-[#64748B] font-medium'>{data.text}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default AIOptions