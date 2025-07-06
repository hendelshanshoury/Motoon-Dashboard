import React from 'react';
import { langs } from '../../utils/langs';

const LangFormSwitcher = ({ setLang, lang }) => {
    return (
        <div className="flex gap-3 mb-3 justify-center">
            {langs.map((langTitle) => (
                <button key={langTitle} type="button" onClick={() => setLang(langTitle)} className={`btn ${lang.toLowerCase() === langTitle ? 'btn-primary' : 'btn-outline-primary'}  rounded-full`}>
                    {langTitle.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LangFormSwitcher;
