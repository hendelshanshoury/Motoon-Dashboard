import React from 'react';

const Loader = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <div>
                    <div className="w-4 h-4 m-auto mb-10">
                        <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;
