// USERS------------------------------------------------------------------------------------------------------------------------
export const colsData_user = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم EN' },
    { extended: false, name: 'name_ar', title: 'الاسم AR' },
    { extended: false, name: 'email', title: 'الايميل' },
    { extended: false, name: 'phone', title: 'الهاتف' },
    { extended: false, name: 'code', title: 'كود المنظمة' },
    { extended: false, name: 'batch_code', title: 'كود الدفعة' },
    { extended: false, name: 'country', title: 'البلد' },
    { extended: true, name: 'birthdate', title: 'تاريخ الميلاد' },
    { extended: true, name: 'national_id', title: 'الهوية' },
    { extended: true, name: 'city', title: 'المدينة' },
    { extended: true, name: 'gender', title: 'النوع' },
    { extended: true, name: 'email_verified_at', title: 'تاريخ التفعيل' },
    { extended: true, name: 'status', title: 'الحالة' },
];
export const colsData_valdation = [
    { extended: false, name: 'name_ar', title: 'اسم المستخدم AR' },
    { extended: false, name: 'name', title: 'اسم المستخدم EN' },
    { extended: false, name: 'email', title: 'الايميل' },
    { extended: false, name: 'national_id', title: 'الهوية رقم' },
    { extended: false, name: 'national_id_status', title: 'حالة التفعيل' },
];

