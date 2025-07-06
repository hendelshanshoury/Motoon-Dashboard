export const getSemesterName = (semester_id) => {
    switch (semester_id) {
        case 1:
            return 'الفصل الاول';
            break;
        case 2:
            return 'الفصل الثاني';
            break;
        case 3:
            return 'الفصل الثالث';
            break;
        case 4:
            return 'الفصل الرابع';
            break;
        default:
            return ''
            break;
    }
};
