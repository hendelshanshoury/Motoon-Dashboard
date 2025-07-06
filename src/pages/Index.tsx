import React from 'react';
import Statistics from './Apps/Statistics';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const Index = () => {
    return (
        <div>
            {/* //////////////// */}
            {cookie.get('user')?.type === 'org' && (
                <div className="panel p-3">
                    <h1 className="text-center text-3xl underline font-bold pb-4">بيانات الحساب</h1>
                    <div className="text-xl pb-2">
                        <span className="font-bold">اسم الجمعية:</span> {cookie.get('user')?.name}
                    </div>
                    <div className="text-xl pb-2">
                        <span className="font-bold">البريد الالكتروني:</span> {cookie.get('user')?.email}
                    </div>
                </div>
            )}
            {cookie.get('user')?.type !== 'org' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-5">
                    <Statistics ttl="المسؤولين" name="ادارة المسؤولين" to="admins" />
                    <Statistics ttl="الجمعيات" to="organizations" name="ادارة الجمعيات" name2="ادارة اكواد التسجيل" to2="codes" />
                    <Statistics ttl="الطلاب" name="ادارة الطلاب" to="users" />
                    <Statistics ttl="الفصول الدراسيه" name="ادارة الفصول" to="semesters" />
                    <Statistics ttl="المواد الدراسيه" name="ادارة المواد" to="courses" />
                    <Statistics ttl=" الدروس" name="ادارة الدروس" to="lessons" name2="العلامات المرجعية للدروس" to2="bookmarks" />
                    <Statistics ttl="الدفعات" name="ادارة الدفعه" to="batches" />
                    <Statistics ttl="تواصل معانا" name=" تواصل معانا" to="contacts" />
                </div>
            )}
        </div>
    );
};

export default Index;
