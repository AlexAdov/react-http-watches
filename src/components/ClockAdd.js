import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";

const ClockAdd = ({ onSubmitHandler }) => {
   const [city, setCity] = useState({});
   const [timezone, setTimezone] = useState("");
   const [cities, setCities] = useState([]);

   useEffect(() => {
      fetch("assets/cities.json")
         .then((response) => response.json())
         .then((result) =>
            setCities([
               ...result.sort((c1, c2) => c1.value.localeCompare(c2.value)),
            ])
         );
   }, []);

   const onChangeHandler = (value) => {
      const city = cities.find((c) => c.value === value);
      setCity(city ? city : {});
      setTimezone(city ? city.text : "");
   };

   return (
      <Form onSubmit={onSubmitHandler(city)}>
         <Row className="mb-4">
            <Col>
               <p>Название</p>
               <Form.Select
                  onChange={(e) => onChangeHandler(e.target.value)}
                  value={city.value}
               >
                  <option hidden>Выберите город</option>
                  {cities.map((city) => (
                     <option
                        key={uniqueId("city_")}
                        value={city.value}
                     >{`${city.value}`}</option>
                  ))}
               </Form.Select>
            </Col>
            <Col>
               <p>Временная зона</p>
               <Form.Control type="text" value={timezone} readOnly />
            </Col>
            <Col md="auto" className="align-self-end">
               <Button type="submit">Добавить</Button>
            </Col>
         </Row>
      </Form>
   );
};
export default ClockAdd;
