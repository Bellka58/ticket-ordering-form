import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import PassengerForm from "./passenger-form";
import { API_URL } from "../constants/url";

const FormExampleFieldControlId = () => {
  const requiredFields = [
    'firstName',
    'middleName',
    'lastName',
    'gender',
    'birthdate',
    'nationality'
  ];

  const [passengers, setPassengers] = useState([
    {
      id: `f${(+new Date()).toString(16)}`,
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      birthdate: "",
      nationality: "Россия",
      snils: "",
      agreement: false,
    },
  ]);


  const searchEmptyFields = () => ~passengers.findIndex(passenger => ~requiredFields.findIndex(field => !passenger[field]));
  
  const handleSubmit = () => {
    if (searchEmptyFields()) {
      alert('Необходимо заполнить все обязательные поля');
    } else {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(passengers),
        mode: 'no-cors'
      })
      .then(() => alert('Данные отправлены'))
      .catch(() => {
        alert('Возникла проблема с отправкой данных')
      })
    }
  }

  const handleAddPassenger = () => {
    setPassengers(prev => [...prev, {
      id: `f${(+new Date()).toString(16)}`,
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      birthdate: "",
      nationality: "Россия",
      snils: "",
      agreement: false,
    }])
  };

  const handleDeletePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ])
    } else {
      alert('В поездке должен учавствовать хотя бы один пассажир');
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {passengers.map((passenger, idx) => (
          <PassengerForm
            key={passenger.id}
            number={idx + 1}
            passenger={passenger}
            setPassenger={(passenger) =>
              setPassengers((prev) => [
                ...prev.slice(0, idx),
                passenger,
                ...prev.slice(idx + 1),
              ])
            }
            handleDeletePassenger={() => handleDeletePassenger(idx)}
          />
        ))}
        <div className="buttons-container">
          <Form.Button positive>Отправить</Form.Button>
          <Button type="button" onClick={handleAddPassenger}>Добавить пассажира</Button>
        </div>
      </Form>
    </div>
  );
};

export default FormExampleFieldControlId;
