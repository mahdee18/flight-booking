import React from 'react';

const Button = () => {
    return (
        <div>
            <button
                className="bg-[#27922e] hover:bg-[#165e1a] text-white font-bold py-3 px-8 focus:outline-none focus:shadow-outline rounded-full"
                type="button"
            >
                Search
            </button>
        </div>
    );
};

export default Button;