import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ name, to }) => {
    return (
        <div className="panel" id="block">
            <div className="flex w-full">
                <div className="flex flex-1 flex-col gap-4">
                    <button type="button" className="btn block w-full btn-primary ">
                        <Link to={to} className='w-full block'>{name}</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Button;
