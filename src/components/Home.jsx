import '../Home.css'
import React, { useState, useEffect } from "react"
import axios from "axios"
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';



function Home() {

  const [message, setReminderMsg] = useState("")
  let [remindAt, setRemindAt] = useState("")
  const [reminderList, setReminderList] = useState([])
  const [reminderFreq, setReminderFreq] = useState("EveryMonth");



  let userId = localStorage.getItem("userId")
  let token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`https://marvelous-peat-peridot.glitch.me/reminder?userId=${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => setReminderList(res.data.data))

  }, [userId, token])


  const addReminder = () => {
    if (token) {
      remindAt=moment.utc(remindAt).format();
      axios.post("https://marvelous-peat-peridot.glitch.me/reminder", { message, remindAt, userId, reminderFreq }).then(res => {

        const newReminderList = [...reminderList, res.data.data];
        setReminderList(newReminderList)

        setReminderMsg("")
        setRemindAt("")

      })
        .catch(error => alert(error.response.data.message))

    }
    else alert('LogIn First')

  }



  const deleteReminder = (reminderId) => {

    const body = { reminderId: reminderId };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    };

    if (token) {

      axios.delete("https://marvelous-peat-peridot.glitch.me/reminder", config).then((res) => {

          const newReminderList = reminderList.filter( (reminder) => reminder._id !== reminderId);

          setReminderList(newReminderList);
        })
        .catch((error) => alert(error.response.data.message));

    } else alert("LogIn First");
  };


  const inputProps = {
    placeholder: "MM/DD/YYYY   HH:MM",
    readOnly: true,
    required: true,
     position: "static" 
  }

  const yesterday = moment().subtract(1, 'day');
  const valid = function (current) {
    return current.isAfter(yesterday);
  };

  return (
    <>
      <div className="container_home">

        <div className="homepage">
                 
     <div className='homepage_header' >

      <div className='homepage_side_boxes'>
        <h1> Active Reminders</h1>
  <p>{reminderList.length}</p>
      
      </div>

     <div className="homepage_input">
            <h1> Remind Me </h1>
            <input type="text" placeholder="Reminder notes here..." value={message} onChange={e => setReminderMsg(e.target.value)} className="header_input" required />

            <h1> Remind At:</h1>
            <Datetime
              value={remindAt}
              onChange={setRemindAt}
              isValidDate={valid}
              closeOnSelect={true}
              inputProps={inputProps}
            />

      <select name="freq" id="homepage_freq" style={{marginTop:"12px",fontSize:"1rem"}} value={reminderFreq} onChange={e => setReminderFreq(e.target.value)}>
        <option value="EveryMonth">EveryMonth</option>
        <option value="EveryDay">EveryDay</option>
      </select>

            <div className="button" onClick={addReminder}>Add Reminder</div>
     </div>

         
     <div className='homepage_side_boxes_right'>
      {/* <h1>Subscribe to get new Quote Everyday</h1> */}
      </div>
      </div>


          {/* for reminder cards */}
          <div className="homepage_body">
            {
              reminderList.map(reminder => (
                <div className="reminder_card" key={reminder._id}>

                  <h2 className='message_text'>{reminder.message}</h2>
                  <h3>Remind Me at:</h3>
                  <p>{String(new Date(reminder.remindAt))+ reminder.reminderFreq}</p>
                  
                  <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </>
  )
}





export default Home;