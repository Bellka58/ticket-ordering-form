import React, { useState } from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { dateMask } from "../utils/date-valiadtion";
import { genderOptions, nationalityOptions } from "../constants/options";


const PassengerForm = ({ number, handleDeletePassenger, passenger, setPassenger }) => {
  const [validError, setValidError] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    gender: false,
    birthdate: false,
    nationality: false,
  });

  const errorEmpty = {
    content: "Поле обязательное",
  };

  const {
    firstName,
    middleName,
    lastName,
    gender,
    birthdate,
    nationality,
    snils,
    agreement,
  } = passenger;


  const handleChange = (e, { name, value }) => {
    setPassenger({ ...passenger, [name]: value });
    setValidError({ ...validError, [name]: !value });
  };

  const handleCheckbox = (e, { name, checked }) => {
    setPassenger({ ...passenger, [name]: checked });
  };

  const handleDateChange = (e, { name, value }) => {
    const changedValue = dateMask(passenger[name], value);
    setPassenger({ ...passenger, [name]: changedValue });
    setValidError({ ...validError, [name]: !changedValue  });
  };

  const handleBlur = (name) =>
    setValidError({ ...validError, [name]: !passenger[name] });

  return (
    <div className="passenger-form">
      <div className="passenger-form__header">
        <h2>Пассажир №{number}</h2>
        <Button type="button" negative onClick={handleDeletePassenger}>
          Удалить пассажира
        </Button>
      </div>
      <Form.Group widths="equal">
        <Form.Field
            id={`${number}`}
            control={Input}
            label="CНИЛС"
            name="snils"
            value={snils}
            onChange={handleChange}
            onBlur={() => handleBlur("snils")}
          />
        <Form.Field />
        <Form.Field />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          className="required"
          id={`${number}`}
          control={Input}
          label="Фамилия"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          error={validError.lastName && errorEmpty}
          onBlur={() => handleBlur("lastName")}
        />
        <Form.Field
          className="required"
          id={`${number}`}
          control={Input}
          label="Имя"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          error={validError.firstName && errorEmpty}
          onBlur={() => handleBlur("firstName")}
        />
        <Form.Field
          className="required"
          id={`${number}`}
          control={Input}
          label="Отчество (обязательно при наличии)"
          name="middleName"
          value={middleName}
          onChange={handleChange}
          error={validError.middleName && errorEmpty}
          onBlur={() => handleBlur("middleName")}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          className="required"
          id={`${number}`}
          control={Select}
          options={genderOptions}
          label="Пол"
          placeholder="не выбрано"
          name="gender"
          value={gender}
          onChange={handleChange}
          error={validError.gender && errorEmpty}
          onBlur={() => handleBlur("gender")}
        />
        <Form.Field
          className="required"
          id={`${number}`}
          control={Input}
          label="Дата рождения"
          name="birthdate"
          value={birthdate}
          onChange={handleDateChange}
          error={validError.birthdate && errorEmpty}
          onBlur={() => handleBlur("birthdate")}
        />
        <Form.Field
          className="required"
          id={`${number}`}
          control={Select}
          options={nationalityOptions}
          label="Гражданство"
          placeholder="не выбрано"
          name="nationality"
          value={nationality}
          onChange={handleChange}
          error={validError.nationality && errorEmpty}
          onBlur={() => handleBlur("nationality")}
        />
      </Form.Group>
      <Form.Checkbox
        label="Согласен на получение оповещений в случаях чрезвычайных ситуаций на железнодорожном транспорте"
        name="agreement"
        checked={agreement}
        onChange={handleCheckbox}
      />
    </div>
  );
};

export default PassengerForm;
