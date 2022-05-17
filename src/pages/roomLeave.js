/* eslint-disable no-undef */
exports.RoomLeave = class RoomLeave {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.join_again_btn = 'button[data-testid="join_again_btn"]';
    this.go_to_dashboard_btn = 'button[data-testid="go_to_dashboard_btn"]';
  
  }

  async getStartJoinTime(){
    //get time at preview page
    var today = new Date();
    var in_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("In Time = "+in_time);
    //Calculate time in sec
    var in_time_hr = today.getHours()*60*60;
    var in_time_min = today.getMinutes()*60;
    var in_time_sec = today.getSeconds();
    var in_time_total = in_time_hr + in_time_min + in_time_sec;
    console.log("In Time in sec = "+ in_time_total);
    return in_time_total;
}
async getEndJoinTime(){    
  //get time after preview page
  var today = new Date();
  var out_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log("Out Time = "+out_time);
  //Calculate time in sec
  var out_time_hr = today.getHours()*60*60;
  var out_time_min = today.getMinutes()*60;
  var out_time_sec = today.getSeconds();
  var out_time_total = out_time_hr + out_time_min + out_time_sec;
  console.log("Out Time in sec = "+ out_time_total);
  return out_time_total;
}
}
