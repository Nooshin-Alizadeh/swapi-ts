import { isNumber } from "lodash";

class UtilityHelper {
    static generate_uuidv4() {
      //return randomUUID();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var uuid = (Math.random() * 16) | 0,
              v = c == "x" ? uuid : (uuid & 0x3) | 0x8;
            return uuid.toString(16);
          }
        );
      }
      static getStringOfDate(edited:Date) {
        return (
          edited.getFullYear() + "-" + edited.getMonth() + "-" + edited.getDate()
        );
      }
    
      static isDate(date:string|number|Date) {
        let tonumber = Number(date);
        let isNum = isNumber(tonumber);
        if (!isNaN(tonumber) && isNum) return false;
        var checkData:any=new Date(date);
        let check1 = checkData!== "Invalid Date";
        let check2 = !isNaN(checkData);
        return  check1 && check2;
      }

}
export default UtilityHelper;