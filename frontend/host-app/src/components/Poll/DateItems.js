// Review 요청
import React from "react";
import styled from "styled-components";
import {MdDelete, MdAdd} from "react-icons/md";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const DeleteItem = styled.div`
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    border-radius: 50%;
    color: #f1f3f5;
    &:hover {
        color: #adb5bd;
    }
`;

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 3rem;
	padding: 0 0 0 1rem;
    box-sizing: border-box;
    &:hover {
        ${DeleteItem} {
            opacity: 1;
        }
    }
`;

const AddItem = styled.div`
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-size: 1.5rem;
    border: 1px solid gray;
    &:hover {
        background-color: #f1f3f5;
    }
    &:active {
        background-color: #dee2e6;
    }
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	box-sizing: border-box;
    max-height: 300px;
    overflow-y: auto;
`;

function DateItems({dates, onDateChange, onDeleteDate, onAddDate}) {
	return (
		<>
			<ColumnWrapper>
				{dates.map((date, index) => (
					<RowWrapper left>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								variant="inline"
								format="yyyy/MM/dd"
								margin="dense"
								value={date}
								onChange={newDate => onDateChange(newDate, index)}
							/>
						</MuiPickersUtilsProvider>

						<DeleteItem>
							{(index > 1) && <MdDelete onClick={() => onDeleteDate(index)} />}
						</DeleteItem>
					</RowWrapper>))
				}
			</ColumnWrapper>
			<AddItem onClick={onAddDate}>
				<MdAdd />
			</AddItem>
		</>
	);
}

export default DateItems;
