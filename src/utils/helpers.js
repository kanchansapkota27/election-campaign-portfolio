import NepaliDate from 'nepali-date-converter';
import { apiurl } from '../api/data';

const buildFileURL = (collection,recordID,filename) => {
    return `${apiurl}api/files/${collection}/${recordID}/${filename}`;
}


const date_to_nepali=(date)=>{

    const newDate=new NepaliDate(date);
    const year=newDate.getYear();
    const month=newDate.getMonth();
    const day=newDate.getDate();

    return {
        year:year,
        month:month,
        monthname:newDate.format('MMMM'),
        day:day,
        dayname:newDate.format('ddd'),
        formattedDate:newDate.format('ddd d MMMM YYYY'),
    };

}

export {buildFileURL,date_to_nepali};