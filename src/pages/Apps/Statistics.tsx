import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import Button from '../../components/Button';

interface StatisticsProps extends HTMLAttributes<HTMLHeadingElement> {
    ttl: string;
    name: string;
    name2?: string;
    to: string;
    to2?: string;
}

const Statistics: FC<StatisticsProps> = ({ ttl, name, name2, to, to2 }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    return (
        <>
            <div className="panel h-full sm:col-span-2 lg:col-span-1">
                {/* statistics */}
                <div className="flex justify-between dark:text-white-light mb-5">
                    <h5 className="font-semibold text-lg ">{ttl}</h5>
                </div>
                <div className=" text-sm text-[#515365] font-bold ">
                    <Button name={name} to={to} />
                    {name2 && <Button name={name2} to={to2} />}
                </div>
            </div>
        </>
    );
};

export default Statistics;
