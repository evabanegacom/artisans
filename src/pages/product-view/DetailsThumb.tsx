import React from 'react';

interface Props {
    images: string[];
    tab: (index: number) => void;
    myRef: React.RefObject<HTMLDivElement>;
}

const DetailsThumb: React.FC<Props> = ({ images, tab, myRef }) => {
    return (
        <div className="thumb flex justify-between" ref={myRef}>
            {images.map((img, index) => (
                <img
                    src={img}
                    alt=""
                    key={index}
                    onClick={() => tab(index)}
                    className='margin-1 cursor-pointer w-1/4 h-20 object-cover'
                />
            ))}
        </div>
    );
};

export default DetailsThumb;
