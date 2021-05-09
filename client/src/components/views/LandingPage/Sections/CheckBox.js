import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Cheked, setCheked] = useState([]);
  const handleToggle = (value) => {
    // 누른 것의 Index를 구하고
    const currentIndex = Cheked.indexOf(value);
    // 전체 Checked 된 State에서 현재 누른 CheckBox가 이미 있다면
    const newChecked = [...Cheked];

    // state에 넣어준다.
    if (currentIndex === -1) {
      newChecked.push(value);
      // 빼주고
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBoxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Cheked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckBoxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
