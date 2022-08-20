export default function translateDay(dayNumber) {
    let conversion;
    switch (dayNumber) {
        case 0:
            conversion = "Domingo";
            break;
        case 1:
            conversion = "Segunda";
            break;
        case 2:
            conversion = "Terça";
            break;
        case 3:
            conversion = "Quarta";
            break;
        case 4:
            conversion = "Quinta";
            break;
        case 5:
            conversion = "Sexta";
            break;
        default:
            conversion = "Sábado"
    }

    return conversion
}