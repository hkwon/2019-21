import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "0.6rem",
	width: "25rem",
});

function InputEventCode(props) {
	const eventCode = props.eventCode;
	const MAX_EVENT_CODE_LEN = 4;

	const validateEventCode = event => {
		const input = event.target.value;

		if (input.length > MAX_EVENT_CODE_LEN) {
			return;
		}
		props.dispatch(event);
	};

	return (
		<CustomTextField
			id="eventName"
			label="이벤트 코드"
			color="primary"
			disabled={true}
			value={eventCode}
			onChange={validateEventCode}
		/>
	);
}

export default InputEventCode;
