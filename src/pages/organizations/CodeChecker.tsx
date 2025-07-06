import React, { useState } from 'react';
import { toast } from '../../utils/Toast';
import axios from 'axios';

const CodeChecker = () => {
    const [code, setCode] = useState('');
    async function submitCode(e) {
        e.preventDefault();
        if (!code) return;
        try {
            const data = await axios.post('/api/admin/checkCode', {
                code,
            });
            toast.fire({
                iconHtml: 'test',
                icon: 'success',
                title: 'الكود فعال',
                padding: '10px 20px',
            });
          } catch (error) {
          toast.fire({
              icon: 'error',
              title: 'خطأ',
              padding: '10px 20px',
          });

        }
    }
    return (
        <div>
            <div className="panel">
                <form onSubmit={submitCode}>
                    <input onChange={(e) => setCode(e.target.value)} value={code} type="text" placeholder="اكتب الكود هنا..." className="form-input" required />
                    <button disabled={!code} type="submit" className="btn btn-primary mt-6">
                        تحقق
                    </button>
                    <h3 className='pt-5 text-lg border-b-2 border-gray-500 w-fit mb-2'>بيانات الكود:</h3>
                    <div className='bg-gray-700 p-2 rounded-md'>
                      <h3 className='font-bold pb-2 !text-white-light'>اسم الجمعية:</h3>
                      <h3 className='font-bold pb-2 !text-white-light'>العدد الكلي المسموح:</h3>
                      <h3 className='font-bold pb-2 !text-white-light'>عدد استخدامات الكود:</h3>
                      <h3 className='font-bold pb-2 !text-white-light'>حالة الكود: نشط ام لا</h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CodeChecker;
