import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import UserInfoInput from "../Question/QuestionInputArea/UserInfoInput";
import ReplyContentInput from "./ReplyContentInput";
import ReplierInfoInput from "./ReplierInfoInput";

const FlexedCenterDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FlexedSpaceBetweenDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function ReplyInput(props) {
	const {onConfirm, userNameRef, questionRef, confirmButtonText} = props;
	const [replyContent, setReplyContent] = useState("");
	const [userName, setUserName] = useState("");
	return (
		<Grid container direction={"column"}>
			<ReplyContentInput
				questionRef={questionRef}
				content={replyContent}
				setContent={setReplyContent}
			/>
			<Divider style={{marginTop: "0.5rem", marginBottom: "0.5rem"}} />
			<FlexedSpaceBetweenDiv>
				<FlexedCenterDiv>
					<ReplierInfoInput
						userNameRef={userNameRef}
						userName={userName}
						setUserName={setUserName}
					/>
				</FlexedCenterDiv>
				<FlexedCenterDiv>
					<Button
						variant="contained"
						color={"primary"}
						onClick={() => {
							onConfirm();
							setReplyContent("");
						}}
					>
						{confirmButtonText}
					</Button>
				</FlexedCenterDiv>
			</FlexedSpaceBetweenDiv>
		</Grid>
	);
}

export default ReplyInput;
