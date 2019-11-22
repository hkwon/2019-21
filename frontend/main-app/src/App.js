/**
 * Review 요청
 * line #: 27
 * 모달을 띄우는 방식을 이런식으로 코딩하면 되는지 궁금합니다.
 **/ 


import React, {useState} from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import HostLoginMessage from "./components/HostLoginMessage";
import LoginModal from "./components/LoginModal";

function App() {
	const MODAL_OPENED = true;
	const MODAL_CLOSED = false;

	const [loginModalStatus, setModalStatus] = useState(MODAL_CLOSED);
	const onHideModal = () => {
		setModalStatus(MODAL_CLOSED);
	};
	const onShowModal = () => {
		setModalStatus(MODAL_OPENED);
	};

	return (
		<div className="App">
			<EventForm />
			<HostLoginMessage onShowModal={onShowModal} />
			{loginModalStatus && <LoginModal onHideModal={onHideModal} />}
		</div>
	);
}

export default App;
