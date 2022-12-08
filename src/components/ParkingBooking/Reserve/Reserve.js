import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SearchContext } from "../../context/SearchContext"



import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import "./Reserve.css"

import axios from "axios"
import { useNavigate } from "react-router-dom"




const Reserve = ({ setOpen, parkingSlotId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

 
  
  
  const { data, loading, error } = useFetch(`http://localhost:9000/api/parking/allParkings/parkingSlot/${parkingSlotId}`);
  const { dates,options } = useContext(SearchContext);
  console.log(data)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
  
    const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (slotNumber) => {
    const isFound = slotNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };


  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
      
        : selectedRooms.filter((item) => item !== value)
    );
  };
  

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((parkingSlotId) => {
          const res = axios.put(`http://localhost:9000/api/parkingSlot/availability/${parkingSlotId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/pay", {state: {amount: days * data[0]?.price}});
    } catch (err) {}
  };

  return (
   
    
    <div className="reserve">
    <div className="rContainer">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="rClose"
        onClick={() => setOpen(false)}
      />
      <span>Select your Parking SLot:</span>
      {data.map((item) => (
        <div className="rItem" key={item._id}>
          <div className="rItemInfo">
            <div className="rTitle">{item.title}</div>
            <div className="rDesc">{item.desc}</div>
            
            <div className="rMax">
            {/* Max people: <b>{item.maxPeople}</b> */}
            </div>
             <div className="rPrice">${days * item.price }</div> 

          </div>
          <div className="rSelectRooms">
            {item.slotNumbers.map((slotNumber) => (
              <div className="room">
                <label>{slotNumber.number}</label>
               
                <input
                  type="checkbox"
                  value={slotNumber._id}
         
                  onChange={handleSelect}
                  disabled={!isAvailable(slotNumber)}
                />
              </div>
            ))}
          
          </div>
        </div>
      ))}
       <button onClick={handleClick}className="rButton"> 
        Reserve Now!
      </button> 
     
    </div>
  </div>
  
    );
};

export default Reserve;