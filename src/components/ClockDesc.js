import { useState } from "react";
import { uniqueId } from "lodash";
import ClockItem from "./ClockItem";
import ClockAdd from "./ClockAdd";
import { Row } from "react-bootstrap";

const ClockDesc = () => {
   const [data, setData] = useState([]);

   const onSubmitHandler = (city) => (e) => {
      e.preventDefault();
      setData([...data, city]);
   };

   const onRemoveHandler = (value) => {
      setData(data.filter((item) => item.value !== value));
   };

   return (
      <>
         <ClockAdd onSubmitHandler={onSubmitHandler} />

         {data && (
            <Row className="justify-content-around mb-4" md={4}>
               {data.map((item) => (
                  <ClockItem
                     key={uniqueId("clock_")}
                     item={item}
                     onRemove={() => onRemoveHandler(item.value)}
                  />
               ))}
            </Row>
         )}
      </>
   );
};

export default ClockDesc;
