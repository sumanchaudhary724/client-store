import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export const SelectedCategory = (props) => {
  const { category } = useSelector((store) => store.catagoryInfo);

  return (
    <>
      <Form.Group>
        <Form.Select {...props}>
          <option value="">...Select...</option>

          {category.map(({ _id, title }) => (
            <option key={_id} value={_id} selected={_id === props._id}>
              {title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};
