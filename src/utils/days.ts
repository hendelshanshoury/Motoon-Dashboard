export default function day_name(day) {
    switch (day) {
        case '0':
            return 'الأحد';
        case '1':
            return 'الإثنين';
        case '2':
            return 'الثلاثاء';
        case '3':
            return 'الأربعاء';
        case '4':
            return 'الخميس';
        case '5':
            return 'الجمعة';
        case '6':
            return 'السبت';
        default:
            'غير معروف';
            break;
    }
}
