export const sidebarLinks = [
    {
        name: 'ADMINS',
        title: 'المسؤولين',
        hiddenFor: ['org'],
        children: [{ name: 'ادارة المسؤولين', src: '/admins', auth: ['super_admin'] }],
    },
    {
        name: 'ORGANIZATIONS',
        title: 'الجمعيات',
        children: [
            { name: 'ادارة الجمعيات', src: '/organizations', auth: ['super_admin', 'admin'] },
            // { name: 'ادارة المراكز', src: '/centers', auth: ['super_admin', 'org', 'admin'] },
            { name: 'ادارة اكواد التسجيل', src: '/codes', auth: ['super_admin', 'org', 'admin'] },
            // { name: 'فحص كود تسجيل', src: '/codes-checker' },
        ],
    },
    {
        name: 'USERS',
        title: 'الطلاب',
        children: [
            { name: 'ادارة الطلاب', src: '/users', auth: ['super_admin', 'org', 'admin'] },
            { name: 'تفعيل الهوية', src: '/activate-users-id', auth: ['super_admin', 'org', 'admin'] },
        ],
    },
    {
        name: 'Batches',
        title: ' الدفعات',
        hiddenFor: ['org'],
        children: [{ name: 'ادارة الدفعه', src: '/batches', auth: ['super_admin', 'admin'] }],
    },
    {
        name: 'SEMESTERS',
        title: 'الفصول الدراسية',
        hiddenFor: ['org'],
        children: [{ name: 'ادارة الفصول', src: '/semesters', auth: ['super_admin', 'admin'] }],
    },
    {
        name: 'COURSES',
        title: 'المواد الدراسية',
        hiddenFor: ['org'],
        children: [{ name: 'ادارة المواد', src: '/courses', auth: ['super_admin', 'admin'] }],
    },
    {
        name: 'LESSONS',
        title: 'الدروس',
        hiddenFor: ['org'],
        children: [
            { name: 'ادارة الدروس', src: '/lessons', auth: ['super_admin', 'admin'] },
            { name: 'العلامات المرجعية للدروس', src: '/bookmarks', auth: ['super_admin', 'admin'] },
        ],
    },
    {
        name: 'QUESTIONS',
        title: 'الاسئله ',
        hiddenFor: ['org'],
        children: [{ name: 'ادارة الاسئله ', src: '/questions', auth: ['super_admin', 'admin'] }],
    },
    {
        name: 'CONTACTS-US',
        title: 'تواصل معانا',
        hiddenFor: ['org'],
        children: [{ name: 'تواصل معانا', src: '/contacts', auth: ['super_admin', 'admin'] }],
    },
    {
        name: 'SUPPORTS',
        title: 'الدعم',
        children: [{ name: 'الدعم', src: '/supports', auth: ['super_admin', 'admin', 'org'] }],
    },
    {
        name: 'SETTINGS',
        title: 'الاعدادات',
        hiddenFor: ['org'],
        children: [{ name: 'الاعدادات', src: '/settings', auth: ['super_admin', 'admin'] }],
    },
    {
        name: 'EXAMS',
        title: 'التقارير',
        children: [
            { name: 'الاختبارات القصيرة', src: '/exams/quizes', auth: ['super_admin', 'org', 'admin'] },
            { name: 'اختبارات ميدتيرم', src: '/exams/midterm', auth: ['super_admin', 'org', 'admin'] },
            { name: 'الغائبين ( ميدتيرم )', src: '/exams/midterm-absent', auth: ['super_admin', 'org', 'admin'] },
            { name: 'اختبارات نهائية', src: '/exams/final', auth: ['super_admin', 'org', 'admin'] },
            { name: 'الغائبين ( النهائي )', src: '/exams/final-absent', auth: ['super_admin', 'org', 'admin'] },
        ],
    },
];
