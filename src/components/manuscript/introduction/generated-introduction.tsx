import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { PiCopy } from 'react-icons/pi';
import { ClipLoader } from 'react-spinners';

const GeneratedIntroduction = () => {
    const dummyIntroduction = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est'
  return (
    <div>
        <div className='text-[#1E293B] font-medium text-xl'>Introduction</div>
        {!dummyIntroduction ? <ClipLoader color="#36D7B7" loading={true} size={50} /> : null}
        <div className='text-[#475569] text-sm mt-4 py-3 border-b border-gray-200'>
            {dummyIntroduction}
        </div>
        <div className='float-end flex gap-3 mt-4'>
        <button
              className="flex border border-[#CBD5E1] items-center gap-2 rounded-md py-2 px-3 text-sm font-semibold text-[#475569]"
            >
              <PiCopy size={20} /> Copy {" "}
            </button>

            <button
              className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2"
            >
                Push to Manuscript <AiOutlineArrowRight />
            </button>
        </div>
    </div>
  )
}

export default GeneratedIntroduction