// ADMIN------------------------------------------------------------------------------------------------------------------------
export const colsData_admin = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم' },
    { extended: false, name: 'email', title: 'الايميل' },
    { extended: false, name: 'type', title: 'النوع' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// AUTH-ORG------------------------------------------------------------------------------------------------------------------------
export const colsData_org_accounts = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم' },
];
// ORGANIZATIONS------------------------------------------------------------------------------------------------------------------------
export const colsData_org = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم ' },
    { extended: false, name: 'email', title: 'البريد الالكتروني ' },
    { extended: false, name: 'address', title: 'المنطقة ' },
];
export const colsData_center = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم ' },
    { extended: false, name: 'email', title: 'البريد الالكتروني ' },
    { extended: false, name: 'address', title: 'المنطقة ' },
    { extended: false, name: 'code.code', title: 'الكود' },
    { extended: false, name: 'code.student_num', title: 'عدد الطلبة المسموح' },
    { extended: false, name: 'phone', title: 'الهاتف' },
    { extended: false, name: 'admin.name', title: 'الجمعية' },
    { extended: true, name: 'type', title: 'النوع ' },
    { extended: true, name: 'status', title: 'الحالة ' },
];
// CODES------------------------------------------------------------------------------------------------------------------------
export const colsData_codes = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'admin_name', title: 'الجمعية' },
    { extended: false, name: 'code', title: 'كود' },
    { extended: false, name: 'users_count', title: 'اجمالي الطلاب المسجلين' },
    { extended: false, name: 'student_num', title: 'عدد الطلاب' },
    { extended: false, name: 'type', title: ' النوع' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// SEMESTERS------------------------------------------------------------------------------------------------------------------------
export const colsData_semesters = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم' },
    { extended: false, name: 'description', title: 'وصف' },
    { extended: false, name: 'year', title: 'السنه' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// COURSES------------------------------------------------------------------------------------------------------------------------
export const colsData_courses = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم ' },
    { extended: false, name: 'semester.name', title: 'الفصل' },
    { extended: false, name: 'semester.year', title: 'السنة' },
    { extended: false, name: 'lecturer', title: 'المحاضر ' },
    { extended: true, name: 'description', title: 'وصف ' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// CONTACTS-US------------------------------------------------------------------------------------------------------------------------
export const colsData_contacts = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'first_name', title: ' الاسم الاول ' },
    { extended: false, name: 'last_name', title: 'الاسم الثاني' },
    { extended: false, name: 'email', title: 'البريد الالكتروني' },
    { extended: false, name: 'phone', title: ' رقم التليفون' },
    { extended: false, name: 'message', title: 'الرساله' },
];
// Supports------------------------------------------------------------------------------------------------------------------------
export const colsData_supports = [
    { extended: false, name: 'user_id', title: 'كود المستخدم' },
    { extended: false, name: 'user.name', title: 'الاسم' },
    { extended: false, name: 'user.email', title: 'البريد الالكتروني' },
];
// batches------------------------------------------------------------------------------------------------------------------------
export const colsData_batches = [
    { extended: false, name: 'code', title: 'الكود' },
    { extended: false, name: 'start_date', title: 'تاريخ البدء' },
    { extended: false, name: 'sem1_date', title: 'فصل دراسي اول' },
    { extended: false, name: 'sem2_date', title: 'فصل دراسي ثاني' },
    { extended: false, name: 'sem3_date', title: 'فصل دراسي ثالث' },
    { extended: false, name: 'sem4_date', title: 'فصل دراسي رابع' },
    // { extended: false, name: 'mid1_date', title: 'اختبار النصف للفصل 1' },
    // { extended: false, name: 'mid2_date', title: 'اختبار النصف للفصل 2' },
    // { extended: false, name: 'mid3_date', title: 'اختبار النصف للفصل 3' },
    // { extended: false, name: 'mid4_date', title: 'اختبار النصف للفصل 4' },
    // { extended: false, name: 'final1_date', title: 'اختبار نهائي للفصل 1' },
    // { extended: false, name: 'final2_date', title: 'اختبار نهائي للفصل 2' },
    // { extended: false, name: 'final3_date', title: 'اختبار نهائي للفصل 3' },
    // { extended: false, name: 'final4_date', title: 'اختبار نهائي للفصل 4' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// LESSONS------------------------------------------------------------------------------------------------------------------------
export const colsData_lessons = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'الاسم' },
    { extended: false, name: 'course_name', title: 'اسم المادة' },
    { extended: false, name: 'description', title: 'وصف' },
    { extended: true, name: 'course_id', title: 'الكورس ID ' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// BOOKMARKS------------------------------------------------------------------------------------------------------------------------
export const colsData_bookmarks = [
    { extended: false, name: 'id', title: 'ID' },
    { extended: false, name: 'name', title: 'وصف' },
    { extended: false, name: 'description', title: 'عنوان' },
    { extended: false, name: 'lesson.name', title: 'الدرس' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// QUESTIONS------------------------------------------------------------------------------------------------------------------------
export const colsData_questions = [
    { extended: true, name: 'id', title: 'ID' },
    { extended: false, name: 'lesson_name', title: 'الدرس' },
    { extended: false, name: 'name', title: 'الاسم' },
    { extended: false, name: 'a1', title: 'الاجابه 1' },
    { extended: false, name: 'a2', title: 'الاجابه2' },
    { extended: false, name: 'a3', title: 'الاجابه3' },
    { extended: false, name: 'a4', title: 'الاجابه4' },
    { extended: false, name: 'a5', title: 'الاجابه5' },
    { extended: false, name: 'a6', title: 'الاجابه6' },
    { extended: false, name: 'correct_answer', title: 'اجابه صحيحه' },
    { extended: true, name: 'type', title: 'النوع' },
    { extended: true, name: 'level', title: 'المستوي' },
    { extended: true, name: 'status', title: 'الحالة' },
];
// Exams------------------------------------------------------------------------------------------------------------------------
export const colsData_quiz = [
    { extended: false, name: 'user_id', title: 'ID' },
    { extended: false, name: 'lesson_name', title: 'الدرس' },
    { extended: false, name: 'user_name', title: 'الطالب' },
    { extended: false, name: 'quiz_num', title: 'عدد الاسئلة' },
    { extended: false, name: 'quiz_take_num', title: 'عدد المحاولات' },
    { extended: false, name: 'is_success', title: 'ناجح | راسب' },
    { extended: false, name: 'degree', title: 'الدرجة' },
    { extended: false, name: 'created_at', title: 'الاسم' },
];
export const colsData_mid = [
    { extended: false, name: 'user_id', title: 'ID' },
    { extended: false, name: 'user_name', title: 'الطالب' },
    { extended: false, name: 'course_name', title: 'المادة' },
    { extended: false, name: 'degree', title: 'الدرجة % ' },
    { extended: false, name: 'is_success', title: 'ناجح | راسب' },
    { extended: false, name: 'start_time', title: 'موعد البدء' },
    { extended: false, name: 'end_time', title: 'موعد الانتهاء' },
];
export const colsData_mid_absent = [
    { extended: false, name: 'user_id', title: 'ID' },
    { extended: false, name: 'user_name', title: 'الطالب EN' },
    { extended: false, name: 'user_name_ar', title: 'الطالب AR' },
    { extended: false, name: 'user_email', title: 'البريد الالكتروني' },
    { extended: false, name: 'user_code', title: 'كود المنظمة' },
    { extended: false, name: 'midterm_date', title: 'موعد الاختبار' },
    { extended: false, name: 'course_name', title: 'المادة' },
];
export const colsData_final = [
    { extended: false, name: 'user_id', title: 'ID' },
    { extended: false, name: 'user_name', title: 'الطالب' },
    { extended: false, name: 'course_name', title: 'المادة' },
    { extended: false, name: 'degree', title: 'الدرجة % ' },
    { extended: false, name: 'is_success', title: 'ناجح | راسب' },
    { extended: false, name: 'start_time', title: 'موعد البدء' },
    { extended: false, name: 'end_time', title: 'موعد الانتهاء' },
];
export const colsData_final_absent = [
    { extended: false, name: 'user_id', title: 'ID' },
    { extended: false, name: 'user_name', title: 'الطالب EN' },
    { extended: false, name: 'user_name_ar', title: 'الطالب AR' },
    { extended: false, name: 'user_email', title: 'البريد الالكتروني' },
    { extended: false, name: 'user_code', title: 'كود المنظمة' },
    { extended: false, name: 'midterm_date', title: 'موعد الاختبار' },
    { extended: false, name: 'course_name', title: 'المادة' },
];

export const semseters_names = [
    { label: 'اختر الفصل...', value: '' },
    { label: 'الفصل الاول', value: '1' },
    { label: 'الفصل الثاني', value: '2' },
    { label: 'الفصل الثالث', value: '3' },
    { label: 'الفصل الرابع', value: '4' },
];
export const success_status_data = [
    { label: 'اختر الحالة...', value: '' },
    { label: 'ناجح', value: '1' },
    { label: 'راسب', value: '2' },
];

// ------------------------------------------------------------------------------------------------------------------------
