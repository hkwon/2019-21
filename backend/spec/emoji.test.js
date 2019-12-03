import {
	createEmoji,
	deleteEmojiBy,
	deleteEmojiById,
	getDidIPicked, getEmojiCountBy,
} from "../DB/queries/emoji.js";

describe("emoji query api", () => {
	let newId = null;
	let res = null;

	it("should able to create emoji", async () => {
		const GuestId = 1;
		const QuestionId = 409;
		const name = "234234";
		const res = await createEmoji({ GuestId, name, QuestionId });

		newId = res.dataValues.id;
		// console.log(res.length);
	});

	it("should able to delete emoji by  GuestId, name, QuestionId ", async () => {
		const GuestId = 1;
		const QuestionId = 409;
		const name = "234234";
		const res = await deleteEmojiBy({ GuestId, name, QuestionId });
		// console.log(res.length);
	});

	it("should able to get emoji by QuestionId", async () => {
		const GuestId = 1;
		const QuestionId = 409;
		const name = "234234";
		res = await createEmoji({ GuestId, name, QuestionId });
		res = await deleteEmojiById(res.dataValues.id);
		// console.log(newId)
	});

	it("should able to get  did i picked emoji", async () => {
		const GuestId = 34;
		const name = "point_up";
		const QuestionId = 33;
		const res = await getDidIPicked({ name, GuestId, QuestionId });
		// console.log(res);
	});

	it("should able to get emojiCount By question, name", async () => {
		const QuestionId = 34;
		const name = "point_up";
		const res = await getEmojiCountBy({ name, QuestionId });
		// console.log(res);
	});
});